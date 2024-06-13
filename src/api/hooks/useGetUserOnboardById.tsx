import useSWR from 'swr';
import { GadgetClientJava } from '../../lib/axios';
import { Components } from '../../lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from '../../swrKeys';

export const getUserOnboardById = async (
  _key: string,
  id: number
): Promise<Components.Schemas.UserOnboardOutputDto> => {
  try {
    if (!id) {
      return {};
    }
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerGetUserOnboard(id);
    const userOnboard = response.data;
    return userOnboard;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetUserOnboardById(
  id: number
): SWRHook<Components.Schemas.UserOnboardOutputDto> {
  const { data, error, mutate } = useSWR([SwrKeys.getUserOnboardById, id], getUserOnboardById);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
