import styled from '@emotion/styled';
import { Box, Button, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { FC, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useTranslation } from 'react-i18next';

interface Props {
  file: File;
  hasBackButton: boolean;
  handleBack?: () => void;
}

const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

export const PdfReaderDetails: FC<Props> = (props: Props) => {
  const { file, hasBackButton, handleBack = () => {} } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { t } = useTranslation();
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <>
      {hasBackButton && (
        <IconButton sx={{ ml: 2, mb: 2 }} color="primary" onClick={handleBack} size="large">
          <ArrowBack />
        </IconButton>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          padding: '24px 0',
        }}
      >
        <Box
          sx={{
            height: numPages ? '70vh' : '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <PDFDocumentWrapper>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </PDFDocumentWrapper>
        </Box>
        {numPages && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px 0',
            }}
          >
            <p>
              {t('generic.pdfReader.page')} {pageNumber || (numPages ? 1 : '--')}{' '}
              {t('generic.pdfReader.of')} {numPages || '--'}
            </p>

            <Box>
              <Button
                color="primary"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                variant="contained"
              >
                {t('generic.pdfReader.previous')}
              </Button>
              <Button
                sx={{ ml: 2 }}
                color="primary"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                variant="contained"
              >
                {t('generic.pdfReader.next')}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
