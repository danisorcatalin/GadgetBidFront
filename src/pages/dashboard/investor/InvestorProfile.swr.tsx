import { updateUserById, uploadOnboardDocument, useGetUserById, useGetUserOnboardById } from 'api';
import { useAuth } from 'hooks';
import { withErrorSuspense } from 'utils/withErrorSuspense';
import { InvestorProfile } from 'components/dashboard/shared/investor-profile/InvestorProfile';
import { InvestorDetailsFormInputValues } from 'components/dashboard/shared/investor-profile/investor-details-tabs/investor-general-information-tab/investor-details-form';
import { mutate } from 'swr';
import { SwrKeys } from 'swrKeys';
import {
  InvestorInformationUpdateFail,
  InvestorInformationUpdateSuccess,
  WalletQrCodeFail,
  WalletQrCodeRemoveFail,
  WalletQrCodeRemoveSuccess,
  WalletQrCodeSuccess,
} from 'snacks';
import { useSnackbar } from 'notistack';
import { UploadDocument } from 'types/document';
import { InvestorOnboardFileType } from 'types/user';
import { IInvestorProfileContext, InvestorProfileContext } from 'hooks/contexts';
import { FC, useCallback, useEffect, useRef } from 'react';
import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import { useGetUserInvestmentsByUserId } from 'api/hooks/useGetUserInvestmentsByUserId';
import { updateUserWalletId } from 'api/updateUserWalletId';
import { useGetUserKycFiles } from 'api/hooks/useGetUserKycFiles';

const InvestorProfilePage = () => {
  const {
    user: { id: currentUserId },
  } = useAuth();
  const { data: userData } = useGetUserById(currentUserId);
  const { data: onboard } = useGetUserOnboardById(userData.onboard.id);
  const { data: userKycFiles } = useGetUserKycFiles(currentUserId);
  const { data: userInvestments } = useGetUserInvestmentsByUserId(currentUserId);

  const { enqueueSnackbar } = useSnackbar();

  const onInvestorDetailsSubmit = async (values: InvestorDetailsFormInputValues): Promise<void> => {
    try {
      if (userData) {
        const { ...rest } = values;
        await updateUserById(currentUserId, rest);
        mutate([SwrKeys.useGetUserById, currentUserId]);
        enqueueSnackbar(...InvestorInformationUpdateSuccess);
      }
    } catch (e) {
      enqueueSnackbar(...InvestorInformationUpdateFail);
      console.error('Unable to update investor dataa');
    }
  };
  const onInvestorDetailsSubmitRef = useRef(onInvestorDetailsSubmit);

  const uploadInvestorDocument: UploadDocument<InvestorOnboardFileType> = async (
    onboardId,
    documentType,
    file
  ) => {
    try {
      await uploadOnboardDocument(onboardId, documentType, file);
      mutate([SwrKeys.getUserOnboardById, onboardId]);
    } catch (e) {
      console.error('Could not upload investor onboard document', e);
    }
  };
  const uploadInvestorDocumentRef = useRef(uploadInvestorDocument);

  const saveWalletId = async (walletId) => {
    try {
      await updateUserWalletId(currentUserId, { walletId });
      mutate([SwrKeys.useGetUserById, currentUserId]);
      enqueueSnackbar(...WalletQrCodeSuccess);
    } catch (e) {
      enqueueSnackbar(...WalletQrCodeFail);
      console.error(e);
    }
  };
  const saveWalletIdRef = useRef(saveWalletId);

  const removeWalletId = async () => {
    try {
      await updateUserWalletId(currentUserId, { walletId: '' });
      mutate([SwrKeys.useGetUserById, currentUserId]);
      enqueueSnackbar(...WalletQrCodeRemoveSuccess);
    } catch (e) {
      enqueueSnackbar(...WalletQrCodeRemoveFail);
      console.error(e);
    }
  };
  const removeWalletIdRef = useRef(removeWalletId);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investor Profile' });
    onInvestorDetailsSubmitRef.current = onInvestorDetailsSubmit;
    uploadInvestorDocumentRef.current = uploadInvestorDocument;
    saveWalletIdRef.current = saveWalletId;
    removeWalletIdRef.current = removeWalletId;
  }, [userData]);

  const InvestorProfileProvider: FC = useCallback(({ children }) => {
    const handlers: IInvestorProfileContext = {
      onInvestorDetailsSubmit: () => onInvestorDetailsSubmitRef.current,
      uploadInvestorDocument: () => uploadInvestorDocumentRef.current,
      saveWalletId: () => saveWalletIdRef.current,
      removeWalletId: () => removeWalletIdRef.current,
    };
    return (
      <InvestorProfileContext.Provider
        value={{
          ...handlers,
        }}
      >
        {children}
      </InvestorProfileContext.Provider>
    );
  }, []);

  return (
    <InvestorProfileProvider>
      <InvestorProfile
        userInvestments={userInvestments}
        userData={userData}
        userKycFiles={userKycFiles}
        onboard={onboard}
        showUserStatus={false}
      />
    </InvestorProfileProvider>
  );
};

export default withErrorSuspense(InvestorProfilePage);
