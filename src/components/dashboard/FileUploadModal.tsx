import { useEffect, useState } from 'react';
import { Box, Typography, Dialog, DialogProps } from '@mui/material';

import { FileDropzone } from 'components/generic/FileDropzone';
import { UploadDocument, AugmentedDocument, FileTypeUnion } from 'types/document';
import { blobToFile, dataURIToBlob, isImageFile, resizeFile } from 'utils/utils';
import { useTranslation } from 'react-i18next';

type Props<ModalData extends AugmentedDocument> = DialogProps & {
  modalData: ModalData;
  uploadDocument: UploadDocument;
  relationName: string;
  onUploadSuccess?: () => void;
};

const getImageResize = (imageFileType: FileTypeUnion): [number, number] => {
  switch (imageFileType) {
    case 'COVER':
      return [1024, 1024];
    case 'LOGO':
      return [160, 160];
    default:
      return [300, 300];
  }
};

export const FileUploadModal = <ModalData extends AugmentedDocument>(
  props: Props<ModalData>
): JSX.Element => {
  const {
    modalData = {} as ModalData,
    uploadDocument = () => {},
    onUploadSuccess = () => {},
    relationName,
  } = props;
  const [file, setFile] = useState<File>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [img, setImg] = useState<string>('');
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (uploadSuccess) {
        handleClose();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [uploadSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  const onDrop = async (droppedFiles: File[]) => {
    if (droppedFiles.length && isImageFile(droppedFiles[0])) {
      const fileName = droppedFiles[0].name;
      const imageUri = await resizeFile(droppedFiles[0], ...getImageResize(modalData.type));
      setImg(imageUri);
      const blob = dataURIToBlob(imageUri);
      const fileToUpload = blobToFile(blob, fileName);
      setFile(fileToUpload);
    } else {
      setImg('');
      setFile(droppedFiles[0]);
    }
  };

  const onUpload = async () => {
    try {
      setUploadSuccess(false);
      setUploading(true);
      await uploadDocument(modalData[relationName], modalData.type, file);
      onUploadSuccess();
      setUploading(false);
      setUploadSuccess(true);
    } catch (e) {
      setUploadSuccess(false);
      throw new Error(e);
    }
  };

  const onRemove = () => {
    setFile(null);
  };

  // if (uploadSuccess) {
  //   setTimeout(() => {
  //     handleClose();
  //   }, 1000);
  // }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
        }}
      >
        {uploadSuccess ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              p: 2,
            }}
          >
            <Typography color="textPrimary" variant="h1">
              {t('generic.fileUploadModal.uploadSuccess')}
            </Typography>
            <Typography
              sx={{ color: 'primary.main', cursor: 'pointer' }}
              variant="h1"
              onClick={handleClose}
            >
              {t('generic.fileUploadModal.return')}
            </Typography>
          </Box>
        ) : (
          <FileDropzone
            propagateDrop={onDrop}
            onUpload={onUpload}
            onRemove={onRemove}
            uploading={uploading}
            file={file}
            imageUri={img}
            maxFiles={1}
            accept={modalData.acceptUploadFileType}
          />
        )}
      </Box>
    </Dialog>
  );
};
