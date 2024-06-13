import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { UserOutputSingleDto } from 'types/user';

export const getUserById = async (key: string, id: number): Promise<UserOutputSingleDto> => {
  try {
    if (!id) return {} as UserOutputSingleDto;
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerGetUser(id);
    return response.data as UserOutputSingleDto;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetUserById(id: number): SWRHook<UserOutputSingleDto> {
  const { data, error, mutate } = useSWR([SwrKeys.useGetUserById, id], getUserById);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
