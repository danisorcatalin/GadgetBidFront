import { CompanyFileType, Company } from 'types/company';
import { DocumentsTable } from 'components/generic/Table/DocumentsTable';
import { RowCellType, RowCell } from 'components/generic/Table/Table.types';
import { useTranslation } from 'react-i18next';

import type { CompanyFile, Document } from 'types/document';
import { useIssuerProfileContext } from 'hooks/contexts';

export interface CompanyDocumentsTableProps {
  companyData: Partial<Company>;
  useAuthHook?: unknown;
}

export const CompanyDocumentsTable = (props: CompanyDocumentsTableProps): JSX.Element => {
  const { companyData = {} as Company } = props;
  const { id: companyId, companyFiles: uploadedFiles = [] } = companyData;
  const { t } = useTranslation();
  const { uploadCompanyDocument, discardCompanyDocument } = useIssuerProfileContext();

  const header = [
    {
      cellType: RowCellType.TEXT,
      cellValue: t('company.documentsTable.name'),
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
    {
      cellType: RowCellType.TEXT,
      cellValue: '',
    },
  ];

  const rowCells: RowCell[] = [
    {
      type: RowCellType.DOCUMENT_NAME,
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
      readonly: companyId ? false : true,
    },
    {
      type: RowCellType.UPLOAD_BUTTON,
      readonly: companyId ? false : true,
    },
    {
      type: RowCellType.DISCARD_BUTTON,
    },
  ];

  const displayedDocumentsRows: Document<CompanyFileType>[] = [
    {
      label: t('company.documentsTable.pitchDeck'),
      type: CompanyFileType.PITCH_DECK,
      infoText: t('general.pdfTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
    },
    {
      label: t('company.documentsTable.businessPlan'),
      type: CompanyFileType.BUSINESS_PLAN,
      infoText: t('general.20MbTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
    },
    {
      label: t('company.documentsTable.incorporationDocument'),
      type: CompanyFileType.INCORPORATION_DOCUMENT,
      infoText: t('general.incorporationDocument'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
    },
    {
      label: t('company.documentsTable.tradeCertificate'),
      type: CompanyFileType.TRADE_REGISTRY_CERTIFICATE,
      infoText: t('general.tradeRegistryCertificate'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
    },
    {
      label: t('company.documentsTable.certificateOfStatus'),
      type: CompanyFileType.CERTIFICATE_OF_STATUS,
      infoText: t('general.certificateOfStatus'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
    },
  ];

  return (
    <DocumentsTable<CompanyFile, CompanyFileType>
      title={t('companyDocuments')}
      header={header}
      rowCells={rowCells}
      displayedDocumentsRows={displayedDocumentsRows}
      uploadedFiles={uploadedFiles}
      uploadDocument={uploadCompanyDocument()}
      discardDocument={discardCompanyDocument()}
      relationName="companyId"
      relationId={companyId}
      documentsType="COMPANY"
    />
  );
};
