import type { FC, ReactNode } from 'react';
import { createContext, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';
import type { User } from '../types/user';
import { Routes } from '../constants';
import { RegisterSuccessSnack } from '../snacks';
import { EmailVerificationStatus, PasswordResetStatus, PasswordUpdateStatus } from '../types/auth';
interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

interface VerifyEmailRequest {
  token: string;
}

interface ResetPasswordRequest {
  email: string;
}

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  isSecondFactorActive: boolean;
  user: User | null;
  emailVerificationStatus: EmailVerificationStatus | null;
  passwordResetStatus: PasswordResetStatus | null;
  passwordUpdateStatus: PasswordUpdateStatus | null;
}

export interface AuthContextValue extends State {
  platform: 'JWT';
  login: (payload: Components.Schemas.LogInDto) => Promise<void>;
  logout: () => Promise<void>;
  register: (params: RegisterRequest) => Promise<void>;
  verifyEmail: (params: VerifyEmailRequest) => Promise<void>;
  resetPassword: (params: ResetPasswordRequest) => Promise<void>;
  updatePassword: (payload: Components.Schemas.UpdatePasswordDto) => Promise<void>;
  updateUserPassword: (payload: Components.Schemas.UpdateUserPasswordDto) => Promise<void>;
  twoFactorAuth: (
    payload: Components.Schemas.TwoFactorAuthenticationInvestmentDto
  ) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: 'INITIALIZE';
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: 'LOGIN';
  payload: {
    user: User;
    isSecondFactorActive: boolean;
  };
};

type TwoFactorAuthAction = {
  type: 'TWOFACTORAUTH';
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: 'LOGOUT';
};

type RegisterAction = {
  type: 'REGISTER';
  payload: {
    user: User;
  };
};

type EmailVerifyAction = {
  type: 'EMAIL_VERIFY';
  payload: {
    emailVerificationStatus: EmailVerificationStatus;
  };
};

type ResetPasswordAction = {
  type: 'RESET_PASSWORD';
  payload: {
    passwordResetStatus: PasswordResetStatus;
  };
};

type UpdatePasswordAction = {
  type: 'UPDATE_PASSWORD';
  payload: {
    passwordUpdateStatus: PasswordUpdateStatus;
  };
};

type Action =
  | InitializeAction
  | LoginAction
  | TwoFactorAuthAction
  | LogoutAction
  | RegisterAction
  | EmailVerifyAction
  | ResetPasswordAction
  | UpdatePasswordAction;

const initialState: State = {
  isAuthenticated: false,
  isSecondFactorActive: false,
  isInitialized: false,
  user: null,
  emailVerificationStatus: null,
  passwordResetStatus: null,
  passwordUpdateStatus: null,
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isSecondFactorActive: true,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user, isSecondFactorActive } = action.payload;

    return {
      ...state,
      isSecondFactorActive: isSecondFactorActive,
      isAuthenticated: true,
      user,
    };
  },
  TWOFACTORAUTH: (state: State, action: TwoFactorAuthAction): State => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    isSecondFactorActive: false,
    user: null,
  }),
  REGISTER: (state: State, action: RegisterAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
  EMAIL_VERIFY: (state: State, action: EmailVerifyAction): State => {
    const { emailVerificationStatus } = action.payload;

    return {
      ...state,
      emailVerificationStatus,
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verifyEmail: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  updateUserPassword: () => Promise.resolve(),
  twoFactorAuth: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (
          accessToken
          //  && verify(accessToken, JWT_SECRET)
        ) {
          GadgetClientJava.setSession(accessToken);
          // const response = await axios.get<{ user: User }>('/api/identity/me');
          // const { user } = response.data;
          const user = jwtDecode<unknown>(accessToken) as User;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (payload: Components.Schemas.LogInDto): Promise<void> => {
    const { email, password } = payload;
    const client = await GadgetClientJava.getClient();
    const response = await client.authControllerLogin(undefined, { email, password });
    const { isSecondFactorActive, accessToken } = response.data;
    const user = jwtDecode<unknown>(accessToken) as User;
    GadgetClientJava.setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        isSecondFactorActive,
      },
    });
  };

  const twoFactorAuth = async (
    payload: Components.Schemas.TwoFactorAuthenticationInvestmentDto
  ): Promise<void> => {
    const { token } = payload;
    const client = await GadgetClientJava.getClient();
    const response = await client.twoFactorAuthenticationControllerAuthenticate(undefined, {
      token,
    });
    const { accessToken } = response.data as Components.Schemas.AuthSessionDto;
    const user = jwtDecode<unknown>(accessToken) as User;
    GadgetClientJava.setSession(accessToken);
    dispatch({
      type: 'TWOFACTORAUTH',
      payload: {
        user,
      },
    });
  };

  const logout = async (): Promise<void> => {
    GadgetClientJava.setSession(null);
    enqueueSnackbar('Logged out', {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
      variant: 'info',
    });
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (payload: RegisterRequest): Promise<void> => {
    const { email, firstName, lastName, phone, password } = payload;
    const client = await GadgetClientJava.getClient();
    try {
      const response = await client.authControllerRegister(undefined, {
        email,
        firstName,
        lastName,
        phone,
        password,
        passwordConfirmation: password
      });
      if (response.status === 200) {
        enqueueSnackbar(RegisterSuccessSnack.message, {
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top',
          },
          variant: 'info',
        });
        navigate(Routes.EmailConfirmationPage);
      }
    } catch (err) {
      const message = err.response.data.message;
      const errorsMessage = Array.isArray(err.response.data.message)
        ? [...message].join()
        : message;
      enqueueSnackbar(errorsMessage, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
        variant: 'error',
      });
      // throw new Error(errorsMessage);
    }
  };

  const verifyEmail = async (payload: VerifyEmailRequest): Promise<void> => {
    const { token } = payload;
    const client = await GadgetClientJava.getClient();
    try {
      const response = await client.authControllerEmailConfirm({
        token,
      });
      if (response.status === 200) {
        dispatch({
          type: 'EMAIL_VERIFY',
          payload: {
            emailVerificationStatus: EmailVerificationStatus.CONFIRMED,
          },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch({
        type: 'EMAIL_VERIFY',
        payload: {
          emailVerificationStatus: EmailVerificationStatus.FAILED,
        },
      });
    }
  };

  const resetPassword = async (payload: ResetPasswordRequest): Promise<void> => {
    const { email } = payload;
    const client = await GadgetClientJava.getClient();
    try {
      const response = await client.authControllerResetPassword(undefined, {
        email,
      });
      if (response.status === 200) {
        dispatch({
          type: 'RESET_PASSWORD',
          payload: {
            passwordResetStatus: PasswordResetStatus.SUCCESS,
          },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch({
        type: 'RESET_PASSWORD',
        payload: {
          passwordResetStatus: PasswordResetStatus.FAILED,
        },
      });
      throw new Error(err?.response?.data?.message);
    }
  };

  const updateUserPassword = async (
    payload: Components.Schemas.UpdateUserPasswordDto
  ): Promise<void> => {
    const { currentPassword, newPassword, newPasswordConfirmation } = payload;
    const client = await GadgetClientJava.getClient();
    try {
      const response = await client.userControllerUpdatePassword(undefined, {
        currentPassword,
        newPassword,
        newPasswordConfirmation,
      });
      if (response.status === 200) {
        dispatch({
          type: 'UPDATE_PASSWORD',
          payload: {
            passwordUpdateStatus: PasswordUpdateStatus.SUCCESS,
          },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch({
        type: 'UPDATE_PASSWORD',
        payload: {
          passwordUpdateStatus: PasswordUpdateStatus.FAILED,
        },
      });
      throw new Error(err?.response?.data?.message);
    }
  };

  const updatePassword = async (payload: Components.Schemas.UpdatePasswordDto): Promise<void> => {
    const { password, passwordConfirmation, token } = payload;
    const client = await GadgetClientJava.getClient();
    try {
      const response = await client.authControllerUpdatePassword(undefined, {
        password,
        passwordConfirmation,
        token,
      });
      if (response.status === 200) {
        dispatch({
          type: 'UPDATE_PASSWORD',
          payload: {
            passwordUpdateStatus: PasswordUpdateStatus.SUCCESS,
          },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch({
        type: 'UPDATE_PASSWORD',
        payload: {
          passwordUpdateStatus: PasswordUpdateStatus.FAILED,
        },
      });
      throw new Error(err?.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        logout,
        register,
        verifyEmail,
        resetPassword,
        updatePassword,
        updateUserPassword,
        twoFactorAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
