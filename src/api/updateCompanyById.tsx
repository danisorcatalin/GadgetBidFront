import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const updateCompanyById = async (
  companyId: number,
  payload: Partial<Components.Schemas.CompanyInputDto>
): Promise<Components.Schemas.CompanyInputDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.companyControllerUpdateCompany(companyId, {
      ...payload,
    });
    const company = response.data as Components.Schemas.CompanyDto;
    return company;
  } catch (err) {
    throw new Error(err);
  }
};
