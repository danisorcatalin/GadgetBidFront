import { Box, Button } from '@mui/material';
import { FC, useState } from 'react';
import { TextEditor } from 'components/generic/TextEditor';
import { useCampaignDetailsContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'types/campaign';
import gtm from '../../../../../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../../../../../constants';

export interface CampaignQaTextEditorProps {
  campaignData: Partial<Campaign>;
  readonly?: boolean;
}

export const CampaignQaTextEditor: FC<CampaignQaTextEditorProps> = (
  props: CampaignQaTextEditorProps
): JSX.Element => {
  const { readonly, campaignData = {} } = props;
  const [value, setValue] = useState<string | undefined>(campaignData.qa);
  const handleChange = (value: string) => {
    setValue(value);
  };
  const { onCampaignQaSave } = useCampaignDetailsContext();
  const handleSave = () => {
    onCampaignQaSave()(value);
    gtm.push({ event: GTM_EVENTS.CAMPAIGN_QA_SAVE_CLICK });
  };
  const { t } = useTranslation();

  return (
    <Box>
      <TextEditor
        readonly={readonly}
        onChange={handleChange}
        placeholder={t('campaign.qaPlaceholder')}
        initialText={campaignData.qa}
      />
      <Button
        color="primary"
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleSave}
        disabled={readonly}
      >
        {t('general.save')}
      </Button>
    </Box>
  );
};
