import { GadgetClientJava } from '../lib/axios';
import { CampaignMember } from 'types/campaign';

export const deleteCampaignMember = async (
  campaignId: number,
  memberId: number
): Promise<CampaignMember> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerDeleteCampaignMember({
      id: campaignId,
      memberId,
    });
    const member = response.data as CampaignMember;
    return member;
  } catch (err) {
    throw new Error(err);
  }
};
