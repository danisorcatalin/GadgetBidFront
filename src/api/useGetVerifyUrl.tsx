import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const useGetVerifyUrl = async (): Promise<Components.Schemas.KycVerifyResponse> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerStartKyc();
    return response.data as Components.Schemas.KycVerifyResponse;
  } catch (err) {
    throw new Error(err);
  }
};
