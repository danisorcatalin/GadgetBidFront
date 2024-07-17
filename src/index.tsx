import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import App from './App';
import { AuthProvider } from './contexts/JWTContext';
import { EventsProvider } from './contexts/EventsContext';
import { SettingsProvider } from './contexts/SettingsContext';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import store from './store';
import './index.css';

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <StyledEngineProvider injectFirst>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <BrowserRouter>
                <SnackbarProvider dense maxSnack={3}>
                  <AuthProvider>
                    <EventsProvider>
                      <App />
                    </EventsProvider>
                  </AuthProvider>
                </SnackbarProvider>
              </BrowserRouter>
            </SettingsProvider>
          </LocalizationProvider>
        </StyledEngineProvider>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
