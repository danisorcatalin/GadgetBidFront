import { UserOutputSingleDto } from 'types/user';

export const userDataMock: Partial<UserOutputSingleDto> = {
  id: 4,
  firstName: 'Investor',
  lastName: 'GadgetBid',
  email: 'investor@gadgetbid.com',
  phone: '+40722222222',
  address: null,
  personalNumber: null,
  country: null,
  dateOfBirth: null,
  active: true,
  role: 'INVESTOR',
  onboard: {
    id: 1,
    files: [],
    status: 'OPEN',
  },
  accountManager: {
    id: 2,
    firstName: 'Account Manager',
    lastName: 'GadgetBid',
  },
  companies: [],
  campaigns: null,
  investments: null,
  kycCompleted: false,
  questionsCompleted: false,
  verified: true,
  walletId: null,
};
