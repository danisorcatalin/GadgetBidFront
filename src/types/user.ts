import { Components } from '../lib/GadgetClientJava';

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  ACCOUNT_MANAGER = 'ACCOUNT_MANAGER',
  ISSUER = 'ISSUER',
  INVESTOR = 'INVESTOR',
}

export enum RegisterUserRoleEnum {
  ISSUER = 'ISSUER',
  INVESTOR = 'INVESTOR',
}

// export enum InvestorOnboardStatusEnum {
//   OPEN = 'OPEN',
//   REGISTERED = 'REGISTERED',
//   APPROVED = 'APPROVED',
//   NOT_VERIFIED = 'NOT_VERIFIED',
//   VERIFIED = 'VERIFIED',
//   KYC_KYB_AML = 'KYC_KYB_AML',
//   KYC_KYB_AML_OK = 'KYC_KYB_AML_OK',
//   REJECTED = 'REJECTED',
//   NOT_ELIGIBLE = 'NOT_ELIGIBLE',
//   AGREEMENT_SENT = 'AGREEMENT_SENT',
//   AGREEMENT_SIGNED = 'AGREEMENT_SIGNED',
//   SPV_SENT = 'SPV_SENT',
//   SPV_SIGNED = 'SPV_SIGNED',
//   FUNDS_REQUEST = 'FUNDS_REQUEST',
//   FUNDS_RECEIVED = 'FUNDS_RECEIVED',
//   TOKENIZATION = 'TOKENIZATION',
//   DONE = 'DONE',
// }

export enum InvestorOnboardStatusEnum {
  OPEN = 'OPEN',
  REGISTERED = 'REGISTERED',
  NOT_VERIFIED = 'NOT_VERIFIED',
  VERIFIED = 'VERIFIED',
  NOT_ELIGIBLE = 'NOT_ELIGIBLE',
}

export enum IssuerOnboardStatusEnum {
  OPEN = 'OPEN',
  REGISTERED = 'REGISTERED',
  NOT_VERIFIED = 'NOT_VERIFIED',
  VERIFIED = 'VERIFIED',
  KYC_KYB_AML = 'KYC_KYB_AML',
  REJECTED = 'REJECTED',
  KYC_KYB_AML_OK = 'KYC_KYB_AML_OK',
}

export enum InvestorInvestmentFileTypeEnum {
  INVESTMENT_AGREEMENT = 'INVESTMENT_AGREEMENT',
  SPV_AGREEMENT = 'SPV_AGREEMENT',
  PROOF_OF_PAYMENT = 'PROOF_OF_PAYMENT',
}

export enum InvestorOnboardFileTypeEnum {
  IDENTITY = 'IDENTITY', // vine de la verif kyc
  CONTRACT = 'CONTRACT',
}

export interface User {
  email: string;
  exp: number;
  firstName: string;
  iat: string;
  id: number;
  lastName: string;
  isSecondFactorAuthenticated: boolean;
  role: UserRole;
  twoFactorActivated: number;
  status: InvestorOnboardStatus | IssuerOnboardStatus;
  // ---
  [key: string]: unknown;
}
export type UserOnboardOutputDto = Components.Schemas.UserOnboardOutputDto;
export type SimpleUserOnboardDto = Components.Schemas.SimpleUserOnboardDto;
export type SimplePersonDto = Components.Schemas.SimplePersonDto;
export type SimpleUserDto = Components.Schemas.SimpleUserDto;
export type UserOutputSingleDto = Components.Schemas.UserOutputSingleDto;
export type UserUpdateDto = Components.Schemas.UserUpdateDto;
export type UserWalletDto = Components.Schemas.UserWalletDto;

export type UserOutputDto = Components.Schemas.UserOutputDto;
export type UserOnboardFileType = Components.Schemas.UserOnboardFileType;
export type UserOnboardFile = Components.Schemas.UserOnboardFileOutputDto;
export type UserOnboard = Components.Schemas.UserOnboardOutputDto;
export type UserQuestionDto = Components.Schemas.UserQuestionDto;
export type UserAnswerInputDto = Components.Schemas.UserAnswerInputDto;
export type UserAnswerInputArrayDto = Components.Schemas.UserAnswerInputArrayDto;
export type UserRole = Components.Schemas.UserRole;
export type RegisteredUserRole = Extract<UserRole, 'ISSUER' | 'INVESTOR'>;
export type UserOnboardStatus = UserOnboard['status'];

export type UserKycDto = Components.Schemas.UserKycDto;
export type UserKycFile = Components.Schemas.UserKycFileDto;
export type UserKycFileType = Components.Schemas.UserKycFileType;

export type IssuerOnboardStatus = Extract<
  UserOnboardStatus,
  | 'OPEN'
  | 'REGISTERED'
  | 'NOT_VERIFIED'
  | 'VERIFIED'
  | 'KYC_KYB_AML'
  | 'REJECTED'
  | 'KYC_KYB_AML_OK'
>;
export type IssuerOnboardFileType = Extract<UserOnboardFileType, 'IDENTITY' | 'CONTRACT'>;

export type InvestorOnboardStatus = Extract<
  UserOnboardStatus,
  'OPEN' | 'REGISTERED' | 'NOT_VERIFIED' | 'NOT_ELIGIBLE' | 'VERIFIED'
>;

export type InvestorInvestmentFileType = Extract<
  UserOnboardFileType,
  'INVESTMENT_AGREEMENT' | 'SPV_AGREEMENT' | 'PROOF_OF_PAYMENT'
>;

export type InvestorOnboardFileType = Extract<UserOnboardFileType, 'IDENTITY' | 'CONTRACT'>;
