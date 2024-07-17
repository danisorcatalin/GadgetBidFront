import { Table } from 'components/generic/Table';
import { withErrorSuspense } from '../../../../utils/withErrorSuspense';

import { FC, useEffect } from 'react';
import { UserOutputDto } from '../../../../types/user';
import { RowCell, RowCellType } from 'components/generic/Table/Table.types';
import { useTranslation } from 'react-i18next';
import gtm from '../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../constants';
import { Box } from '@mui/material';
import { useGetIssuerList } from 'api/hooks/useGetIssuerList';

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
    dataKey: 'companyName',
  },
  {
    type: RowCellType.TEXT,
    dataKey: 'accountManagerName',
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
      href: '/dashboard/issuers-workspace',
    },
  },
];

const IssuersWorkspace: FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Issuers Workspace' });
  }, []);

  const header = [
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('issuer.id'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('issuer.firstName'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('issuer.lastName'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('issuer.company'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('issuer.accountManager'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('issuer.email'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('issuer.phone'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('issuer.role'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: t('issuer.status'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
  ];
  const { data: users } = useGetIssuerList();
  const rows = users.map((user) => {
    return {
      ...user,
      status: user.onboardStatus,
      accountManagerName: user.accountManagerName,
      companyName: user.companyName,
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
        rows={rows.filter((d) => d.role === 'USER')}
        rowCells={rowCells}
      />
    </Box>
  );
};

export default withErrorSuspense(IssuersWorkspace);
