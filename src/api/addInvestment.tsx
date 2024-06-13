import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const addInvestment = async (
  payload: Components.Schemas.InvestmentCreateDto
): Promise<Components.Schemas.InvestmentDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.investmentControllerCreateInvestment(undefined, {
      ...payload,
    });
    const project = response.data as Components.Schemas.InvestmentDto;
    return project;
  } catch (err) {
    throw new Error(err);
  }
};
