import { useContext, createContext } from 'react';
import { DiscardDocument, UploadDocument } from 'types/document';
import {
  NewsFeedFileType,
  UpdateNewsFeedDto,
  UpdateNewsFeedPostVisibilityDto,
} from 'types/newsFeed';

export interface INewsFeedContext {
  createNewsFeed?: () => (message: string, fileIds?: number[]) => Promise<void>;
  updateNewsFeed?: () => (id: number, payload: UpdateNewsFeedDto) => Promise<void>;
  updateNewsFeedVisibility?: () => (
    id: number,
    payload: UpdateNewsFeedPostVisibilityDto
  ) => Promise<void>;
  uploadNewsFeedFile?: () => UploadDocument<NewsFeedFileType>;
  discardNewsFeedFile?: () => DiscardDocument<NewsFeedFileType>;
}
const initial = {} as INewsFeedContext;
export const NewsFeedContext = createContext<INewsFeedContext>(initial);
export const useNewsFeedContext = (): INewsFeedContext =>
  useContext<INewsFeedContext>(NewsFeedContext);
