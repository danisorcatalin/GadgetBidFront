import { Table } from 'components/generic/Table';
import type { FC } from 'react';
import { NewCampaign } from 'types/campaign';
import { RowCellType } from 'components/generic/Table/Table.types';
import { SimplePersonDto, SimpleUserDto } from 'types/user';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

const rowCells = [
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
    dataKey: 'companyName',
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
    type: RowCellType.STATUS,
    dataKey: 'status',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'accountManagerName',
  },
  {
    type: RowCellType.MANAGER_ACTIONS,
    dataKey: 'id',
    extra: {
      href: '/dashboard/campaigns-workspace',
    },
  },
];

export interface CampaignsListingTableProps {
  campaigns: NewCampaign[];
}

export const CampaignsListingTable: FC<CampaignsListingTableProps> = (
  props: CampaignsListingTableProps
) => {
  const { t } = useTranslation();
  const header = [
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.table.id'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.table.firstName'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.table.lastName'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.table.company'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.table.email'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.table.phone'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.table.status'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.table.accountManager'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
  ];
  const { campaigns = [] } = props;
  const rows = campaigns.map((campaign = {} as NewCampaign) => {
    const { user = {} as SimpleUserDto, accountManager = {} as SimplePersonDto } = campaign;
    const { firstName, lastName, email, phone } = user || {};
    const accountManagerName = `${accountManager.firstName} ${accountManager.lastName}`;

    return {
      ...campaign,
      firstName,
      lastName,
      email,
      phone,
      accountManagerName,
      companyName: campaign.company.name,
    };
  });
  return (
    <Box sx={{ mt: '42px', p: '16px 8px', borderRadius: '8px', border: '1px solid #E3E5E6' }}>
      <Table<NewCampaign>
        showHeader
        showSearch
        showSortBy
        showPagination
        header={header}
        rows={rows}
        rowCells={rowCells}
      />
    </Box>
  );
};
