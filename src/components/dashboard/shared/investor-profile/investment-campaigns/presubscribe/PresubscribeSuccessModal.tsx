import { Box, Button, Dialog, DialogProps, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PresubscribeSuccessModal: FC = (props: DialogProps): JSX.Element => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog {...props} fullWidth={true} open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'flex-start ',
          width: '600px',
        }}
      >
        <Typography sx={{ color: '#000000', mb: 2 }} variant="h1">
          {t('crowdfunding.campaign.presubscribeSuccessModal.congratulations')}
        </Typography>
        <Typography variant="h2">
          {t('crowdfunding.campaign.presubscribeSuccessModal.message')}
        </Typography>
        <Button
          sx={{ mt: 3 }}
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleClose}
          href="/dashboard"
        >
          {t('crowdfunding.campaign.presubscribeSuccessModal.seeOtherCampaigns')}
        </Button>
      </Box>
    </Dialog>
  );
};

export default PresubscribeSuccessModal;
