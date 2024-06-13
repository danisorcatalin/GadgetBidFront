import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ResponsiveVideoPlayer from 'components/generic/ResponsiveVideoPlayer';
import { dateTimeFormat, numberFormat } from 'utils/utils';
import { useTranslation } from 'react-i18next';
import { NewCampaign } from 'types/campaign';

interface Props {
  campaignData: Partial<NewCampaign>;
}

export const InvestmentCampaignCard: FC<Props> = (props: Props) => {
  const { campaignData = {} } = props;
  const {
    id,
    description,
    amountRaised,
    maximumAmountToRaise,
    startDate,
    endDate,
    videoPresentation,
    amountToRaise,
    currency,
    companyName,
  } = campaignData;
  const { t } = useTranslation();

  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('xl'));
  const progressBarValue = 100 * (amountRaised / amountToRaise);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: mobileDevice ? 'column' : 'row',
      }}
    >
      <CardContent
        sx={{
          width: mobileDevice ? '100%' : 600,
        }}
      >
        <Grid container flexDirection="column" spacing={2}>
          <Grid item>
            <Typography color="textPrimary" variant="h5">
              {companyName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" variant="body2">
              {description?.replace(/(<([^>]+)>)/gi, '')}
            </Typography>
          </Grid>
          <Grid item>
            <Box>
              <Typography color="textPrimary" variant="caption">
                {numberFormat(amountRaised, currency)} {t('ongoing.campaign.from')}{' '}
                {numberFormat(maximumAmountToRaise, currency)} {t('ongoing.campaign.confirmed')}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progressBarValue > 100 ? 100 : progressBarValue}
              />
            </Box>
            {startDate && endDate && (
              <Typography
                color="textPrimary"
                variant="caption"
                sx={{ marginTop: mobileDevice ? 2 : 0 }}
              >
                {dateTimeFormat(new Date(startDate))} - {dateTimeFormat(new Date(endDate))}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              component={RouterLink}
              to={`/dashboard/investor-campaign/${id}`}
            >
              {t('ongoing.campaign.details')}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <CardMedia sx={{ width: '50%', p: 2 }}>
        <ResponsiveVideoPlayer url={videoPresentation} controls={true} />
      </CardMedia>
    </Card>
  );
};
