import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { SimpleCampaignDto } from 'types/campaign';

export const getUserCampaignsByUserId = async (
  _key: string,
  id: number
): Promise<SimpleCampaignDto[]> => {
  try {
    if (!id) return [] as SimpleCampaignDto[];
    const client = await GadgetClientJava.getClient();
    const response = await client.getSimpleCampaignsByUser(id);
    const campaign = response.data;
    return campaign;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetUserCampaignsByUserId(id: number): SWRHook<SimpleCampaignDto[]> {
  const { data, error, mutate } = useSWR(
    [SwrKeys.getUserCampaignsByUserId, id],
    getUserCampaignsByUserId
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
