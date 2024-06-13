import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

import type { CompanyMember } from 'types/company';

export const updateCompanyMember = async (
  companyId: number,
  memberId: number,
  payload: Components.Schemas.CompanyMemberInputDto
): Promise<CompanyMember> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.companyControllerUpdateCompanyMember(
      { id: companyId, memberId },
      { ...payload }
    );
    const member = response.data as CompanyMember;
    return member;
  } catch (err) {
    throw new Error(err);
  }
};
