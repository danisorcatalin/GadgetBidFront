import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { experimentalStyled } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material';
import MenuIcon from '../../icons/Menu';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import Logo from '../Logo';
import { Menu } from 'ui/gadget';

interface DashboardNavbarProps extends AppBarProps {
  onSidebarMobileOpen?: () => void;
}

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === 'light' && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    color: theme.palette.primary.contrastText,
  }),
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
  }),
  zIndex: theme.zIndex.drawer + 100,
}));

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onSidebarMobileOpen, ...other } = props;

  return (
    <Box sx={{ position: 'sticky', top: 0, right: 0, zIndex: 2 }}>
      <Menu onSidebarMobileOpen={onSidebarMobileOpen} />
    </Box>
  );

  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              lg: 'none',
            },
          }}
          size="large"
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <RouterLink to="dashboard">
          <Logo
            sx={{
              display: {
                lg: 'inline',
                xs: 'none',
              },
              height: 50,
              width: 100,
            }}
          />
        </RouterLink>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2,
          }}
        />
        <Box sx={{ ml: 2 }}>
          <LanguagePopover />
        </Box>
        <Box sx={{ ml: 2 }}>
          <AccountPopover />
        </Box>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

DashboardNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func,
};

export default DashboardNavbar;
