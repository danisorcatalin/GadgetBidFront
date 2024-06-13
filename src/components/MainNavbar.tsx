import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Divider, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '../icons/Menu';
import Logo from './Logo';

interface MainNavbarProps {
  onSidebarMobileOpen?: () => void;
}

const MainNavbar: FC<MainNavbarProps> = (props) => {
  const { onSidebarMobileOpen } = props;

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              md: 'none',
            },
          }}
          size="large"
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <RouterLink to="/">
          <Logo
            sx={{
              display: {
                md: 'inline',
                xs: 'none',
              },
              height: 50,
              width: 100,
            }}
          />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func,
};

export default MainNavbar;
