import { Box, Theme, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

interface Props {
  handleClick: () => void;
  stylingProps?: Partial<SxProps<Theme>>;
}

export const InfoButton = (props: Props): JSX.Element => {
  const { handleClick, stylingProps = {} } = props;
  return (
    <Box
      onClick={handleClick}
      sx={{
        height: '36px',
        width: '36px',
        border: '1px solid #96B7DB',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.main',
          cursor: 'pointer',
          color: 'primary.contrastText',
        },
        ...stylingProps,
      }}
    >
      <Typography variant="h3">i</Typography>
    </Box>
  );
};
