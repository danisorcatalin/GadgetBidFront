import { NewsFeedFileType } from 'types/newsFeed';
import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const uploadNewsFeedFile = async (
  newsFeedId: number,
  documentType: NewsFeedFileType,
  file: File
): Promise<Components.Schemas.NewsFeedFileDto> => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file, file.name);
    const client = await GadgetClientJava.getClient();
    const response = await client.newsFeedControllerAddNewsFeedFile(
      { id: newsFeedId, type: documentType },
      bodyFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    const fileRes = response.data as unknown;

    return fileRes as Components.Schemas.NewsFeedFileDto;
  } catch (err) {
    throw new Error(err);
  }
};
