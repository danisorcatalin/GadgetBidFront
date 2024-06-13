import { GadgetClientJava } from 'lib/axios';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';
import { SimpleUserDto } from 'types/user';

export const getSimpleUserByUserId = async (_key: string, id: number): Promise<SimpleUserDto> => {
  try {
    if (!id) return {} as SimpleUserDto;
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerGetSimpleUserById(id);
    const simpleUser = response.data;
    return simpleUser;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetSimpleUserByUserId(id: number): SWRHook<SimpleUserDto> {
  const { data, error, mutate } = useSWR(
    [SwrKeys.getSimpleUserByUserId, id],
    getSimpleUserByUserId
  );
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
