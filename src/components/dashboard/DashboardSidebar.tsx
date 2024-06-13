import { useEffect } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Link } from '@mui/material';
import Logo from '../Logo';

import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';
import { getSections } from '../../dashboard-sidebar-menu';
import useAuth from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import gtm from '../../lib/gtm';
import { GTM_EVENTS } from '../../constants';
import { useTranslation } from 'react-i18next';
import LogoutIcon from '@mui/icons-material/Logout';
import { Spacer } from 'components/Spacer';
interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
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

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box
          sx={{
            display: {
              lg: 'none',
              xs: 'flex',
            },
            justifyContent: 'center',
            p: 2,
          }}
        >
          <RouterLink to="/">
            <Logo
              sx={{
                height: 50,
                width: 100,
              }}
            />
          </RouterLink>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {getSections(user.role).map((section, index) => (
            <NavSection
              key={`dashboardSidebar.${index}`}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3,
                },
              }}
              {...section}
            />
          ))}
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Link
            underline="hover"
            component={RouterLink}
            sx={{
              color: '#172b4d',
              fontSize: '12px',
              lineHeight: 2.5,
              fontWeight: 700,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
            }}
            to="/authentication/login"
            onClick={handleLogout}
          >
            <LogoutIcon />
            <Spacer marginRight="5px" />
            {t('pages.logout')}
          </Link>
        </Box>
      </Scrollbar>
    </Box>
  );

  // if (lgUp) {
  //   return (
  //     <Drawer
  //       anchor="left"
  //       open
  //       PaperProps={{
  //         sx: {
  //           backgroundColor: 'background.paper',
  //           height: 'calc(100% - 64px) !important',
  //           top: '64px !Important',
  //           width: 280,
  //         },
  //       }}
  //       variant="permanent"
  //     >
  //       {content}
  //     </Drawer>
  //   );
  // }

  return (
    <Drawer
      anchor="right"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: 280,
        },
      }}
      variant="temporary"
      sx={{ display: { xs: 'block', md: 'none' } }}
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default DashboardSidebar;
