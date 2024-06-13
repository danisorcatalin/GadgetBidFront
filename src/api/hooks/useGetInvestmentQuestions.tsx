import { GadgetClientJava } from 'lib/axios';
import { Components } from 'lib/GadgetClientJava';
import { SWRHook } from '../../hooks/hook.types';
import { SwrKeys } from 'swrKeys';
import useSWR from 'swr';

export const getInvestmentQuestions = async (): Promise<Components.Schemas.UserQuestionDto[]> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerGetUserQuestionList();
    const user = response.data as Components.Schemas.UserQuestionDto[];
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetInvestmentQuestions(): SWRHook<Components.Schemas.UserQuestionDto[]> {
  const { data, error, mutate } = useSWR([SwrKeys.getInvestmentQuestions], getInvestmentQuestions);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
