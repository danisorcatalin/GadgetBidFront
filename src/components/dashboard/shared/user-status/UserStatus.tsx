import { Typography, Button, Box } from '@mui/material';
import { UserRole, UserOnboardStatus } from 'types/user';

import { getStatusColor } from 'utils/user';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

export interface UserStatusProps {
  userType: UserRole;
  status: UserOnboardStatus;
  className?: string;
}

export const UserStatus: FC<UserStatusProps> = (props: UserStatusProps): JSX.Element => {
  const { status, className } = props;
  const { t } = useTranslation();
  return (
    <Box className={className}>
      <Typography variant="button" marginRight={1}>
        {t('general.status')}:
      </Typography>
      <Button style={{ color: getStatusColor(status) }} size="large" variant="outlined">
        {status}
      </Button>
    </Box>
  );
};
