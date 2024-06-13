import { Typography } from '@mui/material';
import { Table } from 'components/generic/Table/Table';
import { mergeTwoObjectArraysByProperty } from 'utils/utils';
import { useModal } from 'mui-modal-provider';
import { FileUploadModal } from 'components/dashboard/FileUploadModal';

import type { TableHeader, RowCell } from 'components/generic/Table';
import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import type {
  UploadDocument,
  FileDtoUnion,
  FileTypeUnion,
  Document,
  AugmentedDocument,
  DiscardDocument,
} from 'types/document';
import { Box } from '@mui/system';
import { downloadCompanyFile } from '../../../api/downloadCompanyFile';
import { downloadCampaignFile } from '../../../api/downloadCampaignFile';
import { downloadKYCFile } from '../../../api/downloadKYCFile';
import { downloadOnboardFile } from '../../../api/downloadOnboardFile';
import { downloadInvestmentFile } from '../../../api/downloadInvestmentFile';

export interface Props<FileDto extends FileDtoUnion, FileType extends FileTypeUnion> {
  title: string;
  header: TableHeader[];
  rowCells: RowCell[];
  displayedDocumentsRows: Document<FileType>[];
  uploadedFiles: FileDto[];
  uploadDocument?: UploadDocument<FileType>;
  discardDocument?: DiscardDocument<FileType>;
  relationName?: string;
  relationId?: number;
  onUploadSuccess?: () => void;
  readonly?: boolean;
  documentsType: 'CAMPAIGN' | 'INVESTMENT' | 'ONBOARD' | 'COMPANY' | 'KYC';
}

export const DocumentsTable = <FileDto extends FileDtoUnion, FileType extends FileTypeUnion>(
  props: Props<FileDto, FileType>
): JSX.Element => {
  const {
    title = '',
    header = [],
    rowCells = [],
    displayedDocumentsRows = [],
    uploadedFiles = [],
    uploadDocument = async () => {},
    discardDocument = async () => {},
    onUploadSuccess = () => {},
    relationName,
    relationId,
    readonly,
    documentsType,
  } = props;
  const { showModal } = useModal();
  const files: AugmentedDocument[] = mergeTwoObjectArraysByProperty(
    displayedDocumentsRows.map((d) => ({ ...d, [relationName]: relationId })),
    uploadedFiles,
    'type'
  ).sort((first, second) => first.type.localeCompare(second.type));
  // eslint-disable-next-line
  const handleFileDownload = async (rowData: any) => {
    let res;
    if (documentsType === 'COMPANY') {
      res = await downloadCompanyFile(relationId, rowData?.id);
    } else if (documentsType === 'CAMPAIGN') {
      res = await downloadCampaignFile(relationId, rowData?.id);
    } else if (documentsType === 'INVESTMENT') {
      res = await downloadInvestmentFile(relationId, rowData?.id);
    } else if (documentsType === 'KYC') {
      res = await downloadKYCFile(relationId, rowData?.id);
    } else if (documentsType === 'ONBOARD') {
      res = await downloadOnboardFile(relationId, rowData?.id);
    } else {
      return;
    }
    const typedBlob = res as BlobPart;
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(
      new Blob([typedBlob], { type: 'application/octet-stream' })
    );
    const urlSegments = rowData.filePath.split('/');
    let fileName = urlSegments[urlSegments.length - 1];
    fileName = fileName.split('?')[0];
    link.download = rowData['name'] || rowData['label'] + '.jpg' || fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(function () {
      link.remove();
    }, 200);
    gtm.push({ event: `${GTM_EVENTS.DOCUMENT_DOWNLOAD}_${rowData.type}_CLICK` });
  };

  const handleFileUpload = (rowData: AugmentedDocument) => {
    showModal(FileUploadModal, {
      modalData: rowData,
      onUploadSuccess,
      uploadDocument,
      relationName,
    });
    gtm.push({ event: `${GTM_EVENTS.DOCUMENT_UPLOAD}_${rowData.type}_CLICK` });
  };
  // eslint-disable-next-line
  const handleFileView = async (rowData: any) => {
    let res;
    if (documentsType === 'COMPANY') {
      res = await downloadCompanyFile(relationId, rowData?.id);
    } else if (documentsType === 'CAMPAIGN') {
      res = await downloadCampaignFile(relationId, rowData?.id);
    } else if (documentsType === 'KYC') {
      res = await downloadKYCFile(relationId, rowData?.id);
    } else if (documentsType === 'INVESTMENT') {
      res = await downloadInvestmentFile(relationId, rowData?.id);
    } else if (documentsType === 'ONBOARD') {
      res = await downloadOnboardFile(relationId, rowData?.id);
    } else {
      return;
    }
    const typedBlob = res as BlobPart;
    const file = new Blob([typedBlob], { type: rowData.mimeType || 'image/jpeg' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    gtm.push({ event: `${GTM_EVENTS.DOCUMENT_VIEW}_${rowData.type}_CLICK` });
  };

  const handleFileDiscard = async (rowData: AugmentedDocument) => {
    try {
      await discardDocument(relationId, rowData.id);
      gtm.push({ event: `${GTM_EVENTS.DOCUMENT_DISCARD}_${rowData.type}_CLICK` });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: '16px' }}>
        {title}
      </Typography>
      <Table<AugmentedDocument>
        header={header}
        rows={files}
        rowCells={rowCells}
        handleFileDownload={handleFileDownload}
        handleFileUpload={handleFileUpload}
        handleFileView={handleFileView}
        handleFileDiscard={handleFileDiscard}
        readonly={readonly}
        type="documents"
      />
    </Box>
  );
};
