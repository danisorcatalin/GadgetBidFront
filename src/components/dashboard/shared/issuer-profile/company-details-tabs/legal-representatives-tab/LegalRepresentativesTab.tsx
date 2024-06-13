import {
  LegalRepresentativesDynamicForm,
  LegalRepresentativesInputValues,
} from './legal-representatives-dynamic-form';

import type { FC } from 'react';
import type { Company } from 'types/company';
import { useTranslation } from 'react-i18next';

export interface LegalRepresentativesTabProps {
  companyData: Partial<Company>;
  useAuthHook?: unknown;
  onLegalRepresentativeSubmit?: (values: LegalRepresentativesInputValues[]) => Promise<void>;
  onLegalRepresentativeRemove?: (values: LegalRepresentativesInputValues) => Promise<void>;
}

export const LegalRepresentativesTab: FC<LegalRepresentativesTabProps> = (
  props: LegalRepresentativesTabProps
): JSX.Element => {
  const { companyData, useAuthHook } = props;
  const { t } = useTranslation();

  return (
    <>
      {companyData.id ? (
        <LegalRepresentativesDynamicForm companyData={companyData} useAuthHook={useAuthHook} />
      ) : (
        <div>{t('legalRepresentatives.fillCompanyDetails')}</div>
      )}
    </>
  );
};
