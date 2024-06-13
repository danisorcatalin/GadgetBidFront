import { Box } from '@mui/material';
import { Form, FormInput, FormInputType } from 'components/generic/Form';
import ResponsiveVideoPlayer from 'components/generic/ResponsiveVideoPlayer';
import { useCampaignDetailsContext } from 'hooks/contexts';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GTM_EVENTS } from '../../../../../../../../constants';

export interface CampaignYoutubePreviewProps {
  onChange?: (values: CampaignYoutubePreviewFormInput) => void;
  youtubeLink: string;
  readonly: boolean;
}

export type CampaignYoutubePreviewFormInput = {
  youtubeLink: string;
  submit: boolean;
};

export const CampaignYoutubePreview: FC<CampaignYoutubePreviewProps> = (
  props: CampaignYoutubePreviewProps
): JSX.Element => {
  const { youtubeLink = '', readonly } = props;
  const [youtubeUrl, setYoutubeUrl] = useState<string>(youtubeLink);
  const { onCampaignYoutubeSubmit } = useCampaignDetailsContext();
  const handleSubmit = async (values: CampaignYoutubePreviewFormInput) => {
    setYoutubeUrl(values.youtubeLink);
    onCampaignYoutubeSubmit()(values.youtubeLink);
  };
  const { t } = useTranslation();
  const inputs: FormInput[] = [
    {
      name: 'youtubeLink',
      label: t('campaign.youtubeLink'),
      type: FormInputType.TEXT_FIELD,
      disabled: readonly,
      gridItemProps: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const initialValues: CampaignYoutubePreviewFormInput = {
    youtubeLink: youtubeUrl ?? '',
    submit: false,
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Form<CampaignYoutubePreviewFormInput>
        inputs={inputs}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitBtnText={youtubeUrl ? t('general.update') : t('general.save')}
        submitBtnFullWidth={true}
        readonly={readonly}
        submitEventName={
          youtubeUrl
            ? GTM_EVENTS.CAMPAIGN_YOUTUBE_UPDATE_CLICK
            : GTM_EVENTS.CAMPAIGN_YOUTUBE_SAVE_CLICK
        }
      />
      {youtubeUrl ? (
        <Box
          sx={{
            mt: 3,
          }}
        >
          <ResponsiveVideoPlayer url={youtubeUrl} controls={true} />
        </Box>
      ) : null}
    </Box>
  );
};
