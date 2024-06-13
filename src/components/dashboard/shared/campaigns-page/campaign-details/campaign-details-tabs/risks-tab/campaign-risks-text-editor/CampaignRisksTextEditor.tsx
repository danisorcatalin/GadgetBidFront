import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { TextEditor } from 'components/generic/TextEditor';
import { Campaign } from 'types/campaign';
import { useCampaignDetailsContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';
import gtm from '../../../../../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../../../../../constants';

export interface CampaignRisksTextEditorProps {
  readonly: boolean;
  campaignData: Partial<Campaign>;
}

export const CampaignRisksTextEditor: FC<CampaignRisksTextEditorProps> = (
  props: CampaignRisksTextEditorProps
): JSX.Element => {
  const { campaignData = {}, readonly } = props;
  const [value, setValue] = useState<string | undefined>(campaignData.risk);
  const handleChange = (value: string) => {
    setValue(value);
  };
  const { onCampaignRiskSave } = useCampaignDetailsContext();
  const handleSave = () => {
    onCampaignRiskSave()(value);
    gtm.push({ event: GTM_EVENTS.CAMPAIGN_RISKS_SAVE_CLICK });
  };
  const { t } = useTranslation();

  return (
    <Box>
      <TextEditor
        readonly={readonly}
        onChange={handleChange}
        placeholder={t('campaign.risksPlaceholder')}
        initialText={campaignData.risk}
      />
      <Button
        color="primary"
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 4 }}
        onClick={handleSave}
        disabled={readonly}
      >
        {t('general.save')}
      </Button>
    </Box>
  );
};
