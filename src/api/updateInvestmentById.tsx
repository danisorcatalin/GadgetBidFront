import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const updateInvestmentById = async (
  id: number,
  payload: Components.Schemas.InvestmentUpdateDto
): Promise<Components.Schemas.InvestmentDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.investmentControllerUpdateInvestment({ id }, payload);
    const investment = response.data as Components.Schemas.InvestmentDto;
    return investment;
  } catch (err) {
    throw new Error(err);
  }
};
