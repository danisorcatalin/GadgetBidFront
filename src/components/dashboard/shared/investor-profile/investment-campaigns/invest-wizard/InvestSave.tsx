import { Box, Button, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import WarningIcon from '@mui/icons-material/Warning';
import { InvestmentsTable } from '../../investments/table';
import { useTranslation } from 'react-i18next';
import { numberFormat } from 'utils/utils';
import gtm from '../../../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../../../constants';
import { CampaignCurrency } from 'types/campaign';
import type { Components as JavaComponents } from 'lib/GadgetClientJava';

interface InvestFinishProps {
  tokenValue: number;
  tokenAmount: number;
  currency: CampaignCurrency;
  saveInvestment?: (tokenAmount: number, tokenValue: number) => Promise<void>;
  updateInvestment?: (investmentId: number, tokenAmount: number) => Promise<void>;
  investmentSaved: boolean;
  campaignId: number;
  lastUserInvestment: JavaComponents.Schemas.NewInvestmentDto;
  userInvestmentsInCurrentCampaign: JavaComponents.Schemas.NewInvestmentDto[];
}

const StyledInvestmentsTable = styled(InvestmentsTable)`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const InvestSave = (props: InvestFinishProps): JSX.Element => {
  const {
    tokenValue,
    tokenAmount,
    currency,
    saveInvestment = async () => {},
    updateInvestment = async () => {},
    investmentSaved = false,
    lastUserInvestment,
    userInvestmentsInCurrentCampaign = [],
  } = props;
  const { t } = useTranslation();
  const currentInvestmentValue = tokenValue * tokenAmount;
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  // userInvestmentsInCurrentCampaign.map((investment) => {
  //   investment.createdAt = new Date(investment.createdAt).toLocaleString();
  //   investment.updatedAt = new Date(investment.updatedAt).toLocaleString();
  // });

  const userHasPreviousInvestments = !!lastUserInvestment;
  let lastInvestmentValue = 0;
  if (userHasPreviousInvestments) {
    lastInvestmentValue = lastUserInvestment.tokenAmount * tokenValue;
  }

  const handleSaveInvestment = () => {
    gtm.push({ event: GTM_EVENTS.INVESTMENT_WIZARD_CONFIRM_CLICK });
    saveInvestment(tokenAmount, tokenValue);
  };

  const handleUpdateInvestment = () => {
    gtm.push({ event: GTM_EVENTS.INVESTMENT_WIZARD_CONFIRM_CLICK });
    const newTokenAmount = tokenAmount + lastUserInvestment.tokenAmount;
    updateInvestment(lastUserInvestment.id, newTokenAmount);
  };

  return (
    <Box sx={{ pt: 5, pb: 5 }} textAlign="center">
      {userHasPreviousInvestments && (
        <>
          <Typography textAlign="center" variant="h4">
            {numberFormat(currentInvestmentValue, currency)}
          </Typography>
          <Typography gutterBottom textAlign="center" variant="h5">
            {t('investment.save.toInvest')}
          </Typography>
          <WarningIcon fontSize="large" sx={{ color: 'orange' }} style={{ marginTop: 16 }} />
          <Typography>{t('investment.save.investToCampaign')}:</Typography>
          <StyledInvestmentsTable data={userInvestmentsInCurrentCampaign} />
          <Typography>
            {t('investment.save.changeYourInvestment')}{' '}
            {numberFormat(lastInvestmentValue, currency)} {t('investment.save.to')}{' '}
            {numberFormat(currentInvestmentValue + lastInvestmentValue, currency)}?
          </Typography>
        </>
      )}
      <Typography sx={{ mb: 1 }}>{t('investment.save.saveYourInvestment')}</Typography>
      <Typography
        sx={{ margin: 'auto', width: mobileDevice ? '100%' : '50%', whiteSpace: 'pre-wrap' }}
      >
        {t('investment.save.investToCampaignRisksOne')}{' '}
        <Link
          target="_blank"
          underline="none"
          sx={{ color: 'primary.main' }}
          href={'https://gadgetbid.com/'}
        >
          {t('investment.save.investToCampaignRisksTwo')}{' '}
        </Link>
        {t('investment.save.investToCampaignRisksThree')}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={userHasPreviousInvestments ? handleUpdateInvestment : handleSaveInvestment}
        sx={{ mt: 3, fontSize: '24px' }}
        disabled={investmentSaved}
        fullWidth={true}
      >
        {t('investment.save.confirmYourInvestment')}
      </Button>
    </Box>
  );
};
