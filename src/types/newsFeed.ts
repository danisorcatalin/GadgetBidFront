import { Components } from 'lib/GadgetClientJava';

export type NewsFeed = Components.Schemas.NewNewsFeedDto;
export type NewsFeedFileType = Components.Schemas.NewsFeedFileType;
export type NewsFeedFileDto = Components.Schemas.NewsFeedFileDto;
export type UpdateNewsFeedDto = Components.Schemas.UpdateNewsFeedDto;
export type UpdateNewsFeedPostVisibilityDto = Components.Schemas.UpdateNewsFeedPostVisibilityDto;
export enum NewsFeedStatusEnum {
  ACCEPTED = 'ACCEPTED',
  HIDDEN = 'HIDDEN',
  PENDING = 'PENDING',
}
