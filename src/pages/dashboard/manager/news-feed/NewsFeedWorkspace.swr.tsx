import gtm from '../../../../lib/gtm';
import { FC, useCallback, useRef } from 'react';
import { GTM_EVENTS } from '../../../../constants';
import { INewsFeedContext, NewsFeedContext } from 'hooks/contexts/useNewsFeedContext';
import { NewsFeed } from 'components/dashboard/shared/news-feed';
import { UpdateNewsFeedDto, UpdateNewsFeedPostVisibilityDto } from 'types/newsFeed';
import { NewsFeedUpdateError, NewsFeedUpdateSuccess } from '../../../../snacks';
import { updateNewsFeed, updateNewsFeedVisibility, useGetNewsFeedList } from 'api';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { withErrorSuspense } from 'utils/withErrorSuspense';

const NewsFeedWorkspace: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: newsFeedData, mutate: mutateNewsFeedList } = useGetNewsFeedList();

  const newsFeedUpdate = async (id: number, payload: UpdateNewsFeedDto) => {
    try {
      await updateNewsFeed(id, payload);
      mutateNewsFeedList();
      enqueueSnackbar(...NewsFeedUpdateSuccess);
    } catch (e) {
      enqueueSnackbar(...NewsFeedUpdateError);
      console.error(e);
    }
  };
  const updateNewsFeedRef = useRef(newsFeedUpdate);

  const updatePostVisibility = async (id: number, payload: UpdateNewsFeedPostVisibilityDto) => {
    try {
      await updateNewsFeedVisibility(id, payload);
      mutateNewsFeedList();
      enqueueSnackbar(...NewsFeedUpdateSuccess);
    } catch (e) {
      enqueueSnackbar(...NewsFeedUpdateError);
      console.error(e);
    }
  };
  const updateNewsFeedVisibilityRef = useRef(updatePostVisibility);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW });
    updateNewsFeedRef.current = newsFeedUpdate;
    updateNewsFeedVisibilityRef.current = updatePostVisibility;
  }, [newsFeedData]);

  const NewsFeedProvider: FC = useCallback(({ children }) => {
    const handlers: INewsFeedContext = {
      updateNewsFeed: () => updateNewsFeedRef.current,
      updateNewsFeedVisibility: () => updateNewsFeedVisibilityRef.current,
    };
    return (
      <NewsFeedContext.Provider
        value={{
          ...handlers,
        }}
      >
        {children}
      </NewsFeedContext.Provider>
    );
  }, []);

  return (
    <NewsFeedProvider>
      <NewsFeed newsFeedData={newsFeedData} />
    </NewsFeedProvider>
  );
};
export default withErrorSuspense(NewsFeedWorkspace);
