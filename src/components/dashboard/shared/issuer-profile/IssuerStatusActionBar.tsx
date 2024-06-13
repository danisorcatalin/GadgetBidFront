import { Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IssuerOnboardStatus } from '../../../../types/user';

import type { FC } from 'react';

import ArrowRightIcon from '../../../../icons/ArrowRight';
import ArrowLeftIcon from '../../../../icons/ArrowLeft';

import {
  getNextIssuerOnboardStatus,
  getIssuerStatusColor,
  getStatusColor,
} from '../../../../utils/user';
import { useTranslation } from 'react-i18next';
import Label from 'components/Label';

interface Props {
  kycCompleted: boolean;
  currentStatus: IssuerOnboardStatus;
  onStatusChange: (newStatus: IssuerOnboardStatus) => Promise<void>;
}

export const IssuerStatusActionBar: FC<Props> = (props: Props) => {
  const theme = useTheme();
  const { kycCompleted, currentStatus, onStatusChange } = props;
  const { prev: prevUserStatus, next: nextUserStatus } = getNextIssuerOnboardStatus(
    kycCompleted,
    currentStatus
  );
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 3,
      }}
    >
      <div>
        <Label
          sx={{
            backgroundColor: getStatusColor(currentStatus),
          }}
        >
          {currentStatus}
        </Label>
      </div>
      <div>
        {currentStatus === 'KYC_KYB_AML' && (
          <Button
            style={{
              backgroundColor: theme.palette.error.main,
              marginRight: '4px',
            }}
            size="large"
            variant="contained"
            onClick={() => onStatusChange('REJECTED')}
          >
            {t('issuer.reject')}
          </Button>
        )}
        {currentStatus === 'KYC_KYB_AML' && (
          <Button
            style={{
              backgroundColor: theme.palette.success.main,
              marginRight: '4px',
            }}
            size="large"
            variant="contained"
            onClick={() => onStatusChange('KYC_KYB_AML_OK')}
          >
            {t('issuer.accept')}
          </Button>
        )}

        {!prevUserStatus?.disabled && prevUserStatus?.status && (
          <Button
            style={{
              backgroundColor: getIssuerStatusColor(prevUserStatus.status, theme),
              marginRight: '4px',
            }}
            startIcon={<ArrowLeftIcon />}
            size="large"
            variant="contained"
            disabled={prevUserStatus.disabled}
            onClick={() => onStatusChange(prevUserStatus.status)}
          >
            {prevUserStatus.status}
          </Button>
        )}
        {!nextUserStatus?.disabled && nextUserStatus?.status && (
          <Button
            style={{ backgroundColor: getIssuerStatusColor(nextUserStatus.status, theme) }}
            endIcon={<ArrowRightIcon />}
            size="large"
            variant="contained"
            disabled={nextUserStatus.disabled}
            onClick={() => onStatusChange(nextUserStatus.status)}
          >
            {nextUserStatus.status}
          </Button>
        )}
      </div>
    </Box>
  );
};
