import { Container, Dialog, DialogProps, Typography } from '@mui/material';
import { FC, useState } from 'react';

type Props = DialogProps & {
  text: string;
};

const InfoModal: FC = (props: Props): JSX.Element => {
  const { text, ...rest } = props;
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog {...rest} fullWidth={true} open={open} onClose={handleClose}>
      <Container
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '552px',
          height: '288px',
        }}
      >
        <Typography sx={{ whiteSpace: 'pre-line' }} variant="h2">
          {text}
        </Typography>
      </Container>
    </Dialog>
  );
};

export default InfoModal;
