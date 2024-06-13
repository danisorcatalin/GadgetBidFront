import type { NewCampaign } from 'types/campaign';
import { campaignMembersMock } from './campaignMembers';
import { companyDataMock } from './companyData';

export const campaignDataMock: NewCampaign = {
  id: 1,
  user: null,
  accountManager: null,
  shortDescription: 'Short description',
  description: 'Description',
  risk: 'Risk',
  category: null,
  currency: 'USD',
  qa: 'QA',
  videoPresentation: 'https://www.youtube.com/watch?v=33g8tdUAU4w',
  location: 'Romania',
  startDate: '2021-07-09T12:07:38.000Z',
  endDate: '2022-07-09T12:07:38.000Z',
  amountToRaise: 1337,
  maximumAmountToRaise: 7331,
  amountRaised: 666,
  status: 'IN_PROGRESS',
  company: companyDataMock,
  tokenValue: 10,
  equity: '50',
  valuation: 50,
  maximumTicketsPerInvestor: 200,
  presubscribedUser: false,
};
