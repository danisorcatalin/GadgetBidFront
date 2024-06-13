import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const uploadCompanyFile = async (
  companyId: number,
  documentType: Components.Schemas.CompanyFileType,
  file: File
): Promise<Components.Schemas.CompanyFileDto> => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file, file.name);
    const client = await GadgetClientJava.getClient();
    const response = await client.companyControllerUploadCompanyFile(
      { id: companyId, documentType },
      bodyFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    const fileRes = response.data as Components.Schemas.CompanyFileDto;
    return fileRes;
  } catch (err) {
    throw new Error(err);
  }
};
