import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { InvestorOnboardFileType, InvestorOnboardStatus } from 'types/user';

import {
  updateUserOnboardById,
  uploadOnboardDocument,
  useGetUserById,
  useGetUserOnboardById,
} from 'api';
import { withErrorSuspense } from 'utils/withErrorSuspense';
import { mutate } from 'swr';

import { InvestorProfile } from 'components/dashboard/shared/investor-profile/InvestorProfile';

import { FC, useEffect, useRef } from 'react';
import { updateUserById } from 'api';

import { InvestorStatusActionBar } from 'components/dashboard/shared/investor-profile/InvestorStatusActionBar';
import { InvestorDetailsFormInputValues } from 'components/dashboard/shared/investor-profile/investor-details-tabs/investor-general-information-tab/investor-details-form';
import { SwrKeys } from 'swrKeys';
import {
  InvestorInformationUpdateFail,
  InvestorInformationUpdateSuccess,
  WalletQrCodeFail,
  WalletQrCodeRemoveFail,
  WalletQrCodeRemoveSuccess,
  WalletQrCodeSuccess,
} from 'snacks';
import { UploadDocument } from 'types/document';

import { IInvestorProfileContext, InvestorProfileContext } from 'hooks/contexts';
import { useCallback } from 'react';
import gtm from '../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../constants';
import { useGetUserInvestmentsByUserId } from 'api/hooks/useGetUserInvestmentsByUserId';
import { useGetSimpleUserByUserId } from 'api/hooks/useGetSimpleUserByUserId';
import { updateUserWalletId } from 'api/updateUserWalletId';
import { useGetUserKycFiles } from 'api/hooks/useGetUserKycFiles';

interface Props {
  onboardId: string;
}

const InvestorOnboardProfile: FC<Props> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { userId } = useParams();
  const userIdToInt = parseInt(userId, 10);
  const { data: userData } = useGetUserById(userIdToInt);
  const { data: userInvestments } = useGetUserInvestmentsByUserId(userIdToInt);
  const { data: simpleUser } = useGetSimpleUserByUserId(userIdToInt);
  const { data: onboard } = useGetUserOnboardById(userData.onboard.id);
  const { data: userKycFiles } = useGetUserKycFiles(userIdToInt);
  const { kycCompleted } = simpleUser;
  const status = onboard?.status as InvestorOnboardStatus;

  const changeUserStatus = async (newStatus: InvestorOnboardStatus) => {
    try {
      await updateUserOnboardById(onboard.id, newStatus);
      mutate([SwrKeys.getUserOnboardById, onboard.id]);
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    }
  };

  const onInvestorDetailsSubmit = async (values: InvestorDetailsFormInputValues): Promise<void> => {
    try {
      if (userData) {
        const { ...rest } = values;
        await updateUserById(userIdToInt, rest);
        mutate([SwrKeys.useGetUserById, userIdToInt]);
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
      await updateUserWalletId(userIdToInt, { walletId });
      mutate([SwrKeys.useGetUserById, userIdToInt]);
      enqueueSnackbar(...WalletQrCodeSuccess);
    } catch (e) {
      enqueueSnackbar(...WalletQrCodeFail);
      console.error(e);
    }
  };
  const saveWalletIdRef = useRef(saveWalletId);

  const removeWalletId = async () => {
    try {
      await updateUserWalletId(userIdToInt, { walletId: '' });
      mutate([SwrKeys.useGetUserById, userIdToInt]);
      enqueueSnackbar(...WalletQrCodeRemoveSuccess);
    } catch (e) {
      enqueueSnackbar(...WalletQrCodeRemoveFail);
      console.error(e);
    }
  };
  const removeWalletIdRef = useRef(removeWalletId);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investor Onboard Profile' });
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
    <div>
      <InvestorStatusActionBar
        kycCompleted={kycCompleted}
        currentStatus={status}
        onStatusChange={changeUserStatus}
      />
      <InvestorProfileProvider>
        <InvestorProfile
          onboard={onboard}
          userInvestments={userInvestments}
          userData={userData}
          userKycFiles={userKycFiles}
          showUserStatus={false}
          isAdmin
        />
      </InvestorProfileProvider>
    </div>
  );
};

export default withErrorSuspense(InvestorOnboardProfile);
