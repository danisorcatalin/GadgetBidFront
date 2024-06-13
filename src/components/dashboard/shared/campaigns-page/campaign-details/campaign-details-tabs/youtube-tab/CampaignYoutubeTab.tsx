import { Box } from '@mui/material';
import { DocumentsTable, RowCellType } from 'components/generic/Table';
import { useCampaignDetailsContext } from 'hooks/contexts';
import type { CampaignFile, Document } from 'types/document';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Campaign, CampaignPresentationFileType } from 'types/campaign';
import { CampaignYoutubePreview } from './campaign-youtube-preview/CampaignYoutubePreview';

export interface CampaignYoutubeTabProps {
  readonly: boolean;
  campaignFiles: CampaignFile[];
  campaignData: Partial<Campaign>;
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

export const CampaignYoutubeTab: FC<CampaignYoutubeTabProps> = (
  props: CampaignYoutubeTabProps
): JSX.Element => {
  const { campaignData, campaignFiles: uploadedFiles = [], readonly } = props;
  const { videoPresentation } = campaignData;
  const uploadedPresentationFiles = uploadedFiles.filter(
    (file) =>
      file.type === CampaignPresentationFileType.LOGO ||
      file.type === CampaignPresentationFileType.COVER
  );

  const {
    uploadCampaignDocument = () => async () => {},
    discardCampaignDocument = () => async () => {},
  } = useCampaignDetailsContext();
  const { t } = useTranslation();
  const displayedDocumentsRows: Document<CampaignPresentationFileType>[] = [
    {
      label: t('campaign.documentsTable.cover'),
      type: CampaignPresentationFileType.COVER,
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png',
    },
    {
      label: t('campaign.documentsTable.logo'),
      type: CampaignPresentationFileType.LOGO,
      infoText: t('general.documentTableTooltip'),
      acceptUploadFileType: '.jpg,.jpeg,.png',
    },
  ];
  const header = [
    {
      cellType: RowCellType.TEXT,
      cellValue: t('campaign.documentsTable.presentationName'),
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
  /**
   * disable download/upload in case user finalizes the
   * campaign listing
   */
  const enhancedDisplayedDocumentRow = displayedDocumentsRows.map((row) => {
    return {
      ...row,
      readonly,
    };
  });
  const tableRowCells = readonly ? rowCellsViewOnly : rowCells;

  return (
    <Box>
      <DocumentsTable<CampaignFile, CampaignPresentationFileType>
        title={t('campaign.documentsTable.presentationName')}
        header={header}
        rowCells={tableRowCells}
        displayedDocumentsRows={enhancedDisplayedDocumentRow}
        uploadedFiles={uploadedPresentationFiles}
        uploadDocument={uploadCampaignDocument()}
        discardDocument={discardCampaignDocument()}
        relationName="campaignId"
        relationId={campaignData.id}
        readonly={readonly}
        documentsType="CAMPAIGN"
      />
      <CampaignYoutubePreview readonly={readonly} youtubeLink={videoPresentation} />
    </Box>
  );
};
