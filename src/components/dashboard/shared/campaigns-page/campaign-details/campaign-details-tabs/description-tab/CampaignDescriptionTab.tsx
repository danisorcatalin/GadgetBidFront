import gtm from '../../../../../../../lib/gtm';
import type { FC } from 'react';
import { Box, Button } from '@mui/material';
import { Campaign } from 'types/campaign';
import { CampaignDescriptionTextEditor } from './campaign-description-text-editor/CampaignDescriptionTextEditor';
import { GTM_EVENTS } from '../../../../../../../constants';
import { useCampaignDetailsContext } from 'hooks/contexts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface CampaignDescriptionTabProps {
  readonly: boolean;
  campaignData: Partial<Campaign>;
}

export const CampaignDescriptionTab: FC<CampaignDescriptionTabProps> = (
  props: CampaignDescriptionTabProps
): JSX.Element => {
  const { campaignData = {}, readonly } = props;
  const [value, setValue] = useState<string | undefined>(campaignData?.description);
  const { onCampaignDescriptionSave } = useCampaignDetailsContext();
  const handleChange = (value: string) => {
    setValue(value);
  };
  const handleSave = () => {
    onCampaignDescriptionSave()(value);
    gtm.push({ event: GTM_EVENTS.CAMPAIGN_DESCRIPTION_SAVE_CLICK });
  };
  const { t } = useTranslation();

  return (
    <Box>
      <CampaignDescriptionTextEditor
        readonly={readonly}
        onChange={handleChange}
        initialText={campaignData.description || t('campaign.descriptionTab.description')}
      />
      <Button
        color="primary"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 4 }}
        onClick={handleSave}
        disabled={readonly}
      >
        {t('campaign.descriptionTab.save')}
      </Button>
    </Box>
  );
};
