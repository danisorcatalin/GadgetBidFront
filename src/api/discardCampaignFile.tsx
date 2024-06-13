import { Components } from 'lib/GadgetClientJava';
import { GadgetClientJava } from '../lib/axios';

export const discardCampaignFile = async (
  campaignId: number,
  fileId: number
): Promise<Components.Schemas.CampaignDto | Components.Schemas.ErrorDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerDeleteCampaignFile({
      id: campaignId,
      fileId: fileId,
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
