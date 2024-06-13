import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { CompanyDto } from 'types/company';

export const getCompanyById = async (_key: string, id: number): Promise<CompanyDto> => {
  try {
    if (!id) return {} as CompanyDto;
    const client = await GadgetClientJava.getClient();
    const response = await client.companyControllerGetCompanyById(id);
    const company = response.data;
    return company;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetCompanyById(id: number): SWRHook<CompanyDto> {
  const { data, error, mutate } = useSWR([SwrKeys.getCompanyById, id], getCompanyById);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
