
import { useContext, createContext } from 'react';
import { UploadDocument } from 'types/document';
import { InvestorOnboardFileType } from 'types/user';

export interface IInvestorProfileContext {
  uploadInvestorDocument: () => UploadDocument<InvestorOnboardFileType>;
  saveWalletId: () => (walletId: string) => Promise<void>;
  removeWalletId: () => () => Promise<void>;
}
const initial = {} as IInvestorProfileContext;
export const InvestorProfileContext = createContext<IInvestorProfileContext>(initial);
export const useInvestorProfileContext = (): IInvestorProfileContext =>
  useContext<IInvestorProfileContext>(InvestorProfileContext);
