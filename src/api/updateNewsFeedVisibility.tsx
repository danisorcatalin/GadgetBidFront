import { GadgetClientJava } from '../lib/axios';
import { Components } from '../lib/GadgetClientJava';

export const updateNewsFeedVisibility = async (
  id: number,
  payload: Components.Schemas.UpdateNewsFeedPostVisibilityDto
): Promise<Components.Schemas.NewNewsFeedDto> => {
  try {
    const client = await GadgetClientJava.getClient();
    const response = await client.newsFeedControllerUpdatePostVisibility(id, {
      ...payload,
    });
    const newsFeed = response.data as Components.Schemas.NewNewsFeedDto;

    return newsFeed;
  } catch (err) {
    throw new Error(err);
  }
};
