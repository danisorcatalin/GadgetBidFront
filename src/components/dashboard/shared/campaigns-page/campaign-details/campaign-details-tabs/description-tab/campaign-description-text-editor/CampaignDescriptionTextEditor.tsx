import { Box } from '@mui/material';
import { FC } from 'react';
import { TextEditor } from 'components/generic/TextEditor';
import { useTranslation } from 'react-i18next';

export interface CampaignDescriptionTextEditorProps {
  initialText?: string;
  readonly?: boolean;
  onChange?: (value: string) => void;
}

export const CampaignDescriptionTextEditor: FC<CampaignDescriptionTextEditorProps> = (
  props: CampaignDescriptionTextEditorProps
): JSX.Element => {
  const { onChange = () => {}, readonly = false, initialText } = props;
  const { t } = useTranslation();

  return (
    <Box>
      <TextEditor
        readonly={readonly}
        onChange={onChange}
        placeholder={t('campaign.descriptionPlaceholder')}
        initialText={initialText}
      />
    </Box>
  );
};
