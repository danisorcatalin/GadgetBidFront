import { Box, Button, Typography } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import WarningIcon from '@mui/icons-material/Warning';
import TimerIcon from '@mui/icons-material/Timer';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import gtm from '../../../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../../../constants';
import { useGetVerifyUrl } from '../../../../../../api/useGetVerifyUrl';

declare const window: unknown;

interface InvestFinishProps {
  kycCompleted: boolean;
  kycStatus: boolean;
  kycResponseStatus: string;
}

export const InvestFinish = (props: InvestFinishProps): JSX.Element => {
  const { kycStatus, kycResponseStatus } = props;

  const navigate = useNavigate();
  const redirectToMyInvestments = () => {
    navigate('/dashboard/investor-investments');
  };
  const { t } = useTranslation();

  window['Tawk_API'] = window['Tawk_API'] || {};

  // const maximizeTawk = () => {
  //   gtm.push({ event: GTM_EVENTS.INVESTMENT_WIZARD_CONTACT_SUPPORT_CLICK });
  //   window['Tawk_API'].maximize();
  // };

  async function GetUrl() {
    return await useGetVerifyUrl();
  }

  const retryVerification = async () => {
    gtm.push({ event: GTM_EVENTS.INVESTMENT_WIZARD_GET_VERIFIED_CLICK });
    const { redirectUrl } = await GetUrl();
    location.href = redirectUrl;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        pt: 5,
        pb: 5,
      }}
    >
      {kycStatus ? (
        <>
          <Typography sx={{ mb: 1 }}>
            {t('investment.finish.congratulationsOnYourInvestment')}
          </Typography>
          <Typography>{t('investment.finish.successfullyVerified')}</Typography>
          <DoneOutlineIcon fontSize="large" sx={{ color: 'green', my: 2 }} />
          <Typography>{t('investment.finish.checkEmailInbox')}</Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, fontSize: '24px' }}
            fullWidth={true}
            onClick={redirectToMyInvestments}
          >
            {t('investment.finish.goToYourInvestments')}
          </Button>
        </>
      ) : (
        <>
          {!kycStatus && ['submitted', 'started'].includes(kycResponseStatus) ? (
            <>
              <Typography>{t('investment.finish.tryingToVerifyYou')}</Typography>
              <TimerIcon fontSize="large" sx={{ color: 'orange' }} style={{ marginTop: 16 }} />
            </>
          ) : (
            <>
              <Typography>{t('investment.finish.tryingToVerifyYouProblem')}</Typography>
              <WarningIcon fontSize="large" sx={{ color: 'orange' }} style={{ marginTop: 16 }} />
              <Button
                onClick={retryVerification}
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3, fontSize: '24px' }}
                fullWidth={true}
              >
                {t('investment.finish.retryVerification')}
              </Button>
            </>
          )}
        </>
      )}
    </Box>
  );
};
