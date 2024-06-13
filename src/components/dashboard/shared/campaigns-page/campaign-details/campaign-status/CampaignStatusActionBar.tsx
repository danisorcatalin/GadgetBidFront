import { Button, Box } from '@mui/material';
import type { FC } from 'react';

import ArrowRightIcon from '../../../../../../icons/ArrowRight';
import ArrowLeftIcon from '../../../../../../icons/ArrowLeft';
import CircularProgress from '@mui/material/CircularProgress';

import { CampaignStatus } from 'types/campaign';
import { getNextCampaignStatus, getStatusColor } from 'utils/user';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useState } from 'react';
import Label from 'components/Label';

export interface CampaignStatusActionBarProps {
  listingTemplateOk: number;
  currentStatus: CampaignStatus;
  onStatusChange?: (newStatus: CampaignStatus) => Promise<void>;
  onStartTokenizationClick?: () => Promise<void>;
}

export const CampaignStatusActionBar: FC<CampaignStatusActionBarProps> = (
  props: CampaignStatusActionBarProps
) => {
  const {
    listingTemplateOk,
    currentStatus,
    onStatusChange,
    onStartTokenizationClick = () => {},
  } = props;
  const { prev: prevUserStatus, next: nextUserStatus } = getNextCampaignStatus(
    listingTemplateOk,
    currentStatus
  );
  const { t } = useTranslation();
  const [tokenizationStarted, setTokenizationStarted] = useState(false);
  const handleStartTokenization = useCallback(async () => {
    setTokenizationStarted(true);
    await onStartTokenizationClick();
    setTokenizationStarted(false);
  }, [onStartTokenizationClick]);

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
        {currentStatus === 'READY' && (
          <Button
            style={{
              backgroundColor: getStatusColor('AUDIT'),
              marginRight: '4px',
            }}
            size="large"
            variant="contained"
            onClick={() => onStatusChange('AUDIT')}
          >
            {t('campaign.statusActionBar.accept')}
          </Button>
        )}
        {currentStatus === 'READY' && (
          <Button
            style={{
              backgroundColor: getStatusColor('IN_PROGRESS'),
              marginRight: '4px',
            }}
            size="large"
            variant="contained"
            onClick={() => onStatusChange('IN_PROGRESS')}
          >
            {t('campaign.statusActionBar.reject')}
          </Button>
        )}
        {currentStatus === 'LISTED' && (
          <Button
            style={{
              backgroundColor: getStatusColor('AUDIT_DONE'),
              marginRight: '4px',
            }}
            size="large"
            variant="contained"
            onClick={() => onStatusChange('AUDIT_DONE')}
          >
            {t('campaign.statusActionBar.unlist')}
          </Button>
        )}
        {currentStatus === 'TOKENIZATION' && (
          <Button
            style={{
              backgroundColor: getStatusColor('TOKENIZATION'),
              marginRight: '4px',
            }}
            size="large"
            variant="contained"
            onClick={handleStartTokenization}
          >
            {tokenizationStarted ? (
              <>
                {t('campaign.statusActionBar.issuingTokens')}{' '}
                <CircularProgress sx={{ marginLeft: '4px' }} />
              </>
            ) : (
              t('campaign.statusActionBar.startTokenization')
            )}
          </Button>
        )}
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
