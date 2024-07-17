import { useRef, useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Avatar, Box, Button, ButtonBase, Popover, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import gtm from '../../lib/gtm';
import { GTM_EVENTS } from '../../constants';

const styles = {
  popover: {
    marginTop: '5px',
    width: 132,
    borderRadius: '0px 0px 4px 4px',
    padding: '8px',
    backgroundColor: '#96B7DB',
  },
  popoverText: {
    paddingTop: '2px',
    paddingBottom: '4px',
    color: '#FFFFFF',
    letterSpacing: '-0.22px',
    lineHeight: '12px',
    fontSize: '11px',
  },
  popoverButton: {
    padding: '2px 4px',
    height: '16px',
    borderRadius: '4px',
    border: 0,
    width: '100%',
    backgroundColor: '#D7E1FF',
    '&:hover': { border: 0, backgroundColor: '#F5F7FF' },
    lineHeight: '12px',
    fontSize: '11px',
  },
};

const AccountPopover: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleOpen = (): void => {
    gtm.push({ event: GTM_EVENTS.ACCOUNT_DROPDOWN_CLICK });
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await logout();
      navigate('/');
      gtm.push({ event: GTM_EVENTS.LOGOUT_CLICK });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(t('general.snackbar.unableToLogout'), {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
        variant: 'error',
      });
    }
  };

  const accountSettingsEventClick = (): void => {
    handleClose();
    gtm.push({ event: GTM_EVENTS.ACCOUNT_SETTINGS_CLICK });
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
          src={user.avatar as string}
          sx={{
            height: 32,
            width: 32,
          }}
        />
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        elevation={1}
        PaperProps={{
          sx: styles.popover,
        }}
      >
        <Box>
          <Typography sx={styles.popoverText} variant="subtitle2">
            {t('sidebar.myAccount')}
          </Typography>
        </Box>
        <Box>
          <RouterLink to="/dashboard/account" style={{ textDecoration: 'none' }}>
            <Button
              color="primary"
              fullWidth
              onClick={accountSettingsEventClick}
              variant="outlined"
              size="medium"
              sx={styles.popoverButton}
            >
              {t('sidebar.settings')}
            </Button>
          </RouterLink>
          <Button
            color="primary"
            fullWidth
            onClick={handleLogout}
            variant="outlined"
            size="medium"
            sx={styles.popoverButton}
          >
            {t('sidebar.logout')}
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default AccountPopover;
