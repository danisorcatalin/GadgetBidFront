import { Box, Typography } from '@mui/material';
import { Spacer } from 'components/Spacer';
import { useTranslation } from 'react-i18next';

const CampaignSubmittedCard = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        sx={{
          color: '#000000',
          fontSize: '16.5px !important',
          letterSpacing: '-0.33px',
          textAlign: 'left',
        }}
      >
        {t('campaign.submittedCampaign')}
      </Typography>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          mt: 5.5,
          border: '1px solid #E3E5E6',
          borderRadius: '8px',
          letterSpacing: '-0.88px',
          maxWidth: '1024px',
        }}
      >
        <Typography sx={{ color: '#000000' }} variant="h1">
          {t('campaign.wellDone')}
        </Typography>
        <Spacer marginBottom="40px" />
        <Typography
          sx={{ color: '#3769ff', fontSize: '44px', fontWeight: 400, whiteSpace: 'pre' }}
          variant="h4"
        >
          {t('campaign.analyseCampaign')}
        </Typography>
        <Spacer marginBottom="70px" />
        <Box>
          <Box
            sx={{
              width: '265px',
              height: '89px',
              backgroundColor: 'primary.main',
              borderRadius: '4px',
              mb: 10,
            }}
          />

          <Box
            sx={{
              width: '100px',
              height: '50px',
              borderTopLeftRadius: '150px',
              borderTopRightRadius: '150px',
              border: '85px solid black',
              borderBottom: '0',
              boxSizing: 'content-box',
              mb: -2,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default CampaignSubmittedCard;
