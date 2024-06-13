import { Box } from '@mui/material';

import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  locked: boolean;
}

export const ContainedBackdrop: FC<Props> = (props: Props): JSX.Element => {
  const { locked, children } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      {locked && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        ></Box>
      )}
    </Box>
  );
};
