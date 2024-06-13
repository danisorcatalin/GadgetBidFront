import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import gtm from '../../../../../lib/gtm';
import { ChangeEvent } from 'react';
import { Box, Divider, IconButton, Tooltip } from '@mui/material';
import { GTM_EVENTS } from '../../../../../constants';
import { useAuth } from 'hooks';
import { useNewsFeedContext } from 'hooks/contexts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spacer } from 'components/Spacer';
import { FileListContainer } from 'components/generic/FileListContainer';
import { Components } from 'lib/GadgetClientJava';
import { GadgetInput } from 'ui/gadget/GadgetInput';

interface NewsFeedCreateProps {
  uploadedFiles?: Components.Schemas.NewsFeedFileDto[];
  createNewsFeed?: (message: string, fileIds?: number[]) => Promise<void>;
  handleFileUpload?: (modalData) => void;
  handleFileDownload?: (modalData) => void;
  handleFileDiscard?: (modalData) => void;
}
export const NewsFeedCreate = (props: NewsFeedCreateProps): JSX.Element => {
  const {
    uploadedFiles,
    handleFileUpload = () => {},
    handleFileDownload = () => {},
    handleFileDiscard = () => {},
  } = props;
  const { createNewsFeed } = useNewsFeedContext();
  const [message, setMessage] = useState<string>('');
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const addNewsFeed = () => {
    gtm.push({ event: GTM_EVENTS.NEWS_FEED_CREATE_CLICK });
    const fileIds = uploadedFiles.map((file) => file.id);
    createNewsFeed()(message, fileIds);
    setMessage('');
  };

  const attachFile = () => {
    handleFileUpload({
      type: 'DOCUMENT',
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf',
    });
  };

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <GadgetInput
          onChange={handleChange}
          placeholder={`${t('newsFeed.createMessage')}, ${user.firstName} ${user.lastName}`}
          value={message}
          formVariant={true}
        />
        <Tooltip title="Send">
          <IconButton
            color={message ? 'primary' : 'inherit'}
            component={message ? 'button' : 'span'}
            disabled={!message}
            onClick={addNewsFeed}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Box sx={{ height: 24 }}>
          <Divider sx={{ borderColor: '#A2AAAD' }} orientation="vertical" />
        </Box>
        <Tooltip title="Attach file">
          <IconButton edge="end" onClick={() => attachFile()}>
            <AttachFileIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        {uploadedFiles.length !== 0 ? <Spacer marginTop="16px" marginBottom="16px" /> : null}
        {uploadedFiles.length !== 0 ? (
          <FileListContainer
            handleFileDownload={handleFileDownload}
            handleFileDiscard={handleFileDiscard}
            uploadedFiles={uploadedFiles}
          />
        ) : null}
      </Box>
    </Box>
  );
};
