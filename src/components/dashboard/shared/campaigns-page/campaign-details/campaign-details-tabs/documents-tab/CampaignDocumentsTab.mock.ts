import { campaignDataMock, useAuthHook } from 'mocks';
import type { CampaignDocumentsTabProps } from './CampaignDocumentsTab';

export const mockCampaignDocumentsTabProps: CampaignDocumentsTabProps = {
  campaignData: campaignDataMock,
  campaignFiles: [],
  readonly: true,
  useAuthHook,
};
