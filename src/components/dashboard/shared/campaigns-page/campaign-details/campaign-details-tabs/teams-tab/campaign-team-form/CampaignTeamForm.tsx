import { DynamicForm, DynamicFormInput, DynamicFormInputType } from 'components/generic/Form';
import * as yup from 'utils/yup-validations';

import type { FC } from 'react';

import { useCampaignDetailsContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';
import { GTM_EVENTS } from '../../../../../../../../constants';
import type { Components as JavaComponents } from 'lib/GadgetClientJava';

export interface CampaignTeamFormProps {
  campaignMembers: JavaComponents.Schemas.CampaignMemberDto[];
  readonly?: boolean;
}

export interface CampaignTeamInputValues {
  id?: number;
  fullName: string;
  role: string;
  description: string;
  linkedinProfile: string;
  file?: string | unknown;
}

export const CampaignTeamForm: FC<CampaignTeamFormProps> = (
  props: CampaignTeamFormProps
): JSX.Element => {
  const { campaignMembers = [], readonly = false } = props;
  const { onCampaignMemberSubmit, onCampaignMemberRemove } = useCampaignDetailsContext();
  const { t } = useTranslation();

  const inputs: DynamicFormInput[] = [
    {
      name: 'fullName',
      label: t('campaign.teamForm.fullName'),
      validation: yup.fullName,
      type: DynamicFormInputType.TEXT_FIELD,
      disabled: readonly,
    },
    {
      name: 'role',
      label: t('campaign.teamForm.role'),
      validation: yup.role,
      type: DynamicFormInputType.TEXT_FIELD,
      disabled: readonly,
    },
    {
      name: 'description',
      label: t('campaign.teamForm.description'),
      validation: yup.description,
      type: DynamicFormInputType.TEXT_AREA,
      disabled: readonly,
    },
    {
      name: 'linkedinProfile',
      label: t('campaign.teamForm.linkedinProfile'),
      validation: yup.linkedinProfile,
      type: DynamicFormInputType.TEXT_FIELD,
      disabled: readonly,
    },
    {
      name: 'file',
      label: t('campaign.teamForm.teamMemberPhoto'),
      validation: yup.teamMemberPhoto,
      type: DynamicFormInputType.FILE,
      disabled: readonly,
      gridItemProps: {
        xs: 12,
        md: 12,
      },
    },
  ];

  const newInputValues = {
    id: undefined,
    fullName: '',
    role: '',
    description: '',
    linkedinProfile: '',
  };

  const initialValues = {
    dynamicInputs: campaignMembers.length
      ? campaignMembers.map((member) => ({
          id: member?.id,
          fullName: member?.fullName ?? '',
          role: member?.role ?? '',
          description: member?.description ?? '',
          linkedinProfile: member.linkedinProfile ?? '',
          file: member?.avatar ?? '',
        }))
      : [newInputValues],
    submit: false,
  };

  return (
    <DynamicForm<CampaignTeamInputValues>
      inputs={inputs}
      initialValues={initialValues}
      onSubmit={onCampaignMemberSubmit()}
      onRemove={onCampaignMemberRemove()}
      newInputValues={newInputValues}
      submitBtnText={campaignMembers.length ? t('general.update') : t('general.save')}
      enableReinitialize
      readonly={readonly}
      showAddMoreBtn={!!campaignMembers.length}
      showRemoveBtn={!!campaignMembers.length}
      removeBtnText={t('campaign.teamForm.removeButtonText')}
      submitEventName={
        campaignMembers.length
          ? GTM_EVENTS.CAMPAIGN_TEAM_UPDATE_CLICK
          : GTM_EVENTS.CAMPAIGN_TEAM_SAVE_CLICK
      }
    />
  );
};
