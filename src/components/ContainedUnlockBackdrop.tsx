import { useState } from 'react';
import { Box, FormControlLabel, Switch, Button } from '@mui/material';

import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
  onSave?: () => void;
}

export const ContainedUnlockBackdrop: FC<Props> = (props: Props): JSX.Element => {
  const { onSave = () => {}, children } = props;
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const handleSave = () => {
    setChecked(false);
    onSave();
  };
  const { t } = useTranslation();

  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      {!checked ? (
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
        >
          <FormControlLabel
            control={
              <Switch checked={checked} onChange={handleChange} name="checkedB" color="primary" />
            }
            label={t('general.unlock')}
          />
        </Box>
      ) : (
        <Box mt={2}>
          <Button variant="contained" onClick={handleSave}>
            {t('general.save')}
          </Button>
        </Box>
      )}
    </Box>
  );
};
