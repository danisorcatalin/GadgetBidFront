import { GadgetClientJava } from '../lib/axios';

export const downloadKYCFile = async (id: number, fileId: number): Promise<unknown> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerGetKycFile({ id, fileId }, null, {
      responseType: 'arraybuffer',
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
