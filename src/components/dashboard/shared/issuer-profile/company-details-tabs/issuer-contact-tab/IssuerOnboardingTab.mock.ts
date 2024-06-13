import { userDataMock, useAuthHook } from 'mocks';
import type { IssuerOnboardingTabProps } from './IssuerContactTab';

export const mockIssuerOnboardingTabProps: IssuerOnboardingTabProps = {
  userData: userDataMock,
  onboard: {},
  userOnboardFiles: [],
  useAuthHook,
};
