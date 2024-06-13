import { Theme } from '@mui/material/styles';
import {
  InvestorOnboardStatus,
  InvestorOnboardStatusEnum,
  IssuerOnboardStatus,
  IssuerOnboardStatusEnum,
} from '../types/user';
import { colors } from 'theme';

import { CampaignStatus, CampaignStatusEnum } from 'types/campaign';
import { InvestmentStatus, InvestorInvestmentStatusEnum } from 'types/investment';

export const getStatusColor = (status: string): string => {
  const colorsMap = {
    OPEN: colors.label.blue,
    REGISTERED: colors.label.blue,
    NOT_VERIFIED: colors.label.yellow,
    VERIFIED: colors.label.green,
    KYC_KYB_AML_OK: colors.label.green,
    REJECTED: colors.label.red,
    NOT_ELIGIBLE: colors.label.red,
    ACCEPTED: colors.label.blue,
    HIDDEN: colors.label.yellow,
    IN_PROGRESS: colors.label.blue,
    READY: colors.label.blue,
    AUDIT: colors.label.blue,
    AUDIT_DONE: colors.label.blue,
    LISTED: colors.label.green,
    FINISHED: colors.label.green,
    TOKENIZATION: colors.label.green,
    DONE: colors.label.blue,

    NEW: colors.label.blue,
    AGREEMENT_SENT: colors.label.yellow,
    AGREEMENT_SIGNED: colors.label.green,
    SPV_SENT: colors.label.yellow,
    SPV_SIGNED: colors.label.green,
    FUNDS_REQUEST: colors.label.yellow,
    FUNDS_RECEIVED: colors.label.green,
    AGEA_SENT: colors.label.yellow,
    AGEA_SIGNED: colors.label.green,
  };
  return colorsMap[status] || colors.label.blue;
};

const autoInvestorOnboardStatusOrder: InvestorOnboardStatus[] = [
  InvestorOnboardStatusEnum.OPEN,
  InvestorOnboardStatusEnum.REGISTERED,
  InvestorOnboardStatusEnum.NOT_VERIFIED,
];

export const getInvestorOnboardStatusOrder = (kycCompleted: boolean): InvestorOnboardStatus[] => {
  const order = [...autoInvestorOnboardStatusOrder];
  if (kycCompleted) {
    order.push('VERIFIED');
  } else {
    order.push('NOT_ELIGIBLE');
  }
  return order;
};

export const getNextInvestorOnboardStatus = (
  kycCompleted: boolean,
  currentStatus: InvestorOnboardStatus
): {
  next: IOnboardStatus<InvestorOnboardStatus> | undefined;
  prev: IOnboardStatus<InvestorOnboardStatus> | undefined;
} => {
  const order = getInvestorOnboardStatusOrder(kycCompleted);
  const currentStatusIndex = order.findIndex((status) => status === currentStatus);
  const getOrderValidation = (
    currentStatus: InvestorOnboardStatus
  ): IStatusOrderValidation<InvestorOnboardStatus> => {
    const validations: IStatusOrderValidation<InvestorOnboardStatus>[] = [
      { status: 'OPEN', nextDisabled: true, prevDisabled: true },
      { status: 'REGISTERED', nextDisabled: true, prevDisabled: true },
      { status: 'NOT_VERIFIED', nextDisabled: false, prevDisabled: true },
      { status: 'NOT_ELIGIBLE', nextDisabled: true, prevDisabled: true },
      { status: 'VERIFIED', nextDisabled: true, prevDisabled: true },
    ];
    return validations.find((validation) => validation.status === currentStatus);
  };
  const { nextDisabled, prevDisabled } = getOrderValidation(currentStatus) || {};
  return {
    next: { status: order[currentStatusIndex + 1], disabled: nextDisabled },
    prev: { status: order[currentStatusIndex - 1], disabled: prevDisabled },
  };
};

// export const getInvestorStatusColor = (status: UserOnboardStatus, theme: Theme): string => {
//   const colors = {
//     OPEN: theme.palette.primary.main,
//     REGISTERED: theme.palette.primary.main,
//     NOT_VERIFIED: theme.palette.primary.main,
//     VERIFIED: theme.palette.success.main,
//     NOT_ELIGIBLE: theme.palette.error.main,
//   };
//   return colors[status] || theme.palette.primary.main;
// };

const autoIssuerOnboardStatusOrder: IssuerOnboardStatus[] = [
  IssuerOnboardStatusEnum.OPEN,
  IssuerOnboardStatusEnum.NOT_VERIFIED,
];

export const getIssuerOnboardStatusOrder = (kycCompleted: boolean): IssuerOnboardStatus[] => {
  const order = [
    ...autoIssuerOnboardStatusOrder,
    IssuerOnboardStatusEnum.VERIFIED,
    IssuerOnboardStatusEnum.KYC_KYB_AML,
  ];
  if (kycCompleted) {
    order.push(IssuerOnboardStatusEnum.KYC_KYB_AML_OK);
  } else {
    order.push(IssuerOnboardStatusEnum.REJECTED);
  }
  return order;
};

export interface IOnboardStatus<T> {
  status: T;
  disabled: boolean;
}

export const getNextIssuerOnboardStatus = (
  kycCompleted: boolean,
  currentStatus: IssuerOnboardStatus
): {
  next: IOnboardStatus<IssuerOnboardStatus> | undefined;
  prev: IOnboardStatus<IssuerOnboardStatus> | undefined;
} => {
  const order = getIssuerOnboardStatusOrder(kycCompleted);
  const currentStatusIndex = order.findIndex((status) => status === currentStatus);
  if (currentStatusIndex === -1)
    return {
      next: undefined,
      prev: undefined,
    };
  const getOrderValidation = (
    currentStatus: IssuerOnboardStatus
  ): IStatusOrderValidation<IssuerOnboardStatus> => {
    const validations: IStatusOrderValidation<IssuerOnboardStatus>[] = [
      { status: 'OPEN', nextDisabled: true, prevDisabled: true },
      { status: 'NOT_VERIFIED', nextDisabled: false, prevDisabled: true },
      { status: 'VERIFIED', nextDisabled: false, prevDisabled: true },
      { status: 'KYC_KYB_AML', nextDisabled: true, prevDisabled: true },
      { status: 'REJECTED', nextDisabled: false, prevDisabled: false },
      { status: 'KYC_KYB_AML_OK', nextDisabled: false, prevDisabled: false },
    ];
    return validations.find((validation) => validation.status === currentStatus);
  };
  const { nextDisabled, prevDisabled } = getOrderValidation(currentStatus);

  return {
    next: { status: order[currentStatusIndex + 1], disabled: nextDisabled },
    prev: { status: order[currentStatusIndex - 1], disabled: prevDisabled },
  };
};

export const getCampaignStatusOrder = (listingTemplateOk: number): CampaignStatus[] => {
  let order = [CampaignStatusEnum.IN_PROGRESS, CampaignStatusEnum.READY];
  if (listingTemplateOk) {
    order = [
      ...order,
      CampaignStatusEnum.AUDIT,
      CampaignStatusEnum.AUDIT_DONE,
      CampaignStatusEnum.LISTED,
      CampaignStatusEnum.FINISHED,
      CampaignStatusEnum.TOKENIZATION,
      CampaignStatusEnum.DONE,
    ];
  } else {
    // order.push(CampaignStatusEnum.IN_PROGRESS);
  }
  return order;
};

interface IStatusOrderValidation<T> {
  status: T;
  nextDisabled: boolean;
  prevDisabled: boolean;
}

export const getNextCampaignStatus = (
  islistingTemplateOk: number,
  currentStatus: CampaignStatus
): {
  next: IOnboardStatus<CampaignStatus> | undefined;
  prev: IOnboardStatus<CampaignStatus> | undefined;
} => {
  const order = getCampaignStatusOrder(islistingTemplateOk);
  const currentStatusIndex = order.findIndex((status) => status === currentStatus);
  if (currentStatusIndex === -1)
    return {
      next: undefined,
      prev: undefined,
    };
  const getOrderValidation = (
    currentStatus: CampaignStatus
  ): IStatusOrderValidation<CampaignStatus> => {
    const validations: IStatusOrderValidation<CampaignStatus>[] = [
      { status: 'IN_PROGRESS', nextDisabled: true, prevDisabled: true },
      { status: 'READY', nextDisabled: true, prevDisabled: true },
      { status: 'AUDIT', nextDisabled: false, prevDisabled: true },
      { status: 'AUDIT_DONE', nextDisabled: false, prevDisabled: false },
      { status: 'LISTED', nextDisabled: true, prevDisabled: true },
      { status: 'FINISHED', nextDisabled: false, prevDisabled: true },
      { status: 'TOKENIZATION', nextDisabled: false, prevDisabled: true },
      { status: 'DONE', nextDisabled: true, prevDisabled: true },
    ];
    return validations.find((validation) => validation.status === currentStatus);
  };
  const { nextDisabled, prevDisabled } = getOrderValidation(currentStatus);
  return {
    next: { status: order[currentStatusIndex + 1], disabled: nextDisabled },
    prev: { status: order[currentStatusIndex - 1], disabled: prevDisabled },
  };
};

export const getIssuerStatusColor = (status: IssuerOnboardStatus, theme: Theme): string => {
  const colors = {
    OPEN: theme.palette.primary.main,
    NOT_VERIFIED: theme.palette.primary.main,
    VERIFIED: theme.palette.success.main,
    KYC_KYB_AML_OK: theme.palette.success.main,
    REJECTED: theme.palette.error.main,
  };
  return colors[status] || theme.palette.primary.main;
};

// export const getNewsFeedStatusColor = (
//   status: NewsFeedStatusEnum | string,
//   theme: Theme
// ): string => {
//   const colors = {
//     ACCEPTED: theme.palette.primary.main,
//     HIDDEN: theme.palette.primary.main,
//   };
//   return colors[status] || theme.palette.primary.main;
// };

export const getCampaignStatusColor = (status: CampaignStatus, theme: Theme): string => {
  const colors = {
    IN_PROGRESS: theme.palette.primary.main,
    READY: theme.palette.primary.main,
    AUDIT: theme.palette.primary.main,
    AUDIT_DONE: theme.palette.primary.main,
    LISTED: theme.palette.primary.main,
    FINISHED: theme.palette.primary.main,
    TOKENIZATION: theme.palette.primary.main,
    DONE: theme.palette.primary.main,
  };
  return colors[status] || theme.palette.primary.main;
};

// export const getUserStatusColor = (
//   userType: UserRole,
//   status: UserOnboardStatus,
//   theme: Theme
// ): string => {
//   let fn;
//   let typedStatus;
//   switch (userType) {
//     case 'ISSUER':
//       typedStatus = status as IssuerOnboardStatus;
//       fn = getIssuerStatusColor(typedStatus, theme);
//       break;
//     case 'INVESTOR':
//       typedStatus = status as InvestorOnboardStatus;
//       fn = getInvestorStatusColor(status, theme);
//       break;
//     default:
//       break;
//   }
//   return fn;
// };

const manualInvestmentStatusOrder: InvestmentStatus[] = [
  InvestorInvestmentStatusEnum.NEW,
  InvestorInvestmentStatusEnum.AGREEMENT_SENT,
  InvestorInvestmentStatusEnum.AGREEMENT_SIGNED,
  InvestorInvestmentStatusEnum.SPV_SENT,
  InvestorInvestmentStatusEnum.SPV_SIGNED,
  InvestorInvestmentStatusEnum.FUNDS_REQUEST,
  InvestorInvestmentStatusEnum.FUNDS_RECEIVED,
  InvestorInvestmentStatusEnum.AGEA_SENT,
  InvestorInvestmentStatusEnum.AGEA_SIGNED,
  InvestorInvestmentStatusEnum.TOKENIZATION,
  InvestorInvestmentStatusEnum.DONE,
];

export const getInvestmentStatusOrder = (): InvestmentStatus[] => {
  return manualInvestmentStatusOrder;
};

export const getNextInvestmentStatus = (
  currentStatus: InvestmentStatus
): {
  next: IOnboardStatus<InvestmentStatus> | undefined;
  prev: IOnboardStatus<InvestmentStatus> | undefined;
} => {
  const order = getInvestmentStatusOrder();
  const currentStatusIndex = order.findIndex((status) => status === currentStatus);
  const getOrderValidation = (
    currentStatus: InvestmentStatus
  ): IStatusOrderValidation<InvestmentStatus> => {
    const validations: IStatusOrderValidation<InvestmentStatus>[] = [
      { status: 'NEW', nextDisabled: false, prevDisabled: false },
      { status: 'AGREEMENT_SENT', nextDisabled: false, prevDisabled: false },
      { status: 'AGREEMENT_SIGNED', nextDisabled: false, prevDisabled: false },
      { status: 'SPV_SENT', nextDisabled: false, prevDisabled: false },
      { status: 'SPV_SIGNED', nextDisabled: false, prevDisabled: false },
      { status: 'FUNDS_REQUEST', nextDisabled: false, prevDisabled: false },
      { status: 'FUNDS_RECEIVED', nextDisabled: false, prevDisabled: false },
      { status: 'AGEA_SENT', nextDisabled: false, prevDisabled: false },
      { status: 'AGEA_SIGNED', nextDisabled: false, prevDisabled: false },
      { status: 'TOKENIZATION', nextDisabled: false, prevDisabled: true },
      { status: 'DONE', nextDisabled: true, prevDisabled: true },
    ];
    return validations.find((validation) => validation.status === currentStatus);
  };
  const { nextDisabled, prevDisabled } = getOrderValidation(currentStatus) || {};
  return {
    next: { status: order[currentStatusIndex + 1], disabled: nextDisabled },
    prev: { status: order[currentStatusIndex - 1], disabled: prevDisabled },
  };
};

// export const getInvestmentStatusColor = (status: InvestmentStatus, theme: Theme): string => {
//   const colors = {
//     CONFIRMED: theme.palette.primary.main,
//     AGREEMENT_SENT: theme.palette.primary.main,
//     AGREEMENT_SIGNED: theme.palette.primary.main,
//     SPV_SENT: theme.palette.primary.main,
//     SPV_SIGNED: theme.palette.primary.main,
//     FUNDS_REQUEST: theme.palette.primary.main,
//     FUNDS_RECEIVED: theme.palette.primary.main,
//     DONE: theme.palette.primary.main,
//   };
//   return colors[status] || theme.palette.primary.main;
// };

export const getListingTemplateOk = (status: CampaignStatus): boolean => {
  const notOk: CampaignStatus[] = ['IN_PROGRESS', 'READY'];
  if (notOk.includes(status)) {
    return false;
  }
  return true;
};

export const endedCampaignStatuses: CampaignStatus[] = ['FINISHED', 'TOKENIZATION', 'DONE'];
