import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { FC } from 'react';

import type { NewCampaign } from 'types/campaign';
import { numberFormat } from 'utils/utils';
import { useTranslation } from 'react-i18next';
interface Props {
  campaignData: Partial<NewCampaign>;
  showAmountRaised?: boolean;
}

export const InvestmentCampaignNotInProgress: FC<Props> = (props: Props) => {
  const { campaignData = {}, showAmountRaised = true } = props;
  const { description, companyName, amountRaised, currency } = campaignData;
  const { t } = useTranslation();

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
      <CardContent>
        <Grid container flexDirection="column" alignItems="center" spacing={1}>
          <Grid item>
            <Typography color="textPrimary" variant="h5">
              {companyName}
            </Typography>
          </Grid>
          {showAmountRaised && (
            <Grid item>
              <Typography color="textSecondary" variant="body2">
                {numberFormat(amountRaised, currency)} {t('investment.campaign.wasRaised')}
              </Typography>
            </Grid>
          )}

          <Grid item>
            <Typography color="textSecondary" variant="body2">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardMedia
        sx={{ width: 200, height: 200, borderRadius: '50%', mt: 2 }}
        image="https://i.imgur.com/RfzdGRE.jpeg"
        title={companyName}
      />
    </Card>
  );
};
