import { GadgetClientJava } from 'lib/axios';
import { Components } from '../../lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';

export const getCampaignFilesById = async (
  _key: string,
  id: number
): Promise<Components.Schemas.CampaignFileDto[]> => {
  try {
    if (!id) return [] as Components.Schemas.CampaignFileDto[];
    const client = await GadgetClientJava.getClient();
    const response = await client.campaignControllerGetCampaignFiles(id);
    const projectFiles = response.data as Components.Schemas.CampaignFileDto[];
    return projectFiles;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetCampaignFilesById(id: number): SWRHook<Components.Schemas.CampaignFileDto[]> {
  const { data, error, mutate } = useSWR([SwrKeys.getCampaignFilesById, id], getCampaignFilesById);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
