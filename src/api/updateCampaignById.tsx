import { CampaignUpdateDto, NewCampaign } from 'types/campaign';
import { GadgetClientJava } from '../lib/axios';

export const updateCampaignById = async (
  campaignId: number,
  payload: CampaignUpdateDto
): Promise<NewCampaign> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerUpdateCampaign(campaignId, {
      ...payload,
    });
    const campaign = response.data;
    return campaign;
  } catch (err) {
    throw new Error(err);
  }
};
