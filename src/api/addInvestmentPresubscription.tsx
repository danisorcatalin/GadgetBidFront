import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const addInvestmentPresubscription = async (
  payload: Components.Schemas.PresubscribeInvestmentCreateDto
): Promise<Components.Schemas.InvestmentDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.investmentControllerCreatePresubscription(undefined, {
      ...payload,
    });
    const investment = response.data as Components.Schemas.InvestmentDto;
    return investment;
  } catch (err) {
    throw new Error(err);
  }
};
