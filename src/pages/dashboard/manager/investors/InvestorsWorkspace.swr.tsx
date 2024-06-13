import { Table } from 'components/generic/Table';
import { withErrorSuspense } from '../../../../utils/withErrorSuspense';

import { FC, useEffect } from 'react';
import { UserOutputDto } from '../../../../types/user';
import { RowCell, RowCellType } from 'components/generic/Table/Table.types';
import { useTranslation } from 'react-i18next';
import gtm from '../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../constants';
import { Box } from '@mui/system';
import { useGetInvestorList } from 'api/hooks/useGetInvestorList';

const rowCells: RowCell[] = [
  {
    type: RowCellType.CHECKBOX,
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'id',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'firstName',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'lastName',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'email',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'phone',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'role',
  },
  {
    type: RowCellType.STATUS,
    dataKey: 'status',
  },
  {
    type: RowCellType.MANAGER_ACTIONS,
    dataKey: 'id',
    extra: {
      href: '/dashboard/investors-workspace',
    },
  },
];

const InvestorWorkspace: FC = () => {
  const { data = [] } = useGetInvestorList();
  const { t } = useTranslation();
  const header = [
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investor.id'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investor.firstName'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investor.lastName'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investor.email'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investor.phone'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investor.role'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investor.status'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
  ];

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investor Workspace' });
  }, []);

  const rows = data.map((d) => {
    return {
      ...d,
      status: d.onboardStatus,
    };
  });
  return (
    <Box sx={{ mt: '42px', p: '16px 8px', borderRadius: '8px', border: '1px solid #E3E5E6' }}>
      <Table<UserOutputDto>
        showHeader
        showSearch
        showSortBy
        showPagination
        header={header}
        rows={rows.filter((d) => d.role === 'INVESTOR')}
        rowCells={rowCells}
      />
    </Box>
  );
};

export default withErrorSuspense(InvestorWorkspace);
