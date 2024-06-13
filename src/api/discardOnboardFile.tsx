import { Components } from 'lib/GadgetClientJava';
import { GadgetClientJava } from '../lib/axios';

export const discardOnboardFile = async (
  onboardId: number,
  fileId: number
): Promise<unknown | Components.Schemas.ErrorDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerDeleteOnboardFile({
      id: onboardId,
      fileId: fileId,
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
