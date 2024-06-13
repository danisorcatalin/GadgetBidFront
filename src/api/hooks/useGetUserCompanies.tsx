import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { CompanyDto } from 'types/company';

export const getUserCompanies = async (_key: string, id: number): Promise<CompanyDto[]> => {
  try {
    if (!id) return [] as CompanyDto[];
    const client = await GadgetClientJava.getClient();
    const response = await client.getUserCompanies(id);
    const campaign = response.data;
    return campaign;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetUserCompanies(id: number): SWRHook<CompanyDto[]> {
  const { data, error, mutate } = useSWR([SwrKeys.getUserCompanies, id], getUserCompanies);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
