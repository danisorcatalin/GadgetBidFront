import { Form, FormInputType } from 'components/generic/Form';
import type { FormInput } from 'components/generic/Form';

import { FC } from 'react';
import { Investment } from 'types/investment';
import { useAuth } from 'hooks';
import { updateUserById } from 'api';
import { useTranslation } from 'react-i18next';

export type InvestmentDetailsFormInputs = {
  tokenValue: string | number;
  tokenAmount: string | number;
  status: string;
  createdAt: string;
  projectTitle: string;
  submit: boolean;
};

export interface InvestmentDetailsFormProps {
  investmentData: Partial<Investment>;
  useAuthHook;
}

export const InvestmentDetailsForm: FC<InvestmentDetailsFormProps> = (
  props: InvestmentDetailsFormProps
) => {
  const { investmentData = {} as Investment, useAuthHook = useAuth } = props;

  investmentData.createdAt = new Date(investmentData.createdAt).toLocaleString();

  const {
    user: { id: userId },
  } = useAuthHook();

  const { t } = useTranslation();
  const inputs: FormInput[] = [
    {
      name: 'tokenValue',
      label: t('inputs.tokenValue'),
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'tokenAmount',
      label: t('inputs.tokenAmount'),
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'status',
      label: t('inputs.status'),
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'createdAt',
      label: t('inputs.createdAt'),
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'projectTitle',
      label: t('inputs.projectTitle'),
      type: FormInputType.TEXT_FIELD,
    },
  ];

  const initialValues: InvestmentDetailsFormInputs = {
    tokenValue: investmentData?.campaign?.tokenValue ?? '',
    tokenAmount: investmentData?.tokenAmount ?? '',
    status: investmentData?.status ?? '',
    createdAt: investmentData?.createdAt ?? '',
    projectTitle: investmentData?.campaign?.company?.name ?? '',
    submit: false,
  };

  const handleSubmit = async (values: InvestmentDetailsFormInputs | unknown): Promise<void> => {
    // This component does not seem to be used at all in the main project, only on Storybook
    // The values that were sent to updateUserById made no sense on this endpoint and i commented it for now to avoid typing issues.

    // await updateUserById(userId, values);
  };

  return (
    <Form<InvestmentDetailsFormInputs>
      inputs={inputs}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      readonly
      showSubmitBtn={false}
    />
  );
};
