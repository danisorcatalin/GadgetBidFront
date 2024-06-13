import { styled } from '@mui/styles';
import { CampaignDetailsForm } from './CampaignDetailsForm';
import { CampaignDetailsTabs } from './campaign-details-tabs';
import confetti from 'canvas-confetti';

import { FC, useState } from 'react';
import type { Campaign, CampaignMember, CampaignFile } from 'types/campaign';
import { Box, Button } from '@mui/material';
import { useCampaignDetailsContext } from 'hooks/contexts';
import { CampaignStatusComponent } from '../campaign-status/CampaignStatusComponent';
import { CompanyDto } from 'types/company';
import { CampaignNoCompany } from './campaign-messages/CampaignNoCompany';
import { useTranslation } from 'react-i18next';
import { StatusStepper } from 'components/generic/StatusStepper';
import { campaignStepperStatuses, getCampaignStepperStatusString } from 'utils/status-stepper';
import { Link as RouterLink } from 'react-router-dom';

export interface CampaignDetailsProps {
  campaignData: Partial<Campaign>;
  campaignMembers: CampaignMember[];
  campaignFiles: CampaignFile[];
  userCompany: CompanyDto;
  showCampaignStatus?: boolean;
  readonly?: boolean;
  managerView?: boolean;
}

const StyledCampaignStatus = styled(CampaignStatusComponent)({
  position: 'absolute',
  right: '30px',
  transform: 'translateY(-200%)',
});

export const CampaignDetails: FC<CampaignDetailsProps> = (
  props: CampaignDetailsProps
): JSX.Element => {
  const {
    campaignData,
    userCompany,
    campaignMembers,
    campaignFiles,
    showCampaignStatus,
    readonly,
    managerView,
  } = props;
  const { status } = campaignData;
  const { onFinalizeCampaign } = useCampaignDetailsContext();
  const onFinalize = (): void => {
    onFinalizeCampaign()();
    function showConfetti() {
      const myCanvas = document.createElement('canvas');
      document.body.appendChild(myCanvas);
      confetti.create(myCanvas, {
        resize: true,
        useWorker: true,
      });
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
      };
      function fire(particleRatio, opts) {
        confetti(
          Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
          })
        );
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
    showConfetti();
  };
  const { t } = useTranslation();

  const [campaignTabsCompleted, setCampaignTabsCompleted] = useState(false);

  const checkCampaignTabsCompletion = (tabsCompleted: boolean): void => {
    setCampaignTabsCompleted(tabsCompleted);
  };

  if (!userCompany.id) return <CampaignNoCompany />;
  return (
    <>
      {showCampaignStatus && campaignData.id && <StyledCampaignStatus status={status} />}
      <Box sx={{ my: 3 }}>
        <StatusStepper
          steps={campaignStepperStatuses}
          activeStep={campaignStepperStatuses.indexOf(
            getCampaignStepperStatusString(campaignData.status)
          )}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <CampaignDetailsForm
          managerView={managerView}
          userCompany={userCompany}
          campaignData={campaignData}
          readonly={readonly}
        />
      </Box>
      {campaignData.id ? (
        <>
          <CampaignDetailsTabs
            campaignData={campaignData}
            campaignMembers={campaignMembers}
            campaignFiles={campaignFiles}
            readonly={readonly}
            checkTabsCompletion={checkCampaignTabsCompletion}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Button
              variant="contained"
              sx={{ mt: 4, mx: 2 }}
              component={RouterLink}
              to={`/dashboard/${
                managerView ? 'investor-campaign-workspace' : 'investor-campaign'
              }/${campaignData.id}`}
            >
              {t('campaign.details.preview')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, mx: 2, mb: 6 }}
              disabled={
                readonly || !campaignTabsCompleted || (status === 'IN_PROGRESS' ? false : true)
              }
              onClick={() => onFinalize()}
            >
              {t('campaign.details.submit')}
            </Button>
          </Box>
        </>
      ) : null}
    </>
  );
};
