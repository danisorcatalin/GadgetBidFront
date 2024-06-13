import { Button, Container, Dialog, DialogProps, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = DialogProps & {
  childComponent: JSX.Element;
  title: string;
  handleAccept: () => void;
};

const TermsModal: FC = (props: Props): JSX.Element => {
  const { title, handleAccept = () => {}, childComponent, ...rest } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const acceptClicked = () => {
    handleAccept();
    handleClose();
  };

  return (
    <Dialog {...rest} fullWidth={true} open={open} onClose={handleClose} maxWidth="lg">
      <Container
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Typography variant="h1">{title}</Typography>
        {childComponent}
        <Button color="primary" variant="contained" fullWidth={true} onClick={acceptClicked}>
          {t('campaign.statusActionBar.accept')}
        </Button>
      </Container>
    </Dialog>
  );
};

export default TermsModal;
