import { GadgetClientJava } from '../lib/axios';

export const downloadCampaignFile = async (id: number, fileId: number): Promise<unknown> => {
  try {
    const client = GadgetClientJava.getClient();
    const response = await client.campaignControllerDownloadCampaignFile({ id, fileId }, null, {
      responseType: 'arraybuffer',
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
