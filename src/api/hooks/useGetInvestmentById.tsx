import { GadgetClientJava } from 'lib/axios';
import { Components } from 'lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';

export const getInvestmentById = async (
  key: string,
  id: number
): Promise<Components.Schemas.InvestmentDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.investmentControllerGetInvestment({ id });
    return response.data as Components.Schemas.InvestmentDto;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetInvestmentById(id: number): SWRHook<Components.Schemas.InvestmentDto> {
  const { data, error, mutate } = useSWR([SwrKeys.useGetInvestmentById, id], getInvestmentById);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
