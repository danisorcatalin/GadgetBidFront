import { WalletQrCode } from './wallet-qr-code/WalletQrCode';

import type { FC } from 'react';
import type { UserOutputSingleDto } from 'types/user';

export interface InvestorDigitalWalletTabProps {
  userData: Partial<UserOutputSingleDto>;
  saveWalletId?: (id: string) => Promise<void>;
  removeWalletId?: () => Promise<void>;
  isAdmin?: boolean;
}

export const InvestorDigitalWalletTab: FC<InvestorDigitalWalletTabProps> = (
  props: InvestorDigitalWalletTabProps
): JSX.Element => {
  const { userData, isAdmin } = props;
  const { walletId } = userData;
  return <WalletQrCode userWalletId={walletId} isAdmin={isAdmin} />;
};
