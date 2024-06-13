import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const addInvestmentAnswers = async (
  investmentId: number,
  payload: Components.Schemas.UserAnswerInputArrayDto
): Promise<Components.Schemas.UserAnswersScoreDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerAddUserAnswers(investmentId, {
      ...payload,
    });
    const score = response.data as Components.Schemas.UserAnswersScoreDto;
    return score;
  } catch (err) {
    throw new Error(err);
  }
};
