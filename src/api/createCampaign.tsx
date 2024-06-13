import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const createCampaign = async (
  payload: Components.Schemas.CampaignInputDto
): Promise<Components.Schemas.CampaignDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerCreateCampaign(undefined, {
      ...payload,
    });
    const campaign = response.data as Components.Schemas.CampaignDto;
    return campaign;
  } catch (err) {
    throw new Error(err);
  }
};
