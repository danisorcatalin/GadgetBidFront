import { Box, Link, IconButton } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Components } from 'lib/GadgetClientJava';
import XIcon from 'icons/X';
import { Spacer } from 'components/Spacer';

interface FileListContainerProps {
  uploadedFiles?: Components.Schemas.NewsFeedFileDto[];
  handleFileDownload?: (modalData) => void;
  handleFileDiscard?: (modalData) => void;
}

export const FileListContainer = (props: FileListContainerProps): JSX.Element => {
  const { uploadedFiles, handleFileDownload = () => {}, handleFileDiscard = () => {} } = props;

  return (
    <>
      {uploadedFiles.map((file, index) => (
        <Box key={`box_fileListContainer_${index}`} display="flex" alignItems="center">
          <InsertDriveFileIcon sx={{ mr: 1, color: '#919eab' }} fontSize="small" />
          <Link
            key={`link_fileListContainer_${index}`}
            style={{ cursor: 'pointer', textDecoration: 'none' }}
            color="textSecondary"
            variant="body2"
            onClick={() => handleFileDownload(file)}
          >
            {file.name}
          </Link>
          <Spacer marginRight="5px" />
          <IconButton edge="end" onClick={() => handleFileDiscard(file)} size="small">
            <XIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </>
  );
};
