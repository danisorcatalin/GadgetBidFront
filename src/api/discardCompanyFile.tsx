import { Components } from 'lib/GadgetClientJava';
import { GadgetClientJava } from '../lib/axios';

export const discardCompanyFile = async (
  companyId: number,
  fileId: number
): Promise<Components.Schemas.CompanyDto | Components.Schemas.ErrorDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.companyControllerDeleteCompanyFile({
      id: companyId,
      fileId: fileId,
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
