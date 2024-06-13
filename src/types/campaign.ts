import type { Components } from '../lib/GadgetClientJava';

export type InvestmentCampaignDto = Components.Schemas.InvestmentCampaignDto;
export type SimpleCampaignDto = Components.Schemas.SimpleCampaignDto;
export type NewCampaign = Components.Schemas.NewCampaignDto;
export type Campaign = Components.Schemas.CampaignDto;
export type CampaignUpdateDto = Components.Schemas.CampaignUpdateDto;

export type CampaignFile = Components.Schemas.CampaignFileDto;
export type CampaignMember = Components.Schemas.CampaignMemberDto;
export type CampaignCategory = Components.Schemas.CampaignCategory;
export type CampaignCurrency = Components.Schemas.CampaignCurrency;

export enum CampaignFileType {
  BUSINESS_PLAN = 'BUSINESS_PLAN',
  EXECUTIVE_SUMMARY = 'EXECUTIVE_SUMMARY',
  PITCH = 'PITCH',
  MATERIAL_RISK_MANAGEMENT = 'MATERIAL_RISK_MANAGEMENT',
  FINANCIAL_STATEMENT = 'FINANCIAL_STATEMENT',
  LAST_3_YEARS_FINANCIAL_STATEMENT = 'LAST_3_YEARS_FINANCIAL_STATEMENT',
}

export enum CampaignPresentationFileType {
  COVER = 'COVER',
  LOGO = 'LOGO',
}

export enum CampaignStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  AUDIT = 'AUDIT',
  AUDIT_DONE = 'AUDIT_DONE',
  LISTED = 'LISTED',
  FINISHED = 'FINISHED',
  TOKENIZATION = 'TOKENIZATION',
  DONE = 'DONE',
}

export type CampaignStatus = Campaign['status'];
