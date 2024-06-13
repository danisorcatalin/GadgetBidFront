import { Button, Box } from '@mui/material';
import { InvestorOnboardStatus } from '../../../../types/user';

import type { FC } from 'react';

import ArrowRightIcon from '../../../../icons/ArrowRight';
import ArrowLeftIcon from '../../../../icons/ArrowLeft';

import { getNextInvestorOnboardStatus, getStatusColor } from '../../../../utils/user';
import Label from 'components/Label';
import { colors } from 'theme';

interface Props {
  kycCompleted: boolean;
  currentStatus: InvestorOnboardStatus;
  onStatusChange: (newStatus: InvestorOnboardStatus) => Promise<void>;
}

export const InvestorStatusActionBar: FC<Props> = (props: Props) => {
  const { kycCompleted: isKycCompleted, currentStatus, onStatusChange } = props;
  const { prev: prevUserStatus, next: nextUserStatus } = getNextInvestorOnboardStatus(
    isKycCompleted,
    currentStatus
  );

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
        <Label
          sx={{
            backgroundColor: isKycCompleted ? colors.label.green : colors.label.red,
            ml: '4px',
          }}
        >
          {isKycCompleted ? 'KYC OK' : 'KYC NOT OK'}
        </Label>
      </div>
      <div>
        {prevUserStatus?.status && (
          <Button
            style={{
              backgroundColor: getStatusColor(prevUserStatus.status),
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
        {nextUserStatus?.status && (
          <Button
            style={{ backgroundColor: getStatusColor(nextUserStatus.status) }}
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
