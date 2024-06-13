import useSWR from 'swr';
import { Components } from '../../lib/GadgetClientJava';
import { GadgetClientJava } from '../../lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from '../../swrKeys';

export const getNewsFeedList = async (): Promise<Components.Schemas.NewNewsFeedDto[]> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.newsFeedControllerGetNewsFeedList();
    const newsFeed = response.data as Components.Schemas.NewNewsFeedDto[];

    return newsFeed;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetNewsFeedList(): SWRHook<Components.Schemas.NewNewsFeedDto[]> {
  const { data, error, mutate } = useSWR(SwrKeys.getNewsFeedList, getNewsFeedList);

  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
