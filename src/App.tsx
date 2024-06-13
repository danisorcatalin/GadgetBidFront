import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import ModalProvider from 'mui-modal-provider';
import { CssBaseline, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import './i18n/i18n';
import RTL from './components/RTL';
import SplashScreen from './components/SplashScreen';
import { gtmConfig } from './config';
import useAuth from './hooks/useAuth';
import { useInitGadgetClient } from 'hooks';
import useScrollReset from './hooks/useScrollReset';
import useSettings from './hooks/useSettings';
import gtm from './lib/gtm';
import routes from './routes';
import { createCustomTheme } from './theme';
import { useEventsContext } from './hooks';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const App: FC = () => {
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const auth = useAuth();
  const { doLogout } = useEventsContext();
  const { gadgetClientInitialized } = useInitGadgetClient();
  useScrollReset();

  useEffect(() => {
    gtm.initialize(gtmConfig);
    console.log('GTM initialized');
  }, []);

  useEffect(() => {
    if (doLogout) {
      global.auth = auth;
      auth.logout();
    }
  }, [doLogout]);

  const theme = createCustomTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  return (
    <SWRConfig
      value={{
        suspense: true,
      }}
    >
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <RTL direction={settings.direction}>
              <CssBaseline />
              {gadgetClientInitialized && auth.isInitialized ? content : <SplashScreen />}
            </RTL>
          </ModalProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </SWRConfig>
  );
};

export default App;
