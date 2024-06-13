import { CardContent, Card } from '@mui/material';
import { RowCell, RowCellType, Table } from 'components/generic/Table';
import { Components as JavaComponents } from 'lib/GadgetClientJava';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { dateTimeFormat } from 'utils/utils';

interface Props {
  data: JavaComponents.Schemas.InvestmentDto[];
  userId?: number;
  isAdmin?: boolean;
  className?: string;
}

interface SimplifiedInvestmentData {
  company: string;
  amountInvested: number;
  tokenValue?: number;
  date: string;
  id: number;
}
export const InvestmentsTable: FC<Props> = (props: Props) => {
  const { data, isAdmin = false, className } = props;
  const { t } = useTranslation();
  // if (userId !== undefined) {
  //   const hrefCellIdx = rowCells.findIndex((cell) => cell.type === RowCellType.MANAGER_ACTIONS);
  //   rowCells[hrefCellIdx].extra.href = `/dashboard/investors-workspace/${userId}/investment/`;
  // }
  const header = [
    {
      cellType: RowCellType.INVESTMENT_TEXT,
      cellValue: t('investments.company'),
    },
    {
      cellType: RowCellType.INVESTMENT_TEXT,
      cellValue: t('investments.amount'),
    },
    {
      cellType: RowCellType.INVESTMENT_TEXT,
      cellValue: t('investments.date'),
    },
    {
      cellType: RowCellType.INVESTMENT_TEXT,
      cellValue: '',
    },
  ];
  const rowCells: RowCell[] = [
    {
      type: RowCellType.INVESTMENT_COMPANY_TEXT,
      dataKey: 'company',
    },
    {
      type: RowCellType.INVESTMENT_TEXT,
      dataKey: 'amountInvested',
    },
    {
      type: RowCellType.INVESTMENT_TEXT,
      dataKey: 'date',
    },
    {
      type: RowCellType.MANAGER_ACTIONS,
      dataKey: 'id',
      extra: {
        href: isAdmin ? '/dashboard/investments-workspace' : '/dashboard/investor-investments',
      },
    },
  ];

  const investmentsData: SimplifiedInvestmentData[] = data.map((req) => ({
    createdAt: new Date(req.createdAt).toLocaleString(),
    updatedAt: new Date(req.updatedAt).toLocaleString(),
    company: req.campaign?.company?.name,
    amountInvested: req.campaign.tokenValue
      ? req.campaign.tokenValue * req.tokenAmount
      : req.tokenAmount,
    date: dateTimeFormat(new Date(req.createdAt)),
    id: req.id,
  }));
  return (
    <Card sx={{ mt: 5, maxWidth: '1024px' }}>
      <CardContent
        sx={{
          background: '#FFFFFF',
          maxWidth: '1024px',
        }}
      >
        <Table<SimplifiedInvestmentData>
          showHeader={true}
          header={header}
          rows={investmentsData}
          rowCells={rowCells}
          className={className}
        />
      </CardContent>
    </Card>
  );
};
