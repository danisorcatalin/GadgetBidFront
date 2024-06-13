import { Box } from '@mui/material';
import { CompanyDetailsTabs } from './company-details-tabs/CompanyDetailsTabs';

import type { FC } from 'react';
import type { Company, CompanyDetailsFormInputs } from 'types/company';
import type { UserOnboardOutputDto, UserOutputSingleDto } from 'types/user';
import { LegalRepresentativesInputValues } from './company-details-tabs/legal-representatives-tab/legal-representatives-dynamic-form';
import { ShareholdersInputValues } from './company-details-tabs/shareholders-tab/shareholders-dynamic-form/ShareholdersDynamicForm';
import { Components } from 'lib/GadgetClientJava';

interface IssuerProfileProps {
  companyData: Partial<Company>;
  userData: Partial<UserOutputSingleDto>;
  onboardData: UserOnboardOutputDto;
  userOnboardFiles: Components.Schemas.UserOnboardFileOutputDto[];
  showUserStatus?: boolean;
  uploadOnboardingDocument?: (onboardId, documentType, file) => Promise<void>;
  onCompanyDetailsSubmit?: (values: CompanyDetailsFormInputs) => Promise<void>;
  onLegalRepresentativeSubmit?: (values: LegalRepresentativesInputValues[]) => Promise<void>;
  onLegalRepresentativeRemove?: (values: LegalRepresentativesInputValues) => Promise<void>;
  onShareholderSubmit?: (values: ShareholdersInputValues[]) => Promise<void>;
  onShareholderRemove?: (values: ShareholdersInputValues) => Promise<void>;
}

export const IssuerProfile: FC<IssuerProfileProps> = (props: IssuerProfileProps) => {
  const { companyData, userData = {}, userOnboardFiles = [], onboardData } = props;
  return (
    <Box>
      <CompanyDetailsTabs
        onboard={onboardData}
        companyData={companyData}
        userData={userData}
        userOnboardFiles={userOnboardFiles}
      />
    </Box>
  );
};
