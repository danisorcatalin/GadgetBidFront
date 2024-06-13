import { userDataMock, onboardDataMock, useAuthHook } from 'mocks';
import type { InvestorGeneralInformationTabProps } from './InvestorGeneralInformationTab';

export const mockInvestorGeneralInformationTabProps: InvestorGeneralInformationTabProps = {
  userData: userDataMock,
  onboardData: onboardDataMock,
  userKycFiles: [],
  useAuthHook,
};
