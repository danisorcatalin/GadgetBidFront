import { CampaignDetailsFormInputs } from 'components/dashboard/shared/campaigns-page/campaign-details';
import { CampaignTeamInputValues } from 'components/dashboard/shared/campaigns-page/campaign-details/campaign-details-tabs/teams-tab/campaign-team-form';
import { useContext, createContext } from 'react';
import { DiscardDocument, UploadDocument } from 'types/document';
import { CampaignFileType, CampaignPresentationFileType } from 'types/campaign';

export interface ICampaignDetailsContext {
  onCampaignDetailsFormSubmit: () => (values: CampaignDetailsFormInputs) => Promise<void>;
  onCampaignDescriptionSave: () => (description: string) => Promise<void>;
  onCampaignMemberSubmit: () => (values: CampaignTeamInputValues[]) => Promise<void>;
  onCampaignMemberRemove: () => (values: CampaignTeamInputValues) => Promise<void>;
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
