import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';
import { apiUrlJava } from '../utils/getApiUrlByEnv';

export const uploadOnboardDocument = async (
  onboardId: number,
  documentType: Components.Schemas.UserOnboardFileType,
  file: File
): Promise<Components.Schemas.UserOnboardFileOutputDto[]> => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file, file.name);
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerAddUserOnboardDocument(
      { id: onboardId, documentType },
      bodyFormData,
      { baseURL: apiUrlJava, headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data as Components.Schemas.UserOnboardFileOutputDto[];
  } catch (err) {
    throw new Error(err);
  }
};
