import { GadgetClientJava } from '../lib/axios';

import type { CompanyMember } from 'types/company';

export const deleteCompanyMember = async (
  companyId: number,
  memberId: number
): Promise<CompanyMember> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.companyControllerDeleteCompanyMember({
      id: companyId,
      memberId,
    });
    const member = response.data as CompanyMember;
    return member;
  } catch (err) {
    throw new Error(err);
  }
};
