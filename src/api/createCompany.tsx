import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const createCompany = async (
  userId: number,
  payload: Omit<Components.Schemas.CompanyInputDto, 'user'>
): Promise<Components.Schemas.CompanyDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.companyControllerCreateCompany(undefined, {
      ...payload,
      user: userId,
    });
    const company = response.data as Components.Schemas.CompanyDto;
    return company;
  } catch (err) {
    throw new Error(err);
  }
};
