import { Components } from 'lib/GadgetClientJava';
import { campaignDataMock } from 'mocks';

export const userInvestmentsDataMock: Components.Schemas.InvestmentDto[] = [
  {
    id: 0,
    user: null,
    accountManager: null,
    campaign: campaignDataMock,
    tokenAmount: 4,
    status: 'NEW',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    investmentFiles: [],
    transferedHash: null,
  },
  {
    id: 1,
    user: null,
    accountManager: null,
    campaign: campaignDataMock,
    tokenAmount: 5,
    status: 'NEW',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    investmentFiles: [],
    transferedHash: null,
  },
  {
    id: 2,
    user: null,
    accountManager: null,
    campaign: campaignDataMock,
    tokenAmount: 3,
    status: 'NEW',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    investmentFiles: [],
    transferedHash: null,
  },
];
