import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { NewInvestmentDto } from 'types/investment';

export const getCampaignInvestmentsByCampaignId = async (
  _key: string,
  id: number
): Promise<NewInvestmentDto[]> => {
  try {
    if (!id) return [] as NewInvestmentDto[];
    const client = await GadgetClientJava.getClient();
    const response = await client.investmentControllerGetAllInvestmentsFromCampaign(id);
    const investments = response.data as NewInvestmentDto[];
    return investments;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetCampaignInvestmentsByCampaignId(id: number): SWRHook<NewInvestmentDto[]> {
  const { data, error, mutate } = useSWR(
    [SwrKeys.getCampaignInvestmentsByCampaignId, id],
    getCampaignInvestmentsByCampaignId
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
