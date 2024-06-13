import { RowCellType, RowCell } from 'components/generic/Table/Table.types';
import { DocumentsTable } from 'components/generic/Table/DocumentsTable';
import { InvestorOnboardFileType, UserOnboardOutputDto } from 'types/user';

import type { Document, UploadDocument } from 'types/document';
import type { UserOnboard, UserOnboardFile } from 'types/user';
import { useInvestorProfileContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';

export interface InvestorOnboardingDocumentsTableProps {
  onboardData: Partial<UserOnboardOutputDto>;
  useAuthHook?: unknown;
  uploadDocument?: UploadDocument<InvestorOnboardFileType>;
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
];

export const InvestorOnboardingDocumentsTable = (
  props: InvestorOnboardingDocumentsTableProps
): JSX.Element => {
  const { onboardData = {} as UserOnboard } = props;
  const { id: onboardId, files: uploadedFiles = [] } = onboardData;
  const { uploadInvestorDocument } = useInvestorProfileContext();
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
  const displayedDocumentsRows: Document<InvestorOnboardFileType>[] = [
    // {
    //   label: 'Identity card',
    //   type: 'IDENTITY',
    //   tooltipText: 'PDF document',
    // },
    {
      label: t('documents.bankAccountStatement'),
      type: 'CONTRACT',
      infoText: t('general.20MbTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf',
    },
  ];

  return (
    <DocumentsTable<UserOnboardFile, InvestorOnboardFileType>
      title={t('investor.onboardingDocuments')}
      header={header}
      rowCells={rowCells}
      displayedDocumentsRows={displayedDocumentsRows}
      uploadedFiles={uploadedFiles}
      uploadDocument={uploadInvestorDocument()}
      relationName="onboardId"
      relationId={onboardId}
      documentsType="ONBOARD"
    />
  );
};
