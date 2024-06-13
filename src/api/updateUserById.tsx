import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const updateUserById = async (
  id: number,
  payload: Components.Schemas.UserUpdateDto
): Promise<Components.Schemas.UserOutputDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.userControllerUpdateUser(id, {
      ...payload,
    });
    const user = response.data;
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
