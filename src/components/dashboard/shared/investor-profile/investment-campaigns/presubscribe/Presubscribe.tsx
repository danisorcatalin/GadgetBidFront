import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Components } from 'lib/GadgetClientJava';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NewCampaign } from 'types/campaign';
import { SimpleCompany } from 'types/company';
import { SelectTokens } from '../invest-wizard/SelectTokens';
import { Spacer } from 'components/Spacer';

interface Props {
  campaignData: NewCampaign;
  presubscribe?: (tokenAmount: number) => Promise<void>;
  cancelPresubcribeToCampaign?: () => Promise<void>;
  previousPresubscription?: Components.Schemas.InvestmentDto;
}

export const Presubscribe = (props: Props): JSX.Element => {
  const {
    campaignData,
    previousPresubscription,
    presubscribe = () => {},
    cancelPresubcribeToCampaign = () => {},
  } = props;
  const {
    company = {} as SimpleCompany,
    tokenValue,
    currency,
    remainingTicketsPerInvestor,
  } = campaignData;
  const { t } = useTranslation();
  const [tokenAmount, setTokenAmount] = useState(0);
  const handleTokenChange = (value) => {
    setTokenAmount(value);
    localStorage.setItem('presubscribeTokenAmount', value);
  };

  return (
    <Card sx={{ mt: 5 }}>
      <CardHeader
        sx={{ color: '#000000' }}
        title={`${company.name.toUpperCase()} - ${t('crowdfunding.campaign.presubscribe')}`}
        titleTypographyProps={{ variant: 'h1' }}
      />
      <CardContent sx={{ backgroundColor: '#FFFFFF' }}>
        <Box sx={{ mt: -4, mb: 3 }}>
          <Typography display="inline" variant="body1">
            {t('campaign.form.ticketValue')}
          </Typography>
          <Typography display="inline" sx={{ ml: 1 }} variant="h3">
            {campaignData.tokenValue}
          </Typography>
        </Box>
        {previousPresubscription ? (
          <>
            <Typography display="inline" variant="h2">
              {t('crowdfunding.campaign.presubscribeUpdateInfo')}
            </Typography>
            <Typography sx={{ color: '#000000' }} display="inline" variant="h3">
              {` ${previousPresubscription.tokenAmount}`}.
            </Typography>
            <Typography variant="h2">
              {t('crowdfunding.campaign.presubscribeUpdateConfirm')}
            </Typography>
          </>
        ) : (
          <Typography variant="h2">{t('crowdfunding.campaign.presubscribeInfo')}</Typography>
        )}

        <SelectTokens
          currency={currency}
          fromPresubscribe={true}
          tokenAmount={tokenAmount}
          tokenValue={tokenValue}
          remainingTicketsPerInvestor={remainingTicketsPerInvestor}
          onChange={handleTokenChange}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={tokenAmount === 0}
            onClick={() => presubscribe(tokenAmount)}
          >
            {t('crowdfunding.campaign.presubscribe')}
          </Button>
          <Spacer marginBottom="10px" />
          <Button variant="contained" color="primary" onClick={() => cancelPresubcribeToCampaign()}>
            {t('actions.cancel')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
