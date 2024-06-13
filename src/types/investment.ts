import { Components } from '../lib/GadgetClientJava';

export type NewInvestmentDto = Components.Schemas.NewInvestmentDto;
export type SimpleInvestmentDto = Components.Schemas.SimpleInvestmentDto;
export type Investment = Components.Schemas.InvestmentDto;
export type InvestmentFile = Components.Schemas.InvestmentFileDto;
export type InvestmentFileType = Components.Schemas.InvestmentFileType;
export type InvestmentStatus = Components.Schemas.InvestmentStatus;

export enum InvestorInvestmentStatusEnum {
  NEW = 'NEW',
  AGREEMENT_SENT = 'AGREEMENT_SENT',
  AGREEMENT_SIGNED = 'AGREEMENT_SIGNED',
  SPV_SENT = 'SPV_SENT',
  SPV_SIGNED = 'SPV_SIGNED',
  FUNDS_REQUEST = 'FUNDS_REQUEST',
  FUNDS_RECEIVED = 'FUNDS_RECEIVED',
  AGEA_SENT = 'AGEA_SENT',
  AGEA_SIGNED = 'AGEA_SIGNED',
  TOKENIZATION = 'TOKENIZATION',
  DONE = 'DONE',
}
