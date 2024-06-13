import { GadgetClientJava } from 'lib/axios';
import { Components } from 'lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';

export const getUsers = async (): Promise<Components.Schemas.UserOutputDto[]> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerUserList();
    const user = response.data as Components.Schemas.UserOutputDto[];
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetUsers(): SWRHook<Components.Schemas.UserOutputDto[]> {
  const { data, error, mutate } = useSWR(SwrKeys.getUsers, getUsers);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
