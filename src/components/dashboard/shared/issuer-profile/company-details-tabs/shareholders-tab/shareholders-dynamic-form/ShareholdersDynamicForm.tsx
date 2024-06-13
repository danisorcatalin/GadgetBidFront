import * as yup from 'utils/yup-validations';
import {
  DynamicForm,
  DynamicFormInputType,
  DynamicFormInput,
} from 'components/generic/Form/DynamicForm';

import type { FC } from 'react';
import { Company, CompanyMemberType } from 'types/company';
import { useIssuerProfileContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';
import { GTM_EVENTS } from '../../../../../../../constants';

export type ShareholdersInputValues = {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  equity: string;
};

export interface ShareholdersDynamicFormProps {
  companyData: Partial<Company>;
  useAuthHook?: unknown;
  onSubmit?: (values: ShareholdersInputValues[]) => Promise<void>;
  onRemove?: (values: ShareholdersInputValues) => Promise<void>;
}

export const ShareholdersDynamicForm: FC<ShareholdersDynamicFormProps> = (
  props: ShareholdersDynamicFormProps
) => {
  const { companyData = {} } = props;
  const { companyMembers = [] } = companyData;
  const { onShareholderSubmit, onShareholderRemove } = useIssuerProfileContext();
  const shareholders = companyMembers.filter(
    (member) => member.role === CompanyMemberType.SHAREHOLDER
  );
  const { t } = useTranslation();

  const inputs: DynamicFormInput[] = [
    {
      name: 'firstName',
      label: t('legalRepresentatives.form.firstName'),
      validation: yup.firstName,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'lastName',
      label: t('legalRepresentatives.form.lastName'),
      validation: yup.lastName,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'address',
      label: t('legalRepresentatives.form.address'),
      validation: yup.address,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'city',
      label: t('legalRepresentatives.form.city'),
      validation: yup.city,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'country',
      label: t('legalRepresentatives.form.country'),
      validation: yup.country,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'equity',
      label: t('legalRepresentatives.form.equity'),
      validation: yup.equity,
      type: DynamicFormInputType.TEXT_FIELD,
    },
  ];

  const newInputValues = {
    id: undefined,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    equity: '',
  };

  const initialValues = {
    dynamicInputs: shareholders.length
      ? shareholders.map((member) => ({
          id: member?.id,
          firstName: member?.firstName ?? '',
          lastName: member?.lastName ?? '',
          address: member?.address ?? '',
          city: member?.city ?? '',
          country: member?.country ?? '',
          equity: member?.equity ?? '',
        }))
      : [newInputValues],
    submit: false,
  };

  return (
    <DynamicForm<ShareholdersInputValues>
      inputs={inputs}
      initialValues={initialValues}
      newInputValues={newInputValues}
      onSubmit={onShareholderSubmit()}
      onRemove={onShareholderRemove()}
      enableReinitialize
      submitBtnText={shareholders.length ? t('general.update') : t('general.save')}
      showAddMoreBtn={!!shareholders.length}
      showRemoveBtn={!!shareholders.length}
      submitEventName={
        shareholders.length
          ? GTM_EVENTS.ISSUER_UPDATE_SHAREHOLDERS_CLICK
          : GTM_EVENTS.ISSUER_SAVE_SHAREHOLDERS_CLICK
      }
    />
  );
};
