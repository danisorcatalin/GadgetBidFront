import AccountPopover from 'components/dashboard/AccountPopover';
import Logo from 'components/Logo';
import MenuIcon from '../../../icons/Menu';
import { Box, Button, IconButton, Grid } from '@mui/material';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { colors } from 'theme';
import { getMenuItems } from './menu-items';
import { useAuth } from 'hooks';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: '0 8px',
    backgroundColor: '#fff',
    height: '50px',
    borderBottom: '0.6px solid #3769FF',
  },
  logo: {},
  navigation: {
    // display: 'flex',
    // alignItems: 'center',

    a: {
      textDecoration: 'none',
    },
  },
  navButton: {
    height: '24px',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#000000',
      borderColor: '#000000',
      color: '#FFFFFF',
      boxShadow: 'none',
      transform: 'none',
    },
  },
  secondaryWrapper: {
    // display: 'flex',
    // alignItems: 'center',
  },
  settings: {
    // ml: '36px',
    // display: 'flex',
    // alignItems: 'center',
  },
};

export interface MenuProps {
  onSidebarMobileOpen?: () => void;
}

export const Menu = (props: MenuProps): JSX.Element => {
  const { onSidebarMobileOpen } = props;
  const { user } = useAuth();
  const { pathname } = useLocation();
  const { primary, infoText, secondary } = getMenuItems(user.role);
  return (
    // <Container maxWidth="xl">
    <Grid container sx={styles.wrapper}>
      <Grid item xs={1} sx={styles.logo}>
        <RouterLink to={primary.path}>
          <Logo
            sx={{
              width: 100,
            }}
          />
        </RouterLink>
      </Grid>
      <Grid
        container
        item
        xs={8}
        sx={{
          display: { md: 'flex', xs: 'none' },
          a: {
            textDecoration: 'none',
          },
        }}
        justifyContent="center"
      >
        <Grid item xs="auto">
          <RouterLink to={primary.path}>
            <Button
              variant={pathname === primary.path ? 'contained' : 'outlined'}
              sx={{ minWidth: 100, mr: '16px', ...styles.navButton }}
            >
              {primary.title}
            </Button>
          </RouterLink>
        </Grid>
        <Grid
          item
          sx={{
            fontSize: '11px',
            mr: '20px',
            color: colors.font.blue,
            position: 'relative',
            bottom: '5px',
          }}
        >
          {infoText}
        </Grid>
        {secondary.map((item) => {
          return (
            <Grid item xs="auto" key={item.title}>
              <RouterLink to={item.path}>
                <Button
                  variant={pathname === item.path ? 'contained' : 'outlined'}
                  sx={{
                    minWidth: 140,
                    maxWidth: 362,
                    '&:first-of-type': {
                      marginRight: '16px',
                    },
                    ...styles.navButton,
                  }}
                >
                  {item.title}
                </Button>
              </RouterLink>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        container
        xs={2}
        sx={{ display: { md: 'flex', xs: 'none' } }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Box sx={{ mr: '8px' }}>
          <LanguageSwitcher />
        </Box>

        <AccountPopover />
      </Grid>
      <Grid
        item
        container
        xs={1}
        sx={{ display: { md: 'none' } }}
        alignItems="center"
        justifyContent="flex-end"
      >
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
      </Grid>
    </Grid>
    // </Container>
  );
};
