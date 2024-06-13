import { RowCellType } from 'components/generic/Table/Table.types';
import type { RowCell } from 'components/generic/Table/Table.types';
import { DocumentsTable } from 'components/generic/Table/DocumentsTable';

import type { Document, UploadDocument } from 'types/document';
import { Investment, InvestmentFile, InvestmentFileType } from 'types/investment';
import { useTranslation } from 'react-i18next';

export interface InvestmentsDocumentsTableProps {
  investmentData: Partial<Investment>;
  useAuthHook?: unknown;
  showUploadButton?: boolean;
  uploadDocument?: UploadDocument<InvestmentFileType>;
}

export const InvestmentsDocumentsTable = (props: InvestmentsDocumentsTableProps): JSX.Element => {
  const {
    investmentData = {} as Investment,
    showUploadButton = false,
    uploadDocument = async () => {},
  } = props;
  const { id: investmentId, investmentFiles: uploadedFiles = [] } = investmentData;
  const { t } = useTranslation();

  const displayedDocumentsRows: Document<InvestmentFileType>[] = [
    {
      label: t('documents.investmentAgreement'),
      type: 'INVESTMENT_AGREEMENT',
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf',
    },
    {
      label: t('documents.proofOfPayment'),
      type: 'PROOF_OF_PAYMENT',
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf',
    },
    {
      label: t('documents.SPVAgreement'),
      type: 'SPV_AGREEMENT',
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf',
    },
  ];

  const rowCells: RowCell[] = [
    {
      type: RowCellType.TEXT,
      dataKey: 'label',
    },
    {
      type: RowCellType.INFO_BUTTON,
    },
    {
      type: RowCellType.VIEW_BUTTON,
    },
    {
      type: RowCellType.DOWNLOAD_BUTTON,
    },
  ];
  const header = [
    {
      cellType: RowCellType.TEXT,
      cellValue: t('documents.name'),
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
  ];

  if (showUploadButton) {
    header.push({
      cellType: RowCellType.TEXT,
      cellValue: '',
    });
    rowCells.push({
      type: RowCellType.UPLOAD_BUTTON,
    });
  }

  return (
    <DocumentsTable<InvestmentFile, InvestmentFileType>
      title={t('investments.investmentsDocuments')}
      header={header}
      rowCells={rowCells}
      displayedDocumentsRows={displayedDocumentsRows}
      uploadedFiles={uploadedFiles}
      uploadDocument={uploadDocument}
      relationName="requestId"
      relationId={investmentId}
      documentsType="INVESTMENT"
    />
  );
};
