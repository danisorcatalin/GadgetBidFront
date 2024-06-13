import { GadgetClientJava } from 'lib/axios';
import { Components } from '../../lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';

export const getCampaignMembersById = async (
  _key: string,
  id: number
): Promise<Components.Schemas.CampaignMemberDto[]> => {
  try {
    if (!id) return [] as Components.Schemas.CampaignMemberDto[];
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerGetCampaignMembers(id);
    const campaignMembers = response.data as Components.Schemas.CampaignMemberDto[];
    return campaignMembers;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetCampaignMembersById(
  id: number
): SWRHook<Components.Schemas.CampaignMemberDto[]> {
  const { data, error, mutate } = useSWR(
    [SwrKeys.getCampaignMembersById, id],
    getCampaignMembersById
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
