import { CompanyDocumentsTable } from './company-documents-table';
import { CompanyDetailsForm } from './company-details-form';
import { Spacer } from 'components/Spacer';

import type { FC } from 'react';
import type { Company, CompanyDetailsFormInputs } from 'types/company';
export interface CompanyTabProps {
  companyData: Partial<Company>;
  onCompanyDetailsSubmit?: (values: CompanyDetailsFormInputs) => Promise<void>;
  useAuthHook?: unknown;
}

export const CompanyTab: FC<CompanyTabProps> = (props: CompanyTabProps): JSX.Element => {
  const { companyData, useAuthHook } = props;

  return (
    <>
      <CompanyDetailsForm companyData={companyData} useAuthHook={useAuthHook} />
      <Spacer marginTop="32px" marginBottom="32px" />
      <CompanyDocumentsTable companyData={companyData} useAuthHook={useAuthHook} />
    </>
  );
};
