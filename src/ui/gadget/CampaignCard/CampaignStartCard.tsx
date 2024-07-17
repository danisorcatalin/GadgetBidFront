import { Box, Typography } from '@mui/material';
import { Spacer } from 'components/Spacer';
import { useTranslation } from 'react-i18next';
import { responsive } from 'theme';
import { GadgetInput } from 'ui/gadget/GadgetInput';

const CampaignStartCard = (): JSX.Element => {
  const { t } = useTranslation();
  const supportEmail = 'dreambold@gadgetbid.com';

  return (
    <>
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
          {t('campaign.patienceIsKey')}
        </Typography>
        <Spacer marginBottom="20px" />
        <Typography
          sx={{
            color: '#000000',
            fontSize: '16.5px !important',
            letterSpacing: '-0.33px',
            textAlign: 'left',
          }}
        >
          {t('campaign.analysingApp')}
        </Typography>
        <Spacer marginBottom="100px" />
        <Typography
          sx={{
            color: '#000000',
            textAlign: 'left',
            whiteSpace: 'pre',
          }}
          variant="h3"
        >
          {t('campaign.emailUs')}
        </Typography>
        <Spacer marginBottom="30px" />
        <Box sx={responsive.campaignStartCard.inputBox}>
          <GadgetInput
            style={{ color: '#96B7DB', border: '1px solid #96B7DB' }}
            disabled={true}
            name="email"
            value={supportEmail}
          />
        </Box>
        <Spacer marginBottom="30px" />
      </Box>
    </>
  );
};

export default CampaignStartCard;
