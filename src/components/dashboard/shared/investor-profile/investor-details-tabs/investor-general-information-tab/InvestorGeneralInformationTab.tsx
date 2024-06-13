import { InvestorDetailsForm, InvestorDetailsFormInputValues } from './investor-details-form';

import type { FC } from 'react';
import type { UserOnboardOutputDto, UserOutputSingleDto, UserKycFile } from 'types/user';
import { Box } from '@mui/material';
import { useInvestorProfileContext } from 'hooks/contexts';
import { InvestorOnboardingDocumentsTable } from '../investor-onboarding-tab/investor-onboarding-documents-table/InvestorOnboardingDocumentsTable';
import {
  InvestorVeriffDocument,
  InvestorVeriffDocumentsTable,
} from '../investor-onboarding-tab/investor-veriff-documents/InvestorVeriffDocuments';
export interface InvestorGeneralInformationTabProps {
  userData: Partial<UserOutputSingleDto>;
  userKycFiles: UserKycFile[];
  onboardData: Partial<UserOnboardOutputDto>;
  useAuthHook?: unknown;
  onInvestorDetailsSubmit?: (values: InvestorDetailsFormInputValues) => Promise<void>;
}

export const InvestorGeneralInformationTab: FC<InvestorGeneralInformationTabProps> = (
  props: InvestorGeneralInformationTabProps
): JSX.Element => {
  const { userData, onboardData, useAuthHook, userKycFiles } = props;
  const { onInvestorDetailsSubmit } = useInvestorProfileContext();
  const veriffFiles: InvestorVeriffDocument[] = userKycFiles.map(
    (item: UserKycFile): InvestorVeriffDocument => {
      const veriffFile: InvestorVeriffDocument = { ...item, filePath: '' };
      veriffFile.filePath = userData.kycCompleted ? `/api/user/${userData.id}/kyc/${item.id}` : '';
      return veriffFile;
    }
  );
  return (
    <>
      <InvestorDetailsForm
        userData={userData}
        useAuthHook={useAuthHook}
        onSubmit={onInvestorDetailsSubmit()}
      />

      <Box sx={{ mt: '32px' }}>
        <InvestorOnboardingDocumentsTable onboardData={onboardData} />
      </Box>
      <Box sx={{ mt: '32px' }}>
        <InvestorVeriffDocumentsTable userKycFiles={veriffFiles} userData={userData} />
      </Box>
    </>
  );
};
