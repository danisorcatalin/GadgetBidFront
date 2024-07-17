import { useRef, useState } from 'react';
import type { FC } from 'react';
import {
  Avatar,
  Box,
  ButtonBase,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';
import i18n from 'i18n/i18n';
import { getLanguage } from 'utils/utils';
import gtm from '../../lib/gtm';
import { GTM_EVENTS } from '../../constants';

const LanguagePopover: FC = () => {
  let currentLanguage = getLanguage();
  let [currentFlag] = useState<string>('/static/united-kingdom.svg');
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  if (currentLanguage === 'en') {
    currentLanguage = 'English';
    currentFlag = '/static/united-kingdom.svg';
  }

  if (currentLanguage === 'ro') {
    currentLanguage = 'Romanian';
    currentFlag = '/static/romania.svg';
  }

  const handleOpen = (): void => {
    gtm.push({ event: GTM_EVENTS.LANGUAGE_DROPDOWN_CLICK });
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const changeLanguage = (lng) => {
    gtm.push({ event: GTM_EVENTS.LANGUAGE_CHANGE_CLICK });
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    handleClose();
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Avatar
          src={currentFlag}
          sx={{
            height: 16,
            width: 16,
            right: 5,
          }}
        />
        <Typography color="textPrimary" variant="subtitle2">
          {currentLanguage}
        </Typography>
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 150 },
        }}
      >
        <Box>
          <MenuItem onClick={() => changeLanguage('en')}>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  English
                </Typography>
              }
            />
          </MenuItem>
          <MenuItem onClick={() => changeLanguage('ro')}>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Romanian
                </Typography>
              }
            />
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default LanguagePopover;
