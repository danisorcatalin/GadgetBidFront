import gtm from '../../../lib/gtm';
import { FC, useRef, useState } from 'react';
import { GTM_EVENTS } from '../../../constants';
import { NewsFeed } from 'components/dashboard/shared/news-feed';
import { NewsFeedCreateError, NewsFeedCreateSuccess } from 'snacks';
import { createNewsFeed, discardNewsFeedFile, uploadNewsFeedFile, useGetNewsFeedList } from 'api';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { withErrorSuspense } from 'utils/withErrorSuspense';
import { DiscardDocument, UploadDocument } from 'types/document';
import { NewsFeedFileType } from 'types/newsFeed';
import { mutate } from 'swr';
import { SwrKeys } from 'swrKeys';

const NewsFeedWorkspace: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { data: newsFeedData, mutate: mutateNewsFeedList } = useGetNewsFeedList();
  const { enqueueSnackbar } = useSnackbar();

  const uploadNewsFeedDocument: UploadDocument<NewsFeedFileType> = async (
    newsFeedId,
    documentType,
    file
  ) => {
    try {
      const newsFeedFile = await uploadNewsFeedFile(newsFeedId, documentType, file);
      mutateNewsFeedList();
      setUploadedFiles([...uploadedFiles, newsFeedFile]);
    } catch (error) {
      console.error('Unable to upload news feed document', error);
    }
  };
  const uploadNewsFeedDocumentRef = useRef(uploadNewsFeedDocument);

  const discardNewsFeedDocument: DiscardDocument<NewsFeedFileType> = async (fileId) => {
    try {
      await discardNewsFeedFile(fileId);
      mutate([SwrKeys.useGetNewsFeedById, fileId]);
    } catch (error) {
      console.error('Could not delete news feed document', error);
    }
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId));
  };
  const discardNewsFeedDocumentRef = useRef(discardNewsFeedDocument);

  const addNewsFeed = async (message: string, fileIds: number[]) => {
    try {
      await createNewsFeed({ message, fileIds });
      mutateNewsFeedList();
      enqueueSnackbar(...NewsFeedCreateSuccess);
    } catch (e) {
      enqueueSnackbar(...NewsFeedCreateError);
      console.error(e);
    }
    setUploadedFiles([]);
  };
  const createNewsFeedRef = useRef(addNewsFeed);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW });
    createNewsFeedRef.current = addNewsFeed;
    uploadNewsFeedDocumentRef.current = uploadNewsFeedDocument;
    discardNewsFeedDocumentRef.current = discardNewsFeedDocument;
  }, [newsFeedData]);

  return (
      <NewsFeed
        uploadedFiles={uploadedFiles}
        newsFeedData={newsFeedData}
        uploadNewsFeedDocument={uploadNewsFeedDocument}
        discardNewsFeedDocument={discardNewsFeedDocument}
      />
  );
};
export default withErrorSuspense(NewsFeedWorkspace);
