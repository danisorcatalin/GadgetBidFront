import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const uploadCampaignFile = async (
  campaignId: number,
  documentType: Components.Schemas.CampaignFileType,
  file: File
): Promise<Components.Schemas.CampaignFileDto> => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file, file.name);
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerUploadCampaignFile(
      { id: campaignId, documentType },
      bodyFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    const fileRes = response.data as Components.Schemas.CampaignFileDto;
    return fileRes;
  } catch (err) {
    throw new Error(err);
  }
};
