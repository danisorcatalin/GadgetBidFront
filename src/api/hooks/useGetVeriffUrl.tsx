import { GadgetClientJava } from 'lib/axios';
import { Components } from 'lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';

export const getVeriffUrl = async (): Promise<Components.Schemas.KycVerifyResponse> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerStartKyc();
    const veriff = response.data as Components.Schemas.KycVerifyResponse;
    return veriff;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetVeriffUrl(): SWRHook<Components.Schemas.KycVerifyResponse> {
  const { data, error, mutate } = useSWR(SwrKeys.getVeriffUrl, getVeriffUrl);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
