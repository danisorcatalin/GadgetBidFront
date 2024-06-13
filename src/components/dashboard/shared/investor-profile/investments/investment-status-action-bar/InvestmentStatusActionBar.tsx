import { Button, Box } from '@mui/material';
import { InvestmentStatus } from 'types/investment';

import type { FC } from 'react';

import ArrowRightIcon from 'icons/ArrowRight';
import ArrowLeftIcon from 'icons/ArrowLeft';

import { getNextInvestmentStatus, getStatusColor } from 'utils/user';
import Label from 'components/Label';

interface Props {
  currentStatus: InvestmentStatus;
  onStatusChange: (newStatus: InvestmentStatus) => Promise<void>;
}

export const InvestmentStatusActionBar: FC<Props> = (props: Props) => {
  const { currentStatus, onStatusChange } = props;
  const { prev: prevUserStatus, next: nextUserStatus } = getNextInvestmentStatus(currentStatus);
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
        {!prevUserStatus.disabled && prevUserStatus?.status && (
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
        {!nextUserStatus.disabled && nextUserStatus?.status && (
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
