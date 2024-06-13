import { ShareholdersDynamicForm } from './shareholders-dynamic-form';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { Company } from 'types/company';
import { ShareholdersInputValues } from './shareholders-dynamic-form/ShareholdersDynamicForm';
export interface ShareholdersTabProps {
  companyData: Partial<Company>;
  useAuthHook?: unknown;
  onShareholderSubmit?: (values: ShareholdersInputValues[]) => Promise<void>;
  onShareholderRemove?: (values: ShareholdersInputValues) => Promise<void>;
}

export const ShareholdersTab: FC<ShareholdersTabProps> = (
  props: ShareholdersTabProps
): JSX.Element => {
  const { companyData, useAuthHook } = props;
  const { t } = useTranslation();

  return (
    <>
      {companyData.id ? (
        <ShareholdersDynamicForm companyData={companyData} useAuthHook={useAuthHook} />
      ) : (
        <div>{t('legalRepresentatives.fillCompanyDetails')}</div>
      )}
    </>
  );
};
