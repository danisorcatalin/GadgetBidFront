import { InvestmentFileType } from 'types/investment';
import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const uploadInvestmentFile = async (
  investmentId: number,
  documentType: InvestmentFileType,
  file: File
): Promise<Components.Schemas.InvestmentFileDto> => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file, file.name);
    const client = await GadgetClientJava.getClient();
    const response = await client.investmentControllerAddInvestmentFile(
      { id: investmentId, type: documentType },
      bodyFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    const fileRes = response.data as unknown;
    return fileRes as Components.Schemas.InvestmentFileDto;
  } catch (err) {
    throw new Error(err);
  }
};
