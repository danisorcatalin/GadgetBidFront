import { GadgetClientJava } from 'lib/axios';
import { Components } from 'lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';

export const getInvestorList = async (): Promise<Components.Schemas.InvestorDto[]> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerUserInvestorList();
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetInvestorList(): SWRHook<Components.Schemas.InvestorDto[]> {
  const { data, error, mutate } = useSWR([SwrKeys.useGetInvestorList], getInvestorList);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
