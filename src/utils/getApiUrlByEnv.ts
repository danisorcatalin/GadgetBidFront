import { ApiUrl } from '../constants';

const getApiUrlByEnv = (): ApiUrl => {
  const { REACT_APP_ENV } = process.env;
  switch (REACT_APP_ENV) {
    case 'local':
      return ApiUrl.local;
    case 'development':
      return ApiUrl.development;
    case 'staging':
      return ApiUrl.staging;
    case 'production':
      return ApiUrl.production;
    default:
      return undefined;
  }
};

export const apiUrl = getApiUrlByEnv();
