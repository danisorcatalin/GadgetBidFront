import { RowCellType, RowCell } from 'components/generic/Table/Table.types';
import { DocumentsTable } from 'components/generic/Table/DocumentsTable';

import type { Document } from 'types/document';
import type {
  IssuerOnboardFileType,
  UserOnboard,
  UserOnboardFile,
  UserOnboardOutputDto,
} from 'types/user';
import { useIssuerProfileContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';

export interface IssuerOnboardingDocumentsTableProps {
  onboardData: Partial<UserOnboardOutputDto>;
  uploadOnboardingDocument?: (onboardId, documentType, file) => Promise<void>;
  useAuthHook?: unknown;
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
  },
  {
    type: RowCellType.DISCARD_BUTTON,
  },
];

export const IssuerOnboardingDocumentsTable = (
  props: IssuerOnboardingDocumentsTableProps
): JSX.Element => {
  const { onboardData = {} as UserOnboard } = props;
  const { id: onboardId, files: uploadedFiles = [] } = onboardData;
  const { uploadOnboardingDocument, discardOnboardingDocument } = useIssuerProfileContext();
  const { t } = useTranslation();

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
  ];

  const displayedDocumentsRows: Document<IssuerOnboardFileType>[] = [
    {
      label: t('issuer.identityCard'),
      type: 'IDENTITY',
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf',
    },
    {
      label: t('issuer.contract'),
      type: 'CONTRACT',
      infoText: t('general.powerOfAttorney'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf',
    },
  ];

  return (
    <DocumentsTable<UserOnboardFile, IssuerOnboardFileType>
      title={t('issuer.onboardingDocuments')}
      header={header}
      rowCells={rowCells}
      displayedDocumentsRows={displayedDocumentsRows}
      uploadedFiles={uploadedFiles}
      uploadDocument={uploadOnboardingDocument()}
      discardDocument={discardOnboardingDocument()}
      relationName="onboardId"
      relationId={onboardId}
      documentsType="ONBOARD"
    />
  );
};
