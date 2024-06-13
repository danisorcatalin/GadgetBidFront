import { Investment } from 'types/investment';
import { campaignDataMock } from './campaignData';

export const investmentDataMock: Investment = {
  id: 1,
  accountManager: null,
  user: null,
  campaign: campaignDataMock,
  tokenAmount: 10,
  status: 'NEW',
  createdAt: '2021-08-03T11:44:30.001Z',
  updatedAt: '2021-08-03T11:44:30.001Z',
  investmentFiles: [],
  transferedHash: null,
};
