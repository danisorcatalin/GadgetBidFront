import { IssuerContactDetailsFormInputs } from 'components/dashboard/shared/issuer-profile/company-details-tabs/issuer-contact-tab/issuer-contact-details-form/IssuerContactDetailsForm';
import { LegalRepresentativesInputValues } from 'components/dashboard/shared/issuer-profile/company-details-tabs/legal-representatives-tab/legal-representatives-dynamic-form';
import { ShareholdersInputValues } from 'components/dashboard/shared/issuer-profile/company-details-tabs/shareholders-tab/shareholders-dynamic-form/ShareholdersDynamicForm';
import { useContext, createContext } from 'react';
import { CompanyDetailsFormInputs } from 'types/company';
import { CompanyFileType, DiscardDocument, UploadDocument } from 'types/document';
import { IssuerOnboardFileType } from 'types/user';

export interface IIssuerProfileContext {
  onIssuerDetailsSubmit?: () => (values: IssuerContactDetailsFormInputs) => Promise<void>;
  uploadOnboardingDocument?: () => (onboardId, documentType, file) => Promise<void>;
  discardOnboardingDocument?: () => DiscardDocument<IssuerOnboardFileType>;
  uploadCompanyDocument?: () => UploadDocument<CompanyFileType>;
  discardCompanyDocument?: () => DiscardDocument<CompanyFileType>;
  onCompanyDetailsSubmit?: () => (values: CompanyDetailsFormInputs) => Promise<void>;
  onLegalRepresentativeSubmit?: () => (values: LegalRepresentativesInputValues[]) => Promise<void>;
  onLegalRepresentativeRemove?: () => (values: LegalRepresentativesInputValues) => Promise<void>;
  onShareholderSubmit?: () => (values: ShareholdersInputValues[]) => Promise<void>;
  onShareholderRemove?: () => (values: ShareholdersInputValues) => Promise<void>;
}
const initial = {} as IIssuerProfileContext;
export const IssuerProfileContext = createContext<IIssuerProfileContext>(initial);
export const useIssuerProfileContext = (): IIssuerProfileContext =>
  useContext<IIssuerProfileContext>(IssuerProfileContext);
