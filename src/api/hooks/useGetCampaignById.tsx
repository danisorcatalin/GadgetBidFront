import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { NewCampaign } from 'types/campaign';

export const getCampaignById = async (_key: string, id: number): Promise<NewCampaign> => {
  try {
    if (!id) return {} as NewCampaign;
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerGetCampaign(id);
    const campaign = response.data as NewCampaign;
    return campaign;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetCampaignById(id: number): SWRHook<NewCampaign> {
  const { data, error, mutate } = useSWR([SwrKeys.getCampaignById, id], getCampaignById);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
