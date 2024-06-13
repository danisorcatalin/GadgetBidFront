import { FC } from 'react';
import { RowCellType, DocumentsTable } from 'components/generic/Table';
import { CampaignFile, CampaignFileType, CampaignPresentationFileType } from 'types/campaign';
import type { Document } from 'types/document';
import { useCampaignDetailsContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'hooks';
import { Campaign } from 'types/campaign';

export interface CampaignDocumentsTableProps {
  campaignData: Partial<Campaign>;
  campaignFiles: CampaignFile[];
  readonly?: boolean;
  viewonly?: boolean;
  useAuthHook?: unknown;
}

const rowCells = [
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

const rowCellsViewOnly = [
  {
    type: RowCellType.TEXT,
    dataKey: 'label',
  },
  {
    type: RowCellType.INFO_BUTTON,
  },
  {
    type: RowCellType.DOWNLOAD_BUTTON,
  },
  {
    type: RowCellType.VIEW_BUTTON,
  },
];

export const CampaignDocumentsTable: FC<CampaignDocumentsTableProps> = (
  props: CampaignDocumentsTableProps
): JSX.Element => {
  const {
    user: { role: currentUserRole },
  } = useAuth();
  const {
    readonly = false,
    viewonly = false,
    campaignData,
    campaignFiles: uploadedFiles = [],
  } = props;
  const uploadedCampaignFiles = uploadedFiles.filter(
    (file) =>
      file.type !== CampaignPresentationFileType.LOGO &&
      file.type !== CampaignPresentationFileType.COVER
  );

  const {
    uploadCampaignDocument = () => async () => {},
    discardCampaignDocument = () => async () => {},
  } = useCampaignDetailsContext();
  const { t } = useTranslation();

  const displayedDocumentsRows: Document<CampaignFileType>[] = [
    {
      label: t('campaign.documentsTable.businessPlan'),
      type: CampaignFileType.BUSINESS_PLAN,
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
      readonly,
    },
    {
      label: t('campaign.documentsTable.executive'),
      type: CampaignFileType.EXECUTIVE_SUMMARY,
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
      readonly,
    },
    {
      label: t('campaign.documentsTable.pitch'),
      type: CampaignFileType.PITCH,
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
      readonly,
    },
    {
      label: t('campaign.documentsTable.material'),
      type: CampaignFileType.MATERIAL_RISK_MANAGEMENT,
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
      readonly,
    },
    {
      label: t('campaign.documentsTable.financial'),
      type: CampaignFileType.FINANCIAL_STATEMENT,
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
      readonly,
    },
    {
      label: t('campaign.documentsTable.last3years'),
      type: CampaignFileType.LAST_3_YEARS_FINANCIAL_STATEMENT,
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
      readonly,
    },
  ];

  const displayedInvestorRows = displayedDocumentsRows.map(({ ...item }) => item);

  const header = [
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.documentsTable.name'),
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

  const tableRowCells = viewonly ? rowCellsViewOnly : rowCells;

  return (
    <DocumentsTable<CampaignFile, CampaignFileType>
      title={t('campaign.campaignDocuments')}
      header={header}
      rowCells={tableRowCells}
      displayedDocumentsRows={
        currentUserRole === 'INVESTOR' ? displayedInvestorRows : displayedDocumentsRows
      }
      uploadedFiles={uploadedCampaignFiles}
      uploadDocument={uploadCampaignDocument()}
      discardDocument={discardCampaignDocument()}
      relationName="campaignId"
      relationId={campaignData.id}
      readonly={readonly}
      documentsType="CAMPAIGN"
    />
  );
};
