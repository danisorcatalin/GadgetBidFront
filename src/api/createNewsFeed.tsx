import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const createNewsFeed = async (
  payload: Components.Schemas.NewsFeedInputDto
): Promise<Components.Schemas.NewNewsFeedDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.newsFeedControllerCreatePost(undefined, {
      ...payload,
    });
    const newsFeed = response.data as Components.Schemas.NewNewsFeedDto;

    return newsFeed;
  } catch (err) {
    throw new Error(err);
  }
};
