import { GadgetClientJava } from 'lib/axios';
import { Components } from 'lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';

export const getNewsFeedById = async (id: number): Promise<Components.Schemas.NewNewsFeedDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.newsFeedControllerGetNewsFeedById({ id });

    return response.data as Components.Schemas.NewNewsFeedDto;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetNewsFeedById(id: number): SWRHook<Components.Schemas.NewNewsFeedDto> {
  const { data, error, mutate } = useSWR([SwrKeys.useGetNewsFeedById, id], getNewsFeedById);

  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
