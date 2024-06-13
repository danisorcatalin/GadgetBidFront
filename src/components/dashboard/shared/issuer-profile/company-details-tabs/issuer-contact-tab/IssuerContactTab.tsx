import { FC } from 'react';
import { IssuerOnboardingDocumentsTable } from './issuer-onboarding-documents-table/IssuerOnboardingDocumentsTable';

import type { UserOnboardOutputDto, UserOutputSingleDto } from 'types/user';
import { IssuerContactDetailsForm } from './issuer-contact-details-form/IssuerContactDetailsForm';
import { Spacer } from 'components/Spacer';
import { CompanyLegalFormType } from 'types/company';
import { Components } from 'lib/GadgetClientJava';

export type CompanyDetailsFormInputs = {
  name: string;
  cui: string;
  fui: string;
  website: string;
  euid: string;
  bankName: string;
  iban: string;
  address: string;
  city: string;
  country: string;
  legalForm: CompanyLegalFormType;
  submit: boolean;
};

export interface IssuerOnboardingTabProps {
  userData: Partial<UserOutputSingleDto>;
  onboard: UserOnboardOutputDto;
  userOnboardFiles: Components.Schemas.UserOnboardFileOutputDto[];
  uploadOnboardingDocument?: (onboardId, documentType, file) => Promise<void>;
  useAuthHook?: unknown;
}

export const IssuerContactTab: FC<IssuerOnboardingTabProps> = (
  props: IssuerOnboardingTabProps
): JSX.Element => {
  const { userData = {}, useAuthHook, userOnboardFiles = [], onboard: onboardData } = props;

  return (
    <>
      <IssuerContactDetailsForm userData={userData} />
      <Spacer marginTop="32px" marginBottom="32px" />
      <IssuerOnboardingDocumentsTable
        // eslint-disable-next-line
        onboardData={{ ...onboardData, files: userOnboardFiles as any }}
        useAuthHook={useAuthHook}
      />
    </>
  );
};
