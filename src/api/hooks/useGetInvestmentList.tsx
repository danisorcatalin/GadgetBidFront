import useSWR from 'swr';
import { GadgetClientJava } from '../../lib/axios';
import { Components } from '../../lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';

export const getInvestmentsList = async (): Promise<Components.Schemas.InvestmentDto[]> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.investmentControllerGetInvestments();
    const investments = response.data as Components.Schemas.InvestmentDto[];
    return investments;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetInvestmentsList(): SWRHook<Components.Schemas.InvestmentDto[]> {
  const { data, error, mutate } = useSWR(SwrKeys.getInvestmentsList, getInvestmentsList);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
