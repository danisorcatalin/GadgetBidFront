import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const updateNewsFeed = async (
  id: number,
  payload: Components.Schemas.UpdateNewsFeedDto
): Promise<Components.Schemas.NewNewsFeedDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.newsFeedControllerUpdateNewsFeed(id, {
      ...payload,
    });
    const newsFeed = response.data as Components.Schemas.NewNewsFeedDto;

    return newsFeed;
  } catch (err) {
    throw new Error(err);
  }
};
