import React from 'react';
import { CssBaseline, ThemeProvider, experimentalStyled } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { SnackbarProvider } from 'notistack';
import { StylesProvider } from '@mui/styles';
import { SettingsProvider } from '../src/contexts/SettingsContext';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import RTL from '../src/components/RTL';
import SettingsDrawer from '../src/components/SettingsDrawer';
import useSettings from '../src/hooks/useSettings';

import { createCustomTheme } from '../src/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => {
    return (
      <Wrapper>
        <Story {...context} />
      </Wrapper>
    );
  },
];

function Wrapper({ children }) {
  return (
    <SettingsProvider>
      <SnackbarProvider dense maxSnack={3}>
        <Inner>{children}</Inner>
        {/* {children} */}
      </SnackbarProvider>
    </SettingsProvider>
  );
}

function Inner({ children }) {
  const { settings } = useSettings();
  const theme = createCustomTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });
  return (
    <HelmetProvider>
      <BrowserRouter>
        <EmotionThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <ModalProvider>
              <RTL direction={settings.direction}>
                <CssBaseline />
                <MainLayoutRoot>{children}</MainLayoutRoot>
                <SettingsDrawer />
              </RTL>
            </ModalProvider>
          </ThemeProvider>
        </EmotionThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

const MainLayoutRoot = experimentalStyled('div')(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    // padding: 50,
  };
});
