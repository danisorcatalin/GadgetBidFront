import useSWR from 'swr';
// import { GadgetClientJava } from '../../lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';

export const generate2fa = async (): Promise<string> => {
  try {
    // const client = await GadgetClientJava.getClient();
    // TODO JAVA MIGRATION: 2FA DOES NOT WORK, backend returns empty response
    // We will keep it commented for the time being and return a mock value
    // This will be fixed as soon as it becomes a bussiness priority
    // const response = await client.twoFactorAuthenticationControllerTwoFactorAuthenticateGenerate(
    //   null,
    //   null,
    //   { responseType: 'arraybuffer' }
    // );

    // const qrCode = response.data;
    // return qrCode;
    return 'MOCK VALUE';
  } catch (err) {
    throw new Error(err);
  }
};

export function useGenerate2fa(): SWRHook<string> {
  const { data, error, mutate } = useSWR(SwrKeys.generate2fa, generate2fa);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
