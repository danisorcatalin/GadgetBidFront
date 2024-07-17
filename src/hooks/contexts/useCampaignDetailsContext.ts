import { useContext, createContext } from 'react';
import { DiscardDocument, UploadDocument } from 'types/document';
import { CampaignFileType, CampaignPresentationFileType } from 'types/campaign';

export interface ICampaignDetailsContext {
  onCampaignDescriptionSave: () => (description: string) => Promise<void>;
  onCampaignYoutubeSubmit: () => (values: string) => Promise<void>;
  uploadCampaignDocument: () => UploadDocument<CampaignFileType | CampaignPresentationFileType>;
  discardCampaignDocument: () => DiscardDocument<CampaignFileType>;
  onCampaignRiskSave: () => (description: string) => Promise<void>;
  onCampaignQaSave: () => (description: string) => Promise<void>;
  onFinalizeCampaign: () => () => Promise<void>;
}
const initial = {} as ICampaignDetailsContext;
export const CampaignDetailsContext = createContext<ICampaignDetailsContext>(initial);
export const useCampaignDetailsContext = (): ICampaignDetailsContext =>
  useContext<ICampaignDetailsContext>(CampaignDetailsContext);
