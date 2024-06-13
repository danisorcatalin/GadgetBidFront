import { useModal } from 'mui-modal-provider';
import { FileUploadModal } from 'components/dashboard/FileUploadModal';
import type {
  UploadDocument,
  FileTypeUnion,
  AugmentedDocument,
  DiscardDocument,
  NewsFeedFileType,
} from 'types/document';
import axios from 'axios';
import gtm from '../../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../../constants';
import { NewsFeedCreate } from '../news-feed-create';
import { Components } from 'lib/GadgetClientJava';
import { NewsFeedFileDto } from 'types/newsFeed';

export interface Props<FileType extends FileTypeUnion> {
  uploadedFiles?: Components.Schemas.NewsFeedFileDto[];
  uploadDocument?: UploadDocument<NewsFeedFileType>;
  discardDocument?: DiscardDocument<FileType>;
  relationName?: string;
  relationId?: number;
  onUploadSuccess?: () => void;
  readonly?: boolean;
}

export const NewsFeedUploadFile = <FileType extends FileTypeUnion>(
  props: Props<FileType>
): JSX.Element => {
  const {
    uploadedFiles,
    uploadDocument = async () => {},
    onUploadSuccess = () => {},
    discardDocument = () => {},
    relationName,
  } = props;
  const { showModal } = useModal();

  const handleFileDownload = async (uploadedFile: NewsFeedFileDto) => {
    const res = await axios({
      method: 'get',
      url: uploadedFile.filePath,
      responseType: 'arraybuffer',
    });
    const typedBlob = res.data as BlobPart;
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(
      new Blob([typedBlob], { type: 'application/octet-stream' })
    );
    const urlSegments = uploadedFile.filePath.split('/');
    let fileName = urlSegments[urlSegments.length - 1];
    fileName = fileName.split('?')[0];
    link.download = uploadedFile['name'] || fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(function () {
      link.remove();
    }, 200);
    gtm.push({ event: GTM_EVENTS.NEWS_FEED_DOWNLOAD_DOCUMENT_CLICK });
  };

  const handleFileUpload = (modalData: AugmentedDocument) => {
    showModal(FileUploadModal, {
      modalData,
      onUploadSuccess,
      uploadDocument,
      relationName,
    });
    gtm.push({ event: GTM_EVENTS.NEWS_FEED_UPLOAD_DOCUMENT_CLICK });
  };

  const handleFileDiscard = async (uploadedFile: NewsFeedFileDto) => {
    try {
      await discardDocument(uploadedFile.id, null);
      gtm.push({ event: GTM_EVENTS.NEWS_FEED_DISCARD_DOCUMENT_CLICK });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NewsFeedCreate
      handleFileUpload={handleFileUpload}
      handleFileDownload={handleFileDownload}
      handleFileDiscard={handleFileDiscard}
      uploadedFiles={uploadedFiles}
    />
  );
};
