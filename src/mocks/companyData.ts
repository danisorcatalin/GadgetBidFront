import type { Company } from 'types/company';
import { companyMembers } from './companyMembers';

export const companyDataMock: Company = {
  id: 1,
  name: 'ACME',
  registrationName: 'A Company That Makes Everything',
  address: 'str. Rozei, nr. 3',
  city: 'Bucharest',
  country: 'Romania',
  companyMembers,
  companyFiles: [],
  cui: '55555',
  fui: '888888',
  website: 'https://www.google.com/',
  euid: '623456',
  bankName: 'BRD',
  iban: 'ROBRD345678901234567890123456789',
  legalForm: 'SRL',
};
