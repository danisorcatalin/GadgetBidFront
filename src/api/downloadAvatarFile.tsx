import { GadgetClientJava } from '../lib/axios';

export const downloadAvatarFile = async (memberId: number): Promise<unknown> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerDownloadCampaignMemberAvatar(
      { memberId },
      null,
      {
        responseType: 'arraybuffer',
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
