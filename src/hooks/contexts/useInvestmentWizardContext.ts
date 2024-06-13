import { createContext, useContext } from 'react';
import { Campaign } from 'types/campaign';
import { UserOutputDto, UserQuestionDto } from 'types/user';

export interface IInvestmentWizardContext {
  saveInvestment: () => (tokenAmount: number) => Promise<void>;
  updateInvestment: () => (investmentId: number, tokenAmount: number) => Promise<void>;
  kycRedirectUrl: string;
  investmentSaved: boolean;
  userData: UserOutputDto;
  campaignData: Campaign;
  investmentQuestions: UserQuestionDto[];
}

const initial = {} as IInvestmentWizardContext;
export const InvestmentWizardContext = createContext<IInvestmentWizardContext>(initial);
export const useInvestmentWizardContext = (): IInvestmentWizardContext =>
  useContext<IInvestmentWizardContext>(InvestmentWizardContext);
