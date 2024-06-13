/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone, FileWithPath } from 'react-dropzone';
import type { DropzoneOptions } from 'react-dropzone';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  LinearProgress,
} from '@mui/material';
import DuplicateIcon from 'icons/Duplicate';
import XIcon from 'icons/X';
import bytesToSize from 'utils/bytesToSize';
import { useTranslation } from 'react-i18next';
import gtm from '../../lib/gtm';
import { GTM_EVENTS } from '../../constants';

interface FileDropzoneProps extends DropzoneOptions {
  file: (FileWithPath & { file_path?: string }) | File;
  onRemove?: (file: File) => void;
  onUpload?: () => void;
  propagateDrop: (files: File[]) => void;
  uploading?: boolean;
  imageUri?: string;
}

export const FileDropzone: FC<FileDropzoneProps> = (props) => {
  const {
    accept = '',
    disabled,
    file,
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onUpload,
    preventDropOnDocument,
    uploading,
    imageUri = '',
    propagateDrop,
    ...other
  } = props;

  const [errMsg, setErrMsg] = useState<string>('');
  const { t } = useTranslation();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop: (acceptedFiles: File[]) => {
      propagateDrop(acceptedFiles);
      setErrMsg('');
    },
    onDropRejected: (x) => {
      setErrMsg(x[0].errors[0].message);
    },
  });

  const uploadFileEventClick = (): void => {
    onUpload();
    gtm.push({ event: `${GTM_EVENTS.DOCUMENT_UPLOAD}_CLICK` });
  };

  return (
    <div {...other}>
      {file === null && (
        <Box
          sx={{
            alignItems: 'center',
            borderColor: 'divider',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            outline: 'none',
            minWidth: '552px',
            ...(isDragActive && {
              backgroundColor: 'action.active',
              opacity: 0.5,
            }),
            '&:hover': {
              backgroundColor: 'action.hover',
              cursor: 'pointer',
              opacity: 0.5,
            },
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2 }}>
              <Typography color="textPrimary" variant="h1">
                {t('generic.fileDropzone.selectFile')}
              </Typography>
              <Box>
                <Typography color="textPrimary" variant="h1" display="inline">
                  {t('generic.fileDropzone.dropFile')}
                </Typography>
                <Typography sx={{ color: 'primary.main' }} variant="h1" display="inline">
                  {t('generic.fileDropzone.browse')}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ height: '176px', backgroundColor: '#F0F2F2' }} />
            {errMsg && (
              <Box sx={{ mt: 2 }}>
                <Typography color="error" variant="h3">
                  {errMsg}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {file !== null && (
        <Box sx={{ p: 2, backgroundColor: '#F0F2F2' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <DuplicateIcon fontSize="small" sx={{ mr: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', mr: 2 }}>
              <Typography
                color="textPrimary"
                sx={{ wordWrap: 'break-word' }}
                variant="h5"
                display="inline"
              >
                {file.name}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ wordWrap: 'break-word' }}
                variant="body1"
                display="inline"
              >
                {bytesToSize(file.size)}
              </Typography>
            </Box>
            <Tooltip title={t('generic.fileDropzone.remove')}>
              <IconButton
                edge="end"
                onClick={() => onRemove && onRemove(file as File)}
                size="large"
              >
                <XIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>
          {imageUri && (
            <Box sx={{ justifyContent: 'center' }}>
              <img src={imageUri} alt="" />
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Button
              color="primary"
              onClick={uploadFileEventClick}
              sx={{ ml: 2 }}
              type="button"
              variant="contained"
              fullWidth
              disabled={uploading ? true : false}
            >
              {t('generic.fileDropzone.upload')}
            </Button>
          </Box>
          {uploading && <LinearProgress style={{ marginTop: 16 }} />}
        </Box>
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  disabled: PropTypes.bool,
  file: PropTypes.any,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
};

FileDropzone.defaultProps = {
  file: null,
};
