import { ApiUrl, ApiUrlJava } from '../constants';

const getApiUrlByEnv = (): ApiUrl | ApiUrlJava => {
  const { REACT_APP_ENV } = process.env;
  switch (REACT_APP_ENV) {
    case 'local':
      return ApiUrlJava.local;
    case 'development':
      return ApiUrlJava.development;
    case 'staging':
      return ApiUrlJava.staging;
    case 'production':
      return ApiUrlJava.production;
    default:
      return undefined;
  }
};

export const apiUrlJava = getApiUrlByEnv();
