import { RowCellType, RowCell } from 'components/generic/Table/Table.types';
import { DocumentsTable } from 'components/generic/Table/DocumentsTable';

import type { Document, UploadDocument, UserKycFile, UserKycFileType } from 'types/document';
import type { UserOutputSingleDto } from 'types/user';
import { useTranslation } from 'react-i18next';

export type InvestorVeriffDocument = UserKycFile & {
  filePath: string;
};
export interface InvestorVeriffDocumentsTableProps {
  userData: Partial<UserOutputSingleDto>;
  userKycFiles: InvestorVeriffDocument[];
  useAuthHook?: unknown;
  uploadDocument?: UploadDocument<UserKycFileType>;
}

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
  },
  {
    type: RowCellType.UPLOAD_BUTTON,
    readonly: true,
  },
];

export const InvestorVeriffDocumentsTable = (
  props: InvestorVeriffDocumentsTableProps
): JSX.Element => {
  const { userData = {} as UserOutputSingleDto, userKycFiles = [] } = props;
  const { t } = useTranslation();
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
  const displayedDocumentsRows: Document<UserKycFileType>[] = [
    {
      label: t('documents.scannedIdentityCard'),
      type: 'IDENTITY',
      infoText: t('general.veriffTooltip'),
    },
    {
      label: t('documents.selfie'),
      type: 'PHOTO',
      infoText: t('general.veriffTooltip'),
    },
  ];

  return (
    <DocumentsTable<UserKycFile, UserKycFileType>
      title={t('investor.KYCDocuments')}
      header={header}
      rowCells={rowCells}
      displayedDocumentsRows={displayedDocumentsRows}
      uploadedFiles={userKycFiles}
      relationId={userData.id}
      documentsType="KYC"
      relationName="userId"
    />
  );
};
