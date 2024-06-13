import { CampaignTeamForm } from './campaign-team-form';

import type { FC } from 'react';
import type { Components as JavaComponents } from 'lib/GadgetClientJava';
export interface CampaignTeamTabProps {
  readonly: boolean;
  campaignMembers: JavaComponents.Schemas.CampaignMemberDto[];
}

export const CampaignTeamTab: FC<CampaignTeamTabProps> = (
  props: CampaignTeamTabProps
): JSX.Element => {
  const { campaignMembers, readonly } = props;
  return <CampaignTeamForm readonly={readonly} campaignMembers={campaignMembers} />;
};
