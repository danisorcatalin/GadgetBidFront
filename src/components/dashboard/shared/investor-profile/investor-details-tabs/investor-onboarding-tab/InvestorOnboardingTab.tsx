import { FC } from 'react';
import { UploadDocument } from 'types/document';

import type { InvestorOnboardFileType, UserOnboard } from 'types/user';
import { InvestorOnboardingDocumentsTable } from './investor-onboarding-documents-table/InvestorOnboardingDocumentsTable';

export interface InvestorOnboardingTabProps {
  onboardData: Partial<UserOnboard>;
  useAuthHook?: unknown;
  uploadInvestorDocument?: UploadDocument<InvestorOnboardFileType>;
}

export const InvestorOnboardingTab: FC<InvestorOnboardingTabProps> = (
  props: InvestorOnboardingTabProps
): JSX.Element => {
  const { onboardData, useAuthHook } = props;

  return <InvestorOnboardingDocumentsTable onboardData={onboardData} useAuthHook={useAuthHook} />;
};
