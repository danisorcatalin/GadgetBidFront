import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { Components } from 'lib/GadgetClientJava';

export const getLastUserKyc = async (
  key: string,
  id: number
): Promise<Components.Schemas.UserKycDto> => {
  try {
    if (!id) return {} as Components.Schemas.UserKycDto;
    const client = await GadgetClientJava.getClient();
    const response = await client.getLastUserKyc(id);
    const userKyc = response.data;
    return userKyc;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetLastUserKyc(id: number): SWRHook<Components.Schemas.UserKycDto> {
  const { data, error, mutate } = useSWR([SwrKeys.getLastUserKyc, id], getLastUserKyc);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
