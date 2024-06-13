import InfoModal from 'components/generic/InfoModal';
import gtm from '../../../../../../lib/gtm';
import { Box, Button, Typography } from '@mui/material';
import { GTM_EVENTS } from '../../../../../../constants';
import { InfoButton } from 'components/generic/InfoButton';
import { Spacer } from 'components/Spacer';
import { useModal } from 'mui-modal-provider';
import { useTranslation } from 'react-i18next';
import { useGetVerifyUrl } from '../../../../../../api/useGetVerifyUrl';

export const KycRedirect = (): JSX.Element => {
  const onClick = async () => {
    gtm.push({ event: GTM_EVENTS.INVESTMENT_WIZARD_GET_VERIFIED_CLICK });
    const { redirectUrl } = await GetUrl();
    location.href = redirectUrl;
  };
  const { t } = useTranslation();
  const { showModal } = useModal();

  async function GetUrl() {
    return await useGetVerifyUrl();
  }

  return (
    <Box>
      <Typography sx={{ color: '#000000' }} variant="h1">
        {t('investment.investmentWizard')}
      </Typography>
      <Spacer marginBottom="15px" />
      <Typography
        sx={{
          color: '#000000',
          fontSize: '22px',
          letterSpacing: '-0.44px',
          lineHeight: '24px',
          textAlign: 'left',
          whiteSpace: 'pre',
        }}
      >
        {t('investment.kycRedirect.redirected')}
      </Typography>
      <Spacer marginBottom="20px" />
      <InfoButton
        handleClick={() => {
          showModal(InfoModal, { text: t('investment.kycRedirect.info') });
        }}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth={true}
        sx={{ mt: 4, mb: 3, fontSize: '24px' }}
        onClick={onClick}
      >
        {t('investment.kycRedirect.getVerified')}
      </Button>
    </Box>
  );
};
