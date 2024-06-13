import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnect from '@walletconnect/client';
import { Button, Box, Typography } from '@mui/material';
import { useState, useEffect, useCallback, useRef } from 'react';

import gtm from '../../../../../../../lib/gtm';
import type IWalletConnect from '@walletconnect/client';
import type { FC } from 'react';
import { GTM_EVENTS } from '../../../../../../../constants';
import { useInvestorProfileContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';
import { GadgetInput } from 'ui/gadget/GadgetInput';

export interface WalletQrCodeProps {
  userWalletId: string | undefined;
  useAuthHook?: unknown;
  saveWalletId?: (id: string) => Promise<void>;
  removeWalletId?: () => Promise<void>;
  isAdmin?: boolean;
}

export const WalletQrCode: FC<WalletQrCodeProps> = (props: WalletQrCodeProps): JSX.Element => {
  const { userWalletId, isAdmin } = props;
  const walletIdInit = useRef(false);
  const [connector, setConnector] = useState<IWalletConnect | undefined>();
  const [walletId, setWalletId] = useState<string | undefined>(userWalletId);
  const [error, setError] = useState<boolean>(false);
  const { saveWalletId, removeWalletId } = useInvestorProfileContext();

  const subscribeToEvents = useCallback(() => {
    if (!connector) return;

    connector.on('connect', (error, payload) => {
      if (error) {
        setError(true);
        console.error(error);
        return;
      }

      let params = payload?.params;
      if (!params.length) {
        setError(true);
        console.error('No params for walletconnect');
        return;
      }

      params = params[0];
      if (params?.accounts?.length) {
        walletIdInit.current = true;
        setWalletId(params.accounts[0]);
      } else {
        setError(true);
        console.error('No accounts for walletconnect');
        return;
      }
    });

    connector.on('disconnect', () => {
      console.log('Wallet disconnected');
      saveWalletId()(null);
      setWalletId(null);
    });
  }, [connector]);

  useEffect(() => {
    if (!connector) return;
    subscribeToEvents();
  }, [connector]);

  useEffect(() => {
    setWalletId(userWalletId);
  }, [userWalletId]);

  useEffect(() => {
    if (!walletId || !walletIdInit.current) return;
    saveWalletId()(walletId);
    localStorage.removeItem('walletconnect');
  }, [walletId]);

  useEffect(() => {
    localStorage.removeItem('walletconnect');
  }, []);

  const walletConnectInit = async () => {
    gtm.push({ event: GTM_EVENTS.INVESTOR_WALLET_CONNECT_CLICK });
    const bridge = 'https://bridge.walletconnect.org';
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    if (!connector.connected) {
      await connector.createSession();
    }
    setConnector(connector);
  };
  const { t } = useTranslation();

  return (
    <Box>
      {walletId ? (
        <>
          <Typography variant="h6" sx={{ mb: 4 }} color="textSecondary">
            {t('investorDigitalWallet.QRCode.wellDone')}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            {t('investorDigitalWallet.QRCode.yourWalletID')}
          </Typography>
          <GadgetInput fullWidth={true} value={walletId} style={{ marginTop: '20px' }} />
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={removeWalletId()}
            sx={{ mt: 3, fontSize: '24px' }}
            fullWidth={true}
            disabled={isAdmin}
          >
            {t('investorDigitalWallet.QRCode.disconnect')}
          </Button>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="h5" color="textPrimary">
              {t('investorDigitalWallet.QRCode.connectToWallet')}
            </Typography>
            <Typography sx={{ mt: 2 }} variant="body1" color="textPrimary">
              {t('investorDigitalWallet.QRCode.spvCreation')}
            </Typography>
            <Typography sx={{ mt: 2 }} variant="body1" color="textPrimary">
              {t('investorDigitalWallet.QRCode.allYouHaveToDo')}
            </Typography>
            <Typography sx={{ mt: 2 }} variant="body1" color="textPrimary">
              {t('investorDigitalWallet.QRCode.step1')}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {t('investorDigitalWallet.QRCode.step2')}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {t('investorDigitalWallet.QRCode.step3')}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {t('investorDigitalWallet.QRCode.step4')}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {t('investorDigitalWallet.QRCode.step5')}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {t('investorDigitalWallet.QRCode.step6')}
            </Typography>
          </Box>
          <Button
            color="primary"
            size="large"
            variant="contained"
            fullWidth={true}
            onClick={walletConnectInit}
            sx={{ mt: 3, fontSize: '24px' }}
            disabled={isAdmin}
          >
            {t('investorDigitalWallet.QRCode.connect')}
          </Button>
        </>
      )}
      {error && (
        <Typography variant="h5" color="error">
          {t('investorDigitalWallet.QRCode.anErrorOccured')}
        </Typography>
      )}
    </Box>
  );
};
