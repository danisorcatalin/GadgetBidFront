import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { Components } from 'lib/GadgetClientJava';

export const getUserKycFiles = async (
  _key: string,
  id: number
): Promise<Components.Schemas.UserKycFileDto[]> => {
  try {
    if (!id) return [] as Components.Schemas.UserKycFileDto[];
    const client = await GadgetClientJava.getClient();
    const response = await client.getUserKycFiles(id);
    const userKyc = response.data;
    return userKyc;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetUserKycFiles(id: number): SWRHook<Components.Schemas.UserKycFileDto[]> {
  const { data, error, mutate } = useSWR([SwrKeys.getUserKycFiles, id], getUserKycFiles);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
