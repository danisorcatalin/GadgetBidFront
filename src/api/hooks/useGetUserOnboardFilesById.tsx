import useSWR from 'swr';
import { GadgetClientJava } from '../../lib/axios';
import { Components } from '../../lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from '../../swrKeys';

// NOTE: Tested and working
export const getUserOnboardFilesById = async (
  key: string,
  id: number
): Promise<Components.Schemas.UserOnboardFileOutputDto[]> => {
  try {
    if (!id) return [] as Components.Schemas.UserOnboardFileOutputDto[];
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerGetUserOnboardFiles(id);
    const userFiles = response.data as unknown;
    return userFiles as Components.Schemas.UserOnboardFileOutputDto[];
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetUserOnboardFilesById(
  id: number
): SWRHook<Components.Schemas.UserOnboardFileOutputDto[]> {
  const { data, error, mutate } = useSWR(
    [SwrKeys.useGetUserOnboardFilesById, id],
    getUserOnboardFilesById
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
