import type { Components as JavaComponents } from 'lib/GadgetClientJava';

export type CompanyDto = JavaComponents.Schemas.CompanyDto;
export type Company = JavaComponents.Schemas.CompanyDto;
export type CompanyMember = JavaComponents.Schemas.CompanyMemberDto;
export type SimpleCompany = JavaComponents.Schemas.SimpleCompanyDto;
export type CompanyLegalFormType = 'SRL' | 'SA';

export enum CompanyMemberType {
  LEGAL_REPRESENTATIVE = 'LEGAL_REPRESENTATIVE',
  SHAREHOLDER = 'SHAREHOLDER',
}

export enum CompanyFileType {
  TRADE_REGISTRY_CERTIFICATE = 'TRADE_REGISTRY_CERTIFICATE',
  LOGO = 'LOGO',
  PITCH_DECK = 'PITCH_DECK',
  BUSINESS_PLAN = 'BUSINESS_PLAN',
  INCORPORATION_DOCUMENT = 'INCORPORATION_DOCUMENT',
  CERTIFICATE_OF_STATUS = 'CERTIFICATE_OF_STATUS',
}

export type CompanyDetailsFormInputs = {
  name: string;
  cui: string;
  fui: string;
  website: string;
  euid: string;
  bankName: string;
  iban: string;
  address: string;
  city: string;
  country: string;
  legalForm: CompanyLegalFormType;
  submit: boolean;
};
