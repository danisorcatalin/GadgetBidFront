import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const addFeedbackAnswer = async (
  formName: string,
  payload: Components.Schemas.FeedbackAnswerInputDto
): Promise<Components.Schemas.FeedbackAnswerDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.feedbackControllerAnswerFeedback(formName, {
      ...payload,
    });
    const feedbackAnswer = response.data as Components.Schemas.FeedbackAnswerDto;
    return feedbackAnswer;
  } catch (err) {
    throw new Error(err);
  }
};
