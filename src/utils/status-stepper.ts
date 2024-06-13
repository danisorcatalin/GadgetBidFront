import { InvestmentStatus } from 'types/investment';
import { CampaignStatus } from 'types/campaign';
import { UserOnboardStatus } from 'types/user';

export type InvestmentStatusString =
  | 'investments.stepperStatus.new'
  | 'investments.stepperStatus.agreementSentSigned'
  | 'investments.stepperStatus.spvSentSigned'
  | 'investments.stepperStatus.fundsRequestReceived'
  | 'investments.stepperStatus.ageaSentSigned'
  | 'investments.stepperStatus.tokenization'
  | 'investments.stepperStatus.done';

export type CampaignStatusString =
  | 'campaign.stepperStatus.stepOne'
  | 'campaign.stepperStatus.stepTwo'
  | 'campaign.stepperStatus.stepThree'
  | 'campaign.stepperStatus.stepFour'
  | 'campaign.stepperStatus.stepFive'
  | 'campaign.stepperStatus.stepSix';

export type IssuerStepperStatus =
  | 'issuer.stepperStatus.stepOne'
  | 'issuer.stepperStatus.stepTwo'
  | 'issuer.stepperStatus.stepThreeDone'
  | 'issuer.stepperStatus.stepThreeFail';

export const investmentStepperStatuses: InvestmentStatusString[] = [
  'investments.stepperStatus.new',
  'investments.stepperStatus.agreementSentSigned',
  'investments.stepperStatus.spvSentSigned',
  'investments.stepperStatus.fundsRequestReceived',
  'investments.stepperStatus.ageaSentSigned',
  'investments.stepperStatus.tokenization',
  'investments.stepperStatus.done',
];

export const issuerStepperStatusesSuccess: IssuerStepperStatus[] = [
  'issuer.stepperStatus.stepOne',
  'issuer.stepperStatus.stepTwo',
  'issuer.stepperStatus.stepThreeDone',
];

export const issuerStepperStatusesFail: IssuerStepperStatus[] = [
  'issuer.stepperStatus.stepOne',
  'issuer.stepperStatus.stepTwo',
  'issuer.stepperStatus.stepThreeFail',
];

export const campaignStepperStatuses: CampaignStatusString[] = [
  'campaign.stepperStatus.stepOne',
  'campaign.stepperStatus.stepTwo',
  'campaign.stepperStatus.stepThree',
  'campaign.stepperStatus.stepFour',
  'campaign.stepperStatus.stepFive',
  'campaign.stepperStatus.stepSix',
];

export const getInvestmentStepperStatusString = (
  status: InvestmentStatus
): InvestmentStatusString => {
  let currentStatus: InvestmentStatusString = 'investments.stepperStatus.new';
  switch (status) {
    case 'NEW':
    case 'VERIFIED':
    case 'NOT_ELIGIBLE':
      currentStatus = 'investments.stepperStatus.new';
      break;
    case 'AGREEMENT_SENT':
    case 'AGREEMENT_SIGNED':
      currentStatus = 'investments.stepperStatus.agreementSentSigned';
      break;
    case 'SPV_SENT':
    case 'SPV_SIGNED':
      currentStatus = 'investments.stepperStatus.spvSentSigned';
      break;
    case 'FUNDS_RECEIVED':
    case 'FUNDS_REQUEST':
      currentStatus = 'investments.stepperStatus.fundsRequestReceived';
      break;
    case 'AGEA_SENT':
    case 'AGEA_SIGNED':
      currentStatus = 'investments.stepperStatus.ageaSentSigned';
      break;
    case 'TOKENIZATION':
      currentStatus = 'investments.stepperStatus.tokenization';
      break;
    case 'DONE':
      currentStatus = 'investments.stepperStatus.done';
      break;
    default:
      break;
  }
  return currentStatus;
};

export const getIssuerStatusString = (status: UserOnboardStatus): IssuerStepperStatus => {
  let currentStatus: IssuerStepperStatus = 'issuer.stepperStatus.stepOne';
  switch (status) {
    case 'OPEN':
    case 'REGISTERED':
    case 'NOT_VERIFIED':
    case 'VERIFIED':
      currentStatus = 'issuer.stepperStatus.stepOne';
      break;
    case 'KYC_KYB_AML':
      currentStatus = 'issuer.stepperStatus.stepTwo';
      break;
    case 'KYC_KYB_AML_OK':
      currentStatus = 'issuer.stepperStatus.stepThreeDone';
      break;
    case 'REJECTED':
    case 'NOT_ELIGIBLE':
      currentStatus = 'issuer.stepperStatus.stepThreeFail';
      break;
    default:
      break;
  }
  return currentStatus;
};

export const getCampaignStepperStatusString = (status: CampaignStatus): CampaignStatusString => {
  let currentStatus: CampaignStatusString = 'campaign.stepperStatus.stepOne';
  switch (status) {
    case 'IN_PROGRESS':
    case 'READY':
      currentStatus = 'campaign.stepperStatus.stepOne';
      break;
    case 'AUDIT':
    case 'AUDIT_DONE':
      currentStatus = 'campaign.stepperStatus.stepTwo';
      break;
    case 'LISTED':
      currentStatus = 'campaign.stepperStatus.stepThree';
      break;
    case 'FINISHED':
      currentStatus = 'campaign.stepperStatus.stepFour';
      break;
    case 'TOKENIZATION':
      currentStatus = 'campaign.stepperStatus.stepFive';
      break;
    case 'DONE':
      currentStatus = 'campaign.stepperStatus.stepSix';
      break;
    default:
      break;
  }
  return currentStatus;
};
