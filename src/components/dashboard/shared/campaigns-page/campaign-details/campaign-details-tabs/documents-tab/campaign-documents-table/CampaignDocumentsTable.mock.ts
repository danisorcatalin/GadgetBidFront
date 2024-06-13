import { campaignDataMock, useAuthHook } from 'mocks';
import type { CampaignDocumentsTableProps } from './CampaignDocumentsTable';

export const mockCampaignDocumentsTableProps: CampaignDocumentsTableProps = {
  campaignData: campaignDataMock,
  campaignFiles: [],
  readonly: true,
  viewonly: true,
  useAuthHook,
};
