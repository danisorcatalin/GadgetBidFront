import useSWR from 'swr';
import { GadgetClientJava } from '../../lib/axios';
import { Components } from '../../lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';

export const getUserOnboardList = async (): Promise<Components.Schemas.UserOnboardOutputDto[]> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerGetUserOnboardList();
    const users = response.data as Components.Schemas.UserOnboardOutputDto[];
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetUserOnboardList(): SWRHook<Components.Schemas.UserOnboardOutputDto[]> {
  const { data, error, mutate } = useSWR(SwrKeys.getUserOnboardList, getUserOnboardList);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
