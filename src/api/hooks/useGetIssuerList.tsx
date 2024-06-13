import { GadgetClientJava } from 'lib/axios';
import { Components } from 'lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';

export const getIssuerList = async (): Promise<Components.Schemas.IssuerDto[]> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerUserIssuerList();
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetIssuerList(): SWRHook<Components.Schemas.IssuerDto[]> {
  const { data, error, mutate } = useSWR([SwrKeys.useGetIssuerList], getIssuerList);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
