import useSWR from 'swr';
import { SwrKeys } from 'swrKeys';
import { SWRHook } from '../../hooks/hook.types';
import { GadgetClientJava } from '../../lib/axios';
import { Components } from 'lib/GadgetClientJava';

export const getFeedbackForm = async (
  key: string,
  formName: string
): Promise<Components.Schemas.FeedbackGetDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.feedbackControllerGetFeedbackForm(formName);
    const feedbackForm = response.data;
    return feedbackForm;
  } catch (err) {
    throw new Error(err);
  }
};

export function useGetFeedbackForm(formName: string): SWRHook<Components.Schemas.FeedbackGetDto> {
  const { data, error, mutate } = useSWR([SwrKeys.getFeedbackForm, formName], getFeedbackForm);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
