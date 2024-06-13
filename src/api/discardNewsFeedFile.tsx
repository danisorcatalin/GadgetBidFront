import { Components } from 'lib/GadgetClientJava';
import { GadgetClientJava } from '../lib/axios';

export const discardNewsFeedFile = async (
  fileId: number
): Promise<Components.Schemas.NewsFeedFileDto | Components.Schemas.ErrorDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.newsFeedControllerDeleteNewsFeedFile({ fileId });

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
