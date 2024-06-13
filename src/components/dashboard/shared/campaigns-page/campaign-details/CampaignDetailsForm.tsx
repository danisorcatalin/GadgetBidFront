import { Typography, Box } from '@mui/material';
import * as yup from '../../../../../utils/yup-validations';
import { Form, FormInputType, FormInput } from 'components/generic/Form';
import { CompanyDto } from 'types/company';
import { useCampaignDetailsContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { CampaignCategory, CampaignCurrency, NewCampaign } from 'types/campaign';
import { GTM_EVENTS } from '../../../../../constants';
import { InfoButton } from 'components/generic/InfoButton';
import { useModal } from 'mui-modal-provider';
import InfoModal from 'components/generic/InfoModal';
import { campaignDetailsCategories } from './campaign-categories';

export type CampaignDetailsFormInputs = {
  companyName: string;
  shortDescription: string;
  amountToRaise: number;
  maximumAmountToRaise: number;
  tokenValue: number;
  equity: string;
  valuation: number;
  maximumTicketsPerInvestor: number;
  submit: boolean;
  startDate?: string;
  endDate?: string;
  managerView?: boolean;
  category: CampaignCategory;
  currency: CampaignCurrency;
};

interface Props {
  campaignData: Partial<NewCampaign>;
  userCompany: CompanyDto;
  readonly?: boolean;
  managerView?: boolean;
}

const validCurrencies: CampaignCurrency[] = ['RON', 'EUR'];

export const CampaignDetailsForm: FC<Props> = (props: Props) => {
  const {
    campaignData = {} as NewCampaign,
    userCompany = {} as CompanyDto,
    readonly = false,
    managerView = false,
  } = props;
  const { onCampaignDetailsFormSubmit } = useCampaignDetailsContext();
  const { t } = useTranslation();
  const { showModal } = useModal();
  const handleInfoClick = () => {
    showModal(InfoModal, { text: t('campaign.form.ticketValueInfo') });
  };

  const inputs: FormInput[] = [
    {
      name: 'companyName',
      label: t('campaign.form.companyName'),
      validation: yup.companyName,
      type: FormInputType.TEXT_FIELD,
      disabled: true,
    },
    {
      name: 'category',
      label: t('campaign.form.companyCategory'),
      validation: yup.companyCategory,
      type: FormInputType.SELECT,
      selectValues: campaignDetailsCategories.map((category) => ({
        ...category,
        value: t(category.value),
      })),
    },
    {
      name: 'shortDescription',
      label: t('campaign.form.shortDescription'),
      validation: yup.campaignShortDescription,
      type: FormInputType.TEXT_AREA,
      disabled: readonly,
    },
    {
      name: 'amountToRaise',
      label: t('campaign.form.amountToRaise'),
      validation: yup.campaignMinAmount,
      type: FormInputType.TEXT_FIELD,
      disabled: readonly,
      gridItemProps: {
        xs: 6,
        md: 3,
      },
    },
    {
      name: 'maximumAmountToRaise',
      label: t('campaign.form.maximumAmountToRaise'),
      validation: yup.campaignMaxAmount,
      type: FormInputType.TEXT_FIELD,
      disabled: readonly,
      gridItemProps: {
        xs: 6,
        md: 3,
      },
    },
    {
      name: 'currency',
      label: t('campaign.form.campaignCurrency'),
      validation: yup.currency,
      type: FormInputType.SELECT,
      disabled: readonly,
      gridItemProps: {
        xs: 5,
        md: 3,
      },
      selectValues: [
        {
          key: 'RON',
          value: 'RON',
        },
        { key: 'EUR', value: 'EUR' },
      ],
    },
    {
      name: 'tokenValue',
      label: t('campaign.form.ticketValue'),
      validation: yup.campaignTicketValue,
      type: FormInputType.TEXT_FIELD,
      disabled: readonly,
      gridItemProps: {
        xs: 5,
        md: 3,
      },
    },
    {
      name: '',
      label: '',
      validation: '',
      type: FormInputType.NON_FORM,
      gridItemProps: {
        xs: 2,
        md: 1,
      },
      extraElement: (
        <InfoButton
          stylingProps={{ mt: 3.9, width: '32px', height: '32px' }}
          handleClick={handleInfoClick}
        />
      ),
    },
    {
      name: 'maximumTicketsPerInvestor',
      label: t('campaign.form.maximumTicketsPerInvestor'),
      validation: yup.maximumTicketsPerInvestor,
      type: FormInputType.TEXT_FIELD,
      disabled: readonly,
      gridItemProps: {
        xs: 12,
        md: 5,
      },
    },
    {
      name: 'equity',
      label: t('campaign.form.equity'),
      validation: yup.equity,
      type: FormInputType.TEXT_FIELD,
      disabled: readonly,
    },
    {
      name: 'valuation',
      label: t('campaign.form.valuation'),
      validation: yup.valuation,
      type: FormInputType.TEXT_FIELD,
      disabled: readonly,
    },
  ];

  const dateInputs: FormInput[] = [
    {
      name: 'startDate',
      label: t('campaign.form.started'),
      validation: null,
      type: FormInputType.DATE_PICKER,
      disabled: readonly,
    },
    {
      name: 'endDate',
      label: t('campaign.form.endDate'),
      validation: null,
      type: FormInputType.DATE_PICKER,
      disabled: readonly,
    },
  ];

  const initialValues: CampaignDetailsFormInputs = {
    companyName: (userCompany.name || campaignData.companyName) ?? '',
    shortDescription: campaignData.shortDescription ?? '',
    amountToRaise: campaignData.amountToRaise ?? 0,
    maximumAmountToRaise: campaignData.maximumAmountToRaise ?? 0,
    tokenValue: campaignData.tokenValue ?? 0,
    equity: campaignData.equity ?? '',
    valuation: campaignData.valuation ?? 0,
    category: campaignData.category ?? undefined,
    maximumTicketsPerInvestor: campaignData.maximumTicketsPerInvestor ?? 0,
    currency: validCurrencies.includes(campaignData.currency) ? campaignData.currency : 'EUR',
    submit: false,
  };

  const initialValuesWithDates: CampaignDetailsFormInputs = {
    ...initialValues,
    startDate: campaignData.startDate ?? null,
    endDate: campaignData.endDate ?? null,
  };

  return (
    <>
      <Typography sx={{ color: '#A2AAAD' }} variant="h3">
        {`${campaignData.companyName?.toUpperCase() || t('campaign.yourCampaignDetails')}`}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderRadius: '9px',
          mt: 2,
          border: '0.7px solid #E3E5E6',
          p: 2,
        }}
      >
        <Typography sx={{ color: '#A2AAAD', mb: 4 }} variant="h1">
          1
        </Typography>
        <Form<CampaignDetailsFormInputs>
          inputs={managerView ? [...inputs, ...dateInputs] : inputs}
          initialValues={managerView ? initialValuesWithDates : initialValues}
          showSubmitBtn={true}
          readonly={readonly}
          submitBtnText={campaignData.id ? t('general.update') : t('general.save')}
          onSubmit={onCampaignDetailsFormSubmit()}
          submitEventName={
            campaignData.id
              ? GTM_EVENTS.CAMPAIGN_DETAILS_UPDATE_CLICK
              : GTM_EVENTS.CAMPAIGN_DETAILS_SAVE_CLICK
          }
        />
      </Box>
    </>
  );
};
