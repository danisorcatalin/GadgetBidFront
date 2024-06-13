import { GadgetClientJava } from '../lib/axios';

import { CampaignMember } from 'types/campaign';
import { apiUrlJava } from '../utils/getApiUrlByEnv';
import { CampaignTeamInputValues } from 'components/dashboard/shared/campaigns-page/campaign-details/campaign-details-tabs/teams-tab/campaign-team-form';

export const updateCampaignMember = async (
  campaignId: number,
  memberId: number,
  payload: CampaignTeamInputValues
): Promise<CampaignMember> => {
  try {
    const bodyFormData = new FormData();
    Object.keys(payload).forEach((key) => {
      bodyFormData.append(key, payload[key]);
    });
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerUpdateCampaignMember(
      { id: campaignId, memberId },
      bodyFormData,
      { baseURL: apiUrlJava, headers: { 'Content-Type': 'multipart/form-data' } }
    );
    const member = response.data as CampaignMember;
    return member;
  } catch (err) {
    throw new Error(err);
  }
};
