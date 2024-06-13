import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { SimpleInvestmentDto } from 'types/investment';

export const getUserInvestmentsByUserId = async (
  _key: string,
  id: number
): Promise<SimpleInvestmentDto[]> => {
  try {
    if (!id) return [] as SimpleInvestmentDto[];
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerGetUserInvestmentsByUserId(id);
    const investments = response.data;
    return investments;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetUserInvestmentsByUserId(id: number): SWRHook<SimpleInvestmentDto[]> {
  const { data, error, mutate } = useSWR(
    [SwrKeys.getUserInvestmentsByUserId, id],
    getUserInvestmentsByUserId
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
