import { Box, Card, CardContent, Typography } from '@mui/material';
import { Components } from 'lib/GadgetClientJava';
import { Spacer } from 'components/Spacer';

import { FC } from 'react';
import { NewsFeedCard } from './news-feed-card';
import { NewsFeedFileType, NewsFeedStatusEnum } from 'types/newsFeed';
import { useAuth } from 'hooks';
import { useTranslation } from 'react-i18next';
import { DiscardDocument, UploadDocument } from 'types/document';
import { NewsFeedUploadFile } from './news-feed-upload';

export interface NewsFeedProps {
  uploadedFiles?: Components.Schemas.NewsFeedFileDto[];
  newsFeedData: Components.Schemas.NewNewsFeedDto[];
  createNewsFeed?: (message: string, fileIds?: number[]) => Promise<void>;
  updateNewsFeed?: (status: string, id?: number) => Promise<void>;
  useAuthHook?: unknown;
  readonly?: boolean;
  uploadNewsFeedDocument?: UploadDocument<NewsFeedFileType>;
  discardNewsFeedDocument?: DiscardDocument<NewsFeedFileType>;
}

export const NewsFeed: FC<NewsFeedProps> = (props: NewsFeedProps) => {
  const {
    uploadedFiles,
    newsFeedData,
    readonly = false,
    uploadNewsFeedDocument,
    discardNewsFeedDocument,
  } = props;
  const { user } = useAuth();
  const { t } = useTranslation();

  const generateCard = (data: Components.Schemas.NewNewsFeedDto, index: number) => {
    return (
      <Box key={`newsFeedCard.${index}`} sx={{ mb: 2 }}>
        <NewsFeedCard newsFeedData={data} />
      </Box>
    );
  };

  return (
    <Card sx={{ mt: 5, maxWidth: '1024px' }}>
      <CardContent sx={{ background: '#FFFFFF', maxWidth: '1024px' }}>
        {user.role === 'ISSUER' ? (
          <NewsFeedUploadFile<NewsFeedFileType>
            uploadDocument={uploadNewsFeedDocument}
            discardDocument={discardNewsFeedDocument}
            readonly={readonly}
            relationName="newsFeedId"
            uploadedFiles={uploadedFiles}
          />
        ) : null}
        {user.role === 'ISSUER' ? <Spacer marginTop="16px" marginBottom="16px" /> : null}
        {newsFeedData.length === 0 ? (
          <Typography color="textPrimary" variant="h6">
            {newsFeedData.length !== 0 ? <Spacer marginTop="16px" marginBottom="16px" /> : null}
            {t('newsFeed.notNewsFeed')}
          </Typography>
        ) : user.role === 'INVESTOR' ? (
          newsFeedData
            .filter((data) => data.status === NewsFeedStatusEnum.ACCEPTED)
            .map((data, index) => generateCard(data, index))
        ) : user.role === 'ISSUER' ? (
          newsFeedData
            .filter((data) => data.user.id === user.id)
            .map((data, index) => generateCard(data, index))
        ) : (
          newsFeedData.map((data, index) => generateCard(data, index))
        )}
      </CardContent>
    </Card>
  );
};
