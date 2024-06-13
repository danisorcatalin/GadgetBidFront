import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';
import { InvestorOnboardStatus, IssuerOnboardStatus } from '../types/user';

export const updateUserOnboardById = async (
  id: number,
  newStatus: InvestorOnboardStatus | IssuerOnboardStatus
): Promise<Components.Schemas.UserOnboardOutputDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerUpdateUserOnboard(
      { id },
      {
        status: newStatus,
      }
    );
    const userOnboard = response.data as Components.Schemas.UserOnboardOutputDto;
    return userOnboard;
  } catch (err) {
    throw new Error(err);
  }
};
