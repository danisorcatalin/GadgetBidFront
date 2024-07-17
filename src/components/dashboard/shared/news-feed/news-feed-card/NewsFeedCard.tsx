import Clock from '../../../../../icons/Clock';
import gtm from '../../../../../lib/gtm';
import { FC } from 'react';
import { Avatar, Box, Button, Card, CardHeader, Link, Tooltip, Typography } from '@mui/material';
import { GTM_EVENTS } from '../../../../../constants';
import { NewsFeedFileDto, NewsFeedStatusEnum } from 'types/newsFeed';
import { Spacer } from 'components/Spacer';
import { formatDistance } from 'date-fns';
import { getStatusColor } from 'utils/user';
import { useAuth } from 'hooks';
import { useNewsFeedContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';
import { Components } from 'lib/GadgetClientJava';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios';
import { convertUtcDateToClientTimeZone } from 'utils/utils';

interface NewsFeedCardProps {
  newsFeedData?: Components.Schemas.NewNewsFeedDto;
  updateNewsFeedVisibility?: (status: string) => Promise<void>;
  useAuthHook?: unknown;
}

export const NewsFeedCard: FC<NewsFeedCardProps> = (props) => {
  const { newsFeedData, ...other } = props;
  const { id: newsFeedId, user: author, createdAt, message, status, postFiles } = newsFeedData;
  const { user } = useAuth();
  const { t } = useTranslation();
  const { updateNewsFeedVisibility } = useNewsFeedContext();

  function acceptNewsFeed(id: number): void {
    gtm.push({ event: GTM_EVENTS.NEWS_FEED_UPDATE_STATUS_CLICK });
    updateNewsFeedVisibility()(id, { status: NewsFeedStatusEnum.ACCEPTED });
  }

  function hideNewsFeed(id: number): void {
    gtm.push({ event: GTM_EVENTS.NEWS_FEED_UPDATE_STATUS_CLICK });
    updateNewsFeedVisibility()(id, { status: NewsFeedStatusEnum.HIDDEN });
  }

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

  const showUploadedFiles = (file: NewsFeedFileDto, index) => {
    return (
      <Box key={`newsFeedCard.${index}`} sx={{ mb: 0.5 }} display="flex" alignItems="center">
        <InsertDriveFileIcon sx={{ mr: 1, color: 'gray' }} fontSize="small" />
        <Link
          style={{ cursor: 'pointer', textDecoration: 'none' }}
          color="textSecondary"
          variant="body2"
          onClick={() => handleFileDownload(file)}
        >
          {file.name}
        </Link>
      </Box>
    );
  };

  return (
    <>
      <Card {...other}>
        <CardHeader
          avatar={<Avatar src={user.avatar as string} />}
          disableTypography
          subheader={
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                mt: 1,
              }}
            >
              <Clock fontSize="small" sx={{ color: 'text.secondary' }} />
              <Tooltip title={convertUtcDateToClientTimeZone(createdAt)}>
                <Typography color="textSecondary" sx={{ ml: '6px' }} variant="caption">
                  {formatDistance(new Date(), new Date(createdAt), { includeSeconds: true })}{' '}
                  {t('newsFeed.ago')}
                </Typography>
              </Tooltip>
            </Box>
          }
          title={
            <Typography color="textPrimary" variant="subtitle2">
              {author.firstName + ' ' + author.lastName}
            </Typography>
          }
        />
        <Box
          sx={{
            pb: 2,
            px: 3,
          }}
        >
          <Typography sx={{ textAlign: 'justify' }} color="textPrimary" variant="body1">
            {message}
          </Typography>
          <Spacer marginTop="16px" marginBottom="16px" />
          {postFiles ? postFiles.map((data, index) => showUploadedFiles(data, index)) : null}
          <Spacer marginTop="16px" marginBottom="16px" />
          {['ADMIN', 'ACCOUNT_MANAGER'].includes(user.role) ? (
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              {status !== NewsFeedStatusEnum.PENDING ? (
                <Button
                  style={{ color: getStatusColor(status), marginRight: 10 }}
                  size="medium"
                  variant="outlined"
                >
                  {status}
                </Button>
              ) : (
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => acceptNewsFeed(newsFeedId)}
                  >
                    {t('newsFeed.accept')}
                  </Button>
                  <Spacer marginRight="10px" />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => hideNewsFeed(newsFeedId)}
                  >
                    {t('newsFeed.hide')}
                  </Button>
                </Box>
              )}
            </Box>
          ) : null}
        </Box>
      </Card>
    </>
  );
};
