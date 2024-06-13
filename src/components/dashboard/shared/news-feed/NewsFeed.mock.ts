import { newsFeedDataMock } from 'mocks/newsFeedData';
import { useAuthHook } from 'mocks';
import { NewsFeedProps } from './NewsFeed';

export const mockNewsFeed: NewsFeedProps = {
  newsFeedData: newsFeedDataMock,
  useAuthHook,
};
