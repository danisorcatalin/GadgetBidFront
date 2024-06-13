import useSWR from 'swr';
import { GadgetClientJava } from '../../lib/axios';
import { Components } from '../../lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';

export const getUserCampaignsList = async (): Promise<Components.Schemas.NewCampaignDto[]> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerGetCampaignList();
    const campaigns = response.data as Components.Schemas.NewCampaignDto[];
    return campaigns;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetCampaignsList(): SWRHook<Components.Schemas.NewCampaignDto[]> {
  const { data, error, mutate } = useSWR(SwrKeys.getUserCampaignsList, getUserCampaignsList);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
