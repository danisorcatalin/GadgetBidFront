import merge from 'lodash/merge';
import { createTheme } from '@mui/material/styles';
import type { Direction, Theme, ThemeOptions } from '@mui/material';
import { THEMES } from '../constants';
import { lightShadows } from './shadows';

interface ThemeConfig {
  direction?: Direction;
  responsiveFontSizes?: boolean;
  roundedCorners?: boolean;
  theme?: string;
}

const theme = createTheme();

const baseOptions: ThemeOptions = {
  direction: 'ltr',
  components: {
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: '75%',
          width: '75%',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          ':hover fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: '#96B7DB',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '22px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          backgroundColor: '#fff',
          color: '#96B7DB',
          ':disabled': {
            backgroundColor: '#E3E5E6',
          },
        },
        root: {
          textTransform: 'none',
          borderRadius: '4px',
          justifyContent: 'flex-start',
          height: '32px',
          paddingLeft: '10px',
          paddingRight: '50px',
          transition: 'all 0.5s',
          '&.Mui-disabled': {
            backgroundColor: '#E3E5E6',
          },
        },
        contained: {
          ':hover': {
            boxShadow: '0px 8px #CCCCCC',
            transition: 'all 0.5s',
            transform: 'translateY(-8px)',
            backgroundColor: '#96B7DB',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
        '#nprogress .bar': {
          zIndex: '2000 !important',
        },
        '#nprogress .spinner': {
          zIndex: '2000 !important',
          height: '100%',
          width: '100%',
          display: 'flex !important',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '#nprogress .spinner .spinner-icon': {
          height: '100px',
          width: '100px',
          border: 'solid 5px transparent',
          borderTopColor: '#29d',
          borderLeftColor: '#29d',
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: '0.6px solid #96B7DB',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: '16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '4px',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          borderRadius: '4px',
          color: '#FFFFFF',
          height: '32px',
          width: '32px',
          padding: 0,
          marginRight: '10px',
          hover: {
            backgroundColor: '#FFFFFF',
          },
          input: {
            opacity: 1,
            width: '32px',
            height: '32px',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          height: '32px',
          width: '32px',
          padding: 0,
          hover: {
            backgroundColor: '#FFFFFF',
          },
          input: {
            opacity: 1,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          background: '#F4F6FF',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#96B7DB',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiButtonBase-root': {
            transition: 'all 0.5s',
            ':hover': {
              backgroundColor: '#000000',
              transition: 'all 0.5s',
              borderColor: '#000000',
              color: '#FFFFFF',
              boxShadow: 'none',
              transform: 'none',
            },
          },
        },
        indicator: {
          display: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#96B7DB',
          border: '0.6px solid #96B7DB',
          borderRadius: '6px',
          fontSize: '16px',
          minHeight: '28px',
          minWidth: '180px',
          maxWidth: '100%',
          marginRight: '24px',
          padding: '0px 0px 0px 5px',
          alignItems: 'start',
          textTransform: 'none',
          '&.Mui-selected': {
            backgroundColor: '#96B7DB',
            color: '#FFFFFF',
          },
          '& .MuiBadge-root': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: '100%',

            '& .MuiBadge-badge': {
              minWidth: '15px',
              height: '15px',
              top: '10px',
              right: '13px',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: '6px',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
  },
  typography: {
    button: {
      fontWeight: 500,
      fontSize: '22px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
    },
    fontFamily:
      'NeueHaas, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: {
      fontWeight: 700,
      fontFamily:
        'NeueHaasBold, NeueHaas, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      fontSize: '44px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '28px',
      },
    },
    h2: {
      fontWeight: 500,
      fontSize: '22px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
    },
    h3: {
      fontWeight: 700,
      fontFamily:
        'NeueHaasBold, NeueHaas, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      fontSize: '22px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '32px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '22px',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '24px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '18px',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '18px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },
    overline: {
      fontWeight: 600,
    },
  },
};

const themesOptions: Record<string, ThemeOptions> = {
  [THEMES.LIGHT]: {
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
          input: {
            '&::placeholder': {
              opacity: 0.86,
              color: '#42526e',
            },
          },
        },
      },
    },
    palette: {
      action: {
        active: '#6b778c',
      },
      background: {
        default: '#fff',
        paper: '#ffffff',
      },
      error: {
        contrastText: '#ffffff',
        main: '#f44336',
      },
      mode: 'light',
      primary: {
        contrastText: '#ffffff',
        main: '#96B7DB',
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50',
      },
      text: {
        primary: '#172b4d',
        secondary: '#6b778c',
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800',
      },
    },
    shadows: lightShadows,
  },
};

export const createCustomTheme = (config: ThemeConfig = {}): Theme => {
  let themeOptions = themesOptions[config.theme];

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    themeOptions = themesOptions[THEMES.LIGHT];
  }

  const theme = createTheme(
    merge(
      {},
      baseOptions,
      themeOptions,
      {
        ...(config.roundedCorners && {
          shape: {
            borderRadius: 16,
          },
        }),
      },
      {
        direction: config.direction,
      }
    )
  );

  if (config.responsiveFontSizes) {
    // theme = responsiveFontSizes(theme);
  }

  return theme;
};

export const inputColors = {
  primaryColor: '#96B7DB',
  secondaryColor: '#A2AAAD',
  errorColor: '#F44336',
  whiteColor: '#FFFFFF',
  lightBlue: '#D7E1FF',
  black: '#000000',
};

export const colors = {
  font: {
    blue: '#96B7DB',
  },
  bg: {
    lightBlue1: '#D7E1FF',
    lightBlue2: '#F4F6FF',
  },
  label: {
    green: '#00E600',
    red: '#de1a1a',
    blue: '#96B7DB',
    yellow: '#ffd639',
  },
};
export const responsive = {
  tabs: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiTabs-flexContainer': {
        flexWrap: 'wrap',
        '& .MuiButtonBase-root': { width: '100%', mb: 1 },
      },
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiTabs-flexContainer': {
      display: { xs: 'flex', sm: 'grid' },
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '5px',
      marginBottom: '24px',

      '& .MuiButtonBase-root': {
        margin: 0,
      },
    },
  },
  investorCampaignTabs: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiTabs-flexContainer': {
        flexWrap: 'wrap',
        '& .MuiButtonBase-root': { width: '100%', mb: 1 },
      },
    },
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiTabs-flexContainer': {
      display: { xs: 'flex', sm: 'grid' },
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '5px',
      marginBottom: '24px',

      '& .MuiButtonBase-root': {
        margin: 0,
      },
    },
  },
  issuerOverview: {
    text: {
      color: '#C7CCCE',
      width: '20px',
      mr: 8,
      fontSize: '44px',
      [theme.breakpoints.down('sm')]: {
        mr: 4,
        fontSize: '28px',
      },
    },
    checkIcon: {
      color: '#96B7DB',
      width: '69px',
      height: '69px',
      [theme.breakpoints.down('sm')]: {
        width: '39px',
        height: '39px',
      },
    },
  },
  investmentsPieChart: {
    cardContent: {
      background: '#FFFFFF',
      maxWidth: '1024px',
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      flexDirection: 'row' as const,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center' as const,
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
      },
    },
    box: {
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center' as const,
        marginBottom: '20px',
      },
    },
  },
  investmentDetails: {
    elrondTransaction: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      flexDirection: 'column' as const,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
      },
    },
  },
  campaignStartCard: {
    inputBox: {
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
  carousel: {
    card: {
      footer: {
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
      footerBox: {
        [theme.breakpoints.down('sm')]: {
          marginRight: 0,
          justifyContent: 'space-between',
        },
      },
      footerText: {
        [theme.breakpoints.between('md', 'lg')]: {
          marginRight: '25px',
        },
      },
    },
  },
  publicPage: {
    py: '80px',
    [theme.breakpoints.down('sm')]: {
      py: '40px',
    },
  },
  investmentCampaignDetails: {
    description: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      flexDirection: 'row' as const,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column' as const,
      },
    },
    companyName: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      justifyContent: 'space-between' as const,
      [theme.breakpoints.down('sm')]: {
        mb: 2,
      },
    },
  },
};
