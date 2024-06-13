import { UserWalletDto } from 'types/user';
import { GadgetClientJava } from '../lib/axios';

export const updateUserWalletId = async (
  id: number,
  payload: UserWalletDto
): Promise<undefined> => {
  try {
    const client = await GadgetClientJava.getClient();
    await client.userControllerUpdateUserWallet(id, {
      ...payload,
    });
    return;
  } catch (err) {
    throw new Error(err);
  }
};
