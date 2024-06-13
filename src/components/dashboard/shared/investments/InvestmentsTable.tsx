import { RowCell, RowCellType, Table } from 'components/generic/Table';
import { FC } from 'react';
import { NewInvestmentDto } from 'types/investment';
import { useTranslation } from 'react-i18next';
import { dateTimeFormat } from 'utils/utils';
import { Box } from '@mui/system';
import { NewCampaign, InvestmentCampaignDto } from 'types/campaign';
import { Components } from 'lib/GadgetClientJava';

interface InvestmentsTableProps {
  investmentsData: NewInvestmentDto[] | Components.Schemas.InvestmentDto[];
  campaignData?: NewCampaign;
}

const rowCells: RowCell[] = [
  {
    type: RowCellType.CHECKBOX,
    dataKey: 'id',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'id',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'companyName',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'investorName',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'amountInvested',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'tokenAmount',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'tokenValue',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'createdAt',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'updatedAt',
  },
  {
    type: RowCellType.STATUS,
    dataKey: 'status',
  },
  {
    type: RowCellType.MANAGER_ACTIONS,
    dataKey: 'id',
    extra: {
      href: '/dashboard/investments-workspace',
    },
  },
];

export const InvestmentsTable: FC<InvestmentsTableProps> = (props: InvestmentsTableProps) => {
  const { t } = useTranslation();

  const header = [
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investments.id'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investments.company'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investments.investor'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investments.amount'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investments.tokens'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investments.tokenValue'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investments.createdAt'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investments.lastUpdated'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('investments.status'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
  ];

  const { investmentsData = [], campaignData } = props;
  const enhancedData = investmentsData.map((investment) => {
    const campaignInformation: NewCampaign | InvestmentCampaignDto =
      campaignData || (investment as Components.Schemas.InvestmentDto).campaign;
    return {
      ...investment,
      createdAt: dateTimeFormat(new Date(investment.createdAt)),
      updatedAt: dateTimeFormat(new Date(investment.updatedAt)),
      companyName: campaignInformation?.company?.name,
      investorName: `${investment.user.firstName} ${investment.user.lastName}`,
      amountInvested: campaignInformation?.tokenValue * investment.tokenAmount,
      tokenValue: campaignInformation?.tokenValue,
    };
  });
  return (
    <Box sx={{ mt: '42px', p: '16px 8px', borderRadius: '8px', border: '1px solid #E3E5E6' }}>
      <Table<NewInvestmentDto>
        showSearch
        showSortBy
        showPagination
        showHeader={true}
        header={header}
        rows={enhancedData}
        rowCells={rowCells}
      />
    </Box>
  );
};
