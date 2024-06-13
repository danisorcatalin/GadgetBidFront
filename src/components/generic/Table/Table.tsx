import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  InputAdornment,
  Tab,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Link,
  Tooltip,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowRightIcon from '../../../icons/ArrowRight';
import SearchIcon from '../../../icons/Search';
import Scrollbar from '../../Scrollbar';
import { RowCell, RowCellType, Sort, SortOption, TableHeader, TableProps } from './Table.types';
import Label from '../../Label';
import { keyable } from 'types/util';
import ExclamationIcon from 'icons/Exclamation';
import { useTranslation } from 'react-i18next';
import { GTM_EVENTS } from '../../../constants';
import gtm from '../../../lib/gtm';
import { getRouteName } from 'routes';
import { getStatusColor } from 'utils/user';
import { InfoButton } from '../InfoButton';
import { useModal } from 'mui-modal-provider';
import InfoModal from '../InfoModal';
import { responsive } from 'theme';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ClearIcon from '@mui/icons-material/Clear';

const applyFilters = <T,>(rows: T[], query: string, filters: unknown): T[] =>
  rows.filter((row) => {
    let matches = true;

    if (query) {
      const properties = Object.keys(row);
      let containsQuery = false;

      properties.forEach((property) => {
        if (String(row[property]).toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && row[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });

const applyPagination = <T,>(rows: T[], page: number, limit: number): T[] =>
  rows.slice(page * limit, page * limit + limit);

const descendingComparator = <T,>(a: T, b: T, orderBy: string): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = <T,>(order: 'asc' | 'desc', orderBy: string) =>
  order === 'desc'
    ? (a: T, b: T) => descendingComparator(a, b, orderBy)
    : (a: T, b: T) => -descendingComparator(a, b, orderBy);

const applySort = <T,>(rows: T[], sort: Sort): T[] => {
  const [orderBy, order] = sort.split('|') as [string, 'asc' | 'desc'];
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = rows.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // @ts-ignore
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    // @ts-ignore
    return a[1] - b[1];
  });

  // @ts-ignore
  return stabilizedThis.map((el) => el[0]);
};

export const Table = <T extends keyable>(props: TableProps<T>): JSX.Element => {
  const {
    header,
    tabs = [],
    rows,
    rowCells,
    showTabs = false,
    showHeader = false,
    showSearch = false,
    showSortBy = false,
    showPagination = false,
    paginationLimit = 10000,
    handleFileDownload = () => {},
    handleFileUpload = () => {},
    handleFileView = () => {},
    handleFileDiscard = () => {},
    className,
    readonly: isReadOnly,
    type,
    ...other
  } = props;
  const { t } = useTranslation();
  const { showModal } = useModal();
  const sortOptions: SortOption[] = [
    {
      label: t('generic.table.lastUpdateNewest'),
      value: 'updatedAt|desc',
    },
    {
      label: t('generic.table.lastUpdateOldest'),
      value: 'updatedAt|asc',
    },
    {
      label: t('generic.table.registrationNewest'),
      value: 'id|desc',
    },
    {
      label: t('generic.table.registrationOldest'),
      value: 'id|asc',
    },
  ];
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(paginationLimit);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<Sort>(sortOptions[0].value);
  const [filters, setFilters] = useState({});
  const { pathname } = useLocation();
  const pageEventTitle = getRouteName(pathname).split(' ', 1)[0].slice(0, -1).toUpperCase();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    const updatedFilters = {
      ...filters,
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setSelectedRows([]);
    setCurrentTab(value);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSort(event.target.value as Sort);
  };

  const handleSelectAllRows = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedRows(event.target.checked ? rows.map((row) => row.id) : []);
  };

  const handleSelectOneRow = (event: ChangeEvent<HTMLInputElement>, rowId: number): void => {
    if (!selectedRows.includes(rowId)) {
      setSelectedRows((prevSelected) => [...prevSelected, rowId]);
    } else {
      setSelectedRows((prevSelected) => prevSelected.filter((id) => id !== rowId));
    }
  };

  const handlePageChange = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  const deleteEventClick = (): void => {
    gtm.push({ event: `${pageEventTitle}_${GTM_EVENTS.DELETE_CLICK}` });
  };

  const detailsEventClick = (): void => {
    gtm.push({ event: `${pageEventTitle}_${GTM_EVENTS.DETAILS_CLICK}` });
  };

  const renderRowCell = (rowCell: RowCell, data: T, key: number) => {
    const { type, dataKey, extra, readonly } = rowCell;
    const cellType = type;
    let cellComponent;
    const rowData: T = data;

    switch (cellType) {
      case RowCellType.TEXT:
        cellComponent = (
          <TableCell
            key={`${rowData.id || rowData['label']}_${key}`}
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {rowData[dataKey]}
          </TableCell>
        );
        break;
      case RowCellType.INVESTMENT_COMPANY_TEXT:
        cellComponent = (
          <TableCell
            sx={{
              fontSize: '22px',
              letterSpacing: '-0.44px',
              lineHeight: '24px',
              fontWeight: 700,
              color: '#000000',
            }}
            key={`${rowData.id || rowData['label']}_${key}`}
          >
            {rowData[dataKey]}
          </TableCell>
        );
        break;
      case RowCellType.INVESTMENT_TEXT:
        cellComponent = (
          <TableCell
            sx={{
              fontSize: '22px',
              letterSpacing: '-0.44px',
              lineHeight: '24px',
              color: '#000000',
            }}
            key={`${rowData.id || rowData['label']}_${key}`}
          >
            {rowData[dataKey]}
          </TableCell>
        );
        break;
      case RowCellType.DOCUMENT_NAME:
        cellComponent = (
          <TableCell key={`${rowData.id || rowData['label']}_${key}`} sx={{ fontSize: '18px' }}>
            {rowData[dataKey]}
          </TableCell>
        );
        break;
      case RowCellType.INFO_BUTTON:
        cellComponent = rowData['infoText'] ? (
          <TableCell className="gadget-info-button" key={`${rowData.id || rowData['label']}_${key}`}>
            <InfoButton
              handleClick={() => {
                showModal(InfoModal, { text: rowData['infoText'] });
              }}
            />
          </TableCell>
        ) : (
          <TableCell />
        );
        break;
      case RowCellType.TEXT_WITH_TOOLTIP:
        cellComponent = rowData['tooltipText'] ? (
          <TableCell key={`${rowData.id || rowData['label']}_${key}`}>
            {rowData[dataKey]}{' '}
            <Tooltip title={rowData['tooltipText']} placement="left" arrow>
              <IconButton size="large">
                <ExclamationIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        ) : (
          <TableCell />
        );
        break;
      case RowCellType.LINK:
        cellComponent = (
          <TableCell key={`${rowData.id || rowData['label']}_${key}`}>
            <span style={{ cursor: 'not-allowed' }}>
              <Button
                variant="outlined"
                size="medium"
                disabled={rowData['link'] ? false : true}
                component={Link}
              >
                {t('generic.table.openLink')}
              </Button>
            </span>
          </TableCell>
        );
        break;
      case RowCellType.CHECKBOX:
        const isRowSelected = selectedRows.includes(rowData.id);
        cellComponent = (
          <TableCell
            key={`${rowData.id || rowData['label']}_${key}`}
            padding="checkbox"
            sx={{ textAlign: 'center' }}
          >
            <Checkbox
              checked={isRowSelected}
              color="primary"
              onChange={(event) => handleSelectOneRow(event, rowData.id)}
              value={isRowSelected}
              sx={{ width: '16px', height: '16px' }}
            />
          </TableCell>
        );
        break;
      case RowCellType.STATUS:
        cellComponent = (
          <TableCell key={`${rowData.id || rowData['label']}_${key}`}>
            <Label
              sx={{
                borderRadius: '4px',
                // minWidth: '150px',
                justifyContent: 'flex-start',
                backgroundColor: getStatusColor(rowData[dataKey]),
              }}
            >
              {rowData[dataKey]}
            </Label>
          </TableCell>
        );
        break;
      case RowCellType.MANAGER_ACTIONS:
        const { href } = extra;
        cellComponent = (
          <TableCell align="right">
            <IconButton
              component={RouterLink}
              to={`${href}/${rowData[dataKey]}`}
              onClick={detailsEventClick}
              size="large"
            >
              <ArrowRightIcon fontSize="small" />
            </IconButton>
          </TableCell>
        );
        break;
      case RowCellType.DOWNLOAD_BUTTON:
        cellComponent = (
          <TableCell key={`${rowData.id || rowData['label']}_${key}`}>
            {mobileDevice ? (
              <DownloadIcon
                sx={{
                  color: rowData['filePath'] ? '#3769ff' : '#E3E5E6',
                  pointerEvents: !readonly && rowData['filePath'] ? 'auto' : 'none',
                }}
                onClick={() => handleFileDownload(rowData)}
              />
            ) : (
              <Button
                variant="outlined"
                size="medium"
                onClick={() => handleFileDownload(rowData)}
                disabled={!readonly && rowData['filePath'] ? false : true}
                sx={{
                  border: '0 !important',
                  width: '100%',
                  backgroundColor: '#D7E1FF',
                  '&:hover': { border: 0 },
                }}
              >
                {t('generic.table.download')}
              </Button>
            )}
          </TableCell>
        );
        break;
      case RowCellType.UPLOAD_BUTTON:
        cellComponent = (
          <TableCell key={`${rowData.id || rowData['label']}_${key}`}>
            {mobileDevice ? (
              <UploadIcon
                sx={{
                  color: isReadOnly || readonly || rowData['filePath'] ? '#E3E5E6' : '#3769ff',
                  pointerEvents: isReadOnly || readonly || rowData['filePath'] ? 'none' : 'auto',
                }}
                onClick={() => handleFileUpload(rowData)}
              />
            ) : (
              <Button
                variant="outlined"
                size="medium"
                color={rowData['filePath'] ? 'secondary' : 'primary'}
                onClick={() => handleFileUpload(rowData)}
                disabled={Boolean(isReadOnly || readonly || rowData['filePath'])}
                sx={{
                  border: 0,
                  width: '100%',
                  backgroundColor: '#D7E1FF',
                  '&:hover': { border: 0 },
                }}
              >
                {t('generic.table.upload')}
              </Button>
            )}
          </TableCell>
        );
        break;
      case RowCellType.VIEW_BUTTON:
        cellComponent = (
          <TableCell key={`${rowData.id || rowData['label']}_${key}`}>
            {mobileDevice ? (
              <VisibilityIcon
                sx={{
                  color: rowData['filePath'] ? '#3769ff' : '#E3E5E6',
                  pointerEvents: rowData['filePath'] ? 'auto' : 'none',
                }}
                onClick={() => handleFileView(rowData)}
              />
            ) : (
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                onClick={() => handleFileView(rowData)}
                disabled={rowData['filePath'] ? false : true}
                sx={{
                  border: '0 !important',
                  width: '100%',
                  backgroundColor: '#D7E1FF',
                  '&:hover': { border: 0 },
                }}
              >
                {t('generic.table.view')}
              </Button>
            )}
          </TableCell>
        );
        break;
      case RowCellType.DISCARD_BUTTON:
        cellComponent = (
          <TableCell key={`${rowData.id || rowData['label']}_${key}`}>
            {mobileDevice ? (
              <ClearIcon
                sx={{
                  color: rowData['filePath'] ? '#3769ff' : '#E3E5E6',
                  pointerEvents: isReadOnly || readonly || !rowData['filePath'] ? 'none' : 'auto',
                }}
                onClick={() => handleFileDiscard(rowData)}
              />
            ) : (
              <Button
                variant="outlined"
                size="medium"
                color={rowData['filePath'] ? 'secondary' : 'primary'}
                onClick={() => handleFileDiscard(rowData)}
                disabled={isReadOnly || readonly || (rowData['filePath'] ? false : true)}
                sx={{
                  border: '0 !important',
                  width: '100%',
                  backgroundColor: '#D7E1FF',
                  '&:hover': { border: 0 },
                }}
              >
                {t('generic.table.discard')}
              </Button>
            )}
          </TableCell>
        );
        break;
      default:
        break;
    }
    return cellComponent;
  };

  const renderHeaderCell = ({ cellType, cellValue, cellProps = [] }: TableHeader, key: number) => {
    let cellComponent;
    const propsObj = cellProps.reduce((result, { prop, value }) => {
      result[prop] = value;
      return result;
    }, {});

    switch (cellType) {
      case RowCellType.TEXT:
        cellComponent = (
          <TableCell key={key} {...propsObj}>
            {cellValue}
          </TableCell>
        );
        break;
      case RowCellType.INVESTMENT_TEXT:
        cellComponent = (
          <TableCell sx={{ fontSize: '11px', color: '#000000 !important' }} key={key} {...propsObj}>
            {cellValue}
          </TableCell>
        );
        break;
      case RowCellType.CHECKBOX:
        cellComponent = (
          <TableCell key={key} padding="checkbox">
            <Checkbox
              checked={selectedAllRows}
              color="primary"
              indeterminate={selectedSomeRows}
              onChange={handleSelectAllRows}
            />
          </TableCell>
        );
        break;
      default:
        break;
    }
    return cellComponent;
  };

  const filteredRows = applyFilters(rows, query, filters);
  const sortedRows = applySort(filteredRows, sort);
  const paginatedRows = applyPagination(sortedRows, page, limit);
  const enableBulkActions = selectedRows.length > 0;
  const selectedSomeRows = selectedRows.length > 0 && selectedRows.length < rows.length;
  const selectedAllRows = selectedRows.length === rows.length;

  return (
    <Card className={className} {...other} sx={{ boxShadow: 'none' }}>
      {showTabs ? (
        <Tabs
          indicatorColor="primary"
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="primary"
          value={currentTab}
          variant="scrollable"
          sx={responsive.tabs}
        >
          {tabs.map((tab, index) => (
            <Tab key={`${tab.label}_${tab.value}_${index}`} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      ) : null}

      <Grid container alignItems="center">
        {showSearch ? (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 1,
            }}
          >
            <TextField
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              onChange={handleQueryChange}
              placeholder=""
              value={query}
              variant="outlined"
              label="Search"
              InputLabelProps={{ shrink: true }}
              sx={{ borderRadius: '4px', '&  > div': { borderRadius: '4px' } }}
            />
          </Grid>
        ) : null}
        {showSortBy ? (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 1,
            }}
          >
            <TextField
              label="Sort By"
              name="sort"
              onChange={handleSortChange}
              select
              SelectProps={{ native: true, sx: { color: '#A2AAAD' } }}
              value={sort}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{ borderRadius: '4px', '&  > div': { borderRadius: '4px' } }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
        ) : null}
      </Grid>
      {enableBulkActions && (
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              mt: '6px',
              position: 'absolute',
              px: '4px',
              width: '100%',
              zIndex: 2,
            }}
          >
            <Checkbox
              checked={selectedAllRows}
              color="primary"
              indeterminate={selectedSomeRows}
              onChange={handleSelectAllRows}
            />
            <Button color="primary" sx={{ ml: 2 }} variant="outlined" onClick={deleteEventClick}>
              {t('generic.table.delete')}
            </Button>
          </Box>
        </Box>
      )}
      <Scrollbar>
        <Box sx={{ minWidth: { xs: type === 'documents' ? 0 : 700, md: 700 } }}>
          <MuiTable sx={{ tableLayout: 'fixed' }}>
            {showHeader ? (
              <TableHead>
                <TableRow sx={{ '& > th': { color: '#A2AAAD' } }}>
                  {header.map((data, key) => renderHeaderCell(data, key))}
                </TableRow>
              </TableHead>
            ) : null}

            <TableBody>
              {paginatedRows.map((rowData, index) => {
                let overwriteRowCells = rowCells;
                const isRowSelected = selectedRows.includes(rowData.id);
                if (rowData?.overwriteRowCells) {
                  overwriteRowCells = rowData?.overwriteRowCells;
                }
                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isRowSelected}
                    sx={{
                      '&.MuiTableRow-root.MuiTableRow-hover:hover': { backgroundColor: 'initial' },
                      '& > td': {
                        border: '0 !important',
                        padding: '16px',
                        '&:first-of-type': { flexBasis: '70%' },
                        '&:nth-of-type(2)': { flexBasis: '30%' },
                        '&:not(:nth-of-type(-n+2))': { flexBasis: '25%' },
                      },
                      display: { xs: type === 'documents' ? 'flex' : 'table-row', sm: 'table-row' },
                      flexFlow: { xs: type === 'documents' ? 'row wrap' : 'none', sm: 'none' },
                      alignItems: { xs: type === 'documents' ? 'center' : 'none', sm: 'none' },
                    }}
                  >
                    {overwriteRowCells.map((rowCell, key) => renderRowCell(rowCell, rowData, key))}
                  </TableRow>
                );
              })}
            </TableBody>
          </MuiTable>
        </Box>
      </Scrollbar>
      {showPagination ? (
        <TablePagination
          component="div"
          count={filteredRows.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      ) : null}
    </Card>
  );
};
