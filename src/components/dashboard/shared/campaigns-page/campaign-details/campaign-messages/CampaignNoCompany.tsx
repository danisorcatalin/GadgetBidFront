import { Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CampaignNoCompany = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>{t('campaign.noCompany')}</CardContent>
    </Card>
  );
};
