import { IssuerOnboardFileType, IssuerOnboardStatus } from 'types/user';
import { IssuerProfile } from 'components/dashboard/shared/issuer-profile/IssuerProfile';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import {
  addCompanyMember,
  createCompany,
  deleteCompanyMember,
  discardCompanyFile,
  discardOnboardFile,
  updateCompanyById,
  updateCompanyMember,
  updateUserById,
  updateUserOnboardById,
  uploadCompanyFile,
  uploadOnboardDocument,
  useGetUserById,
  useGetUserOnboardById,
} from 'api';
import { withErrorSuspense } from 'utils/withErrorSuspense';

import { FC, useCallback, useEffect, useRef } from 'react';

import { IssuerStatusActionBar } from 'components/dashboard/shared/issuer-profile/IssuerStatusActionBar';

import { SwrKeys } from 'swrKeys';
import { CompanyFileType, DiscardDocument, UploadDocument } from 'types/document';
import {
  CompanyInfoSaveFail,
  CompanyInfoSaveSuccess,
  CompanyMemberDeleteFail,
  CompanyMemberDeleteSuccess,
  CompanyMemberSaveFail,
  CompanyMemberSaveSuccess,
} from 'snacks';
import gtm from '../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../constants';
import { IIssuerProfileContext, IssuerProfileContext } from 'hooks/contexts';
import { IssuerContactDetailsFormInputs } from 'components/dashboard/shared/issuer-profile/company-details-tabs/issuer-contact-tab/issuer-contact-details-form/IssuerContactDetailsForm';
import { LegalRepresentativesInputValues } from 'components/dashboard/shared/issuer-profile/company-details-tabs/legal-representatives-tab/legal-representatives-dynamic-form';
import { ShareholdersInputValues } from 'components/dashboard/shared/issuer-profile/company-details-tabs/shareholders-tab/shareholders-dynamic-form/ShareholdersDynamicForm';
import { mutate } from 'swr';
import { CompanyDetailsFormInputs } from 'types/company';
import { useGetUserOnboardFilesById } from 'api/hooks/useGetUserOnboardFilesById';
import { useGetCompanyById } from 'api/hooks/useGetCompanyById';
import { useGetSimpleUserByUserId } from 'api/hooks/useGetSimpleUserByUserId';

const IssuerProfileWorkspace: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { userId } = useParams();
  const userIdToInt = parseInt(userId, 10);
  const { data: userData } = useGetUserById(userIdToInt);
  const { data: userOnboardFiles } = useGetUserOnboardFilesById(userData.onboard.id);
  const userCompanyId = userData?.companies[0] ? userData?.companies[0].id : null;
  const { data: companyData } = useGetCompanyById(userCompanyId);
  const { data: simpleUser = {} } = useGetSimpleUserByUserId(userIdToInt);
  const { data: onboard } = useGetUserOnboardById(userData.onboard.id);
  const { kycCompleted } = simpleUser;
  const status = onboard?.status as IssuerOnboardStatus;

  const changeUserStatus = async (newStatus: IssuerOnboardStatus) => {
    try {
      mutate(
        [SwrKeys.useGetUserById, userData.id],
        { ...userData, onboard: { ...userData.onboard, status: newStatus } },
        false
      );
      await updateUserOnboardById(onboard.id, newStatus);
      mutate([SwrKeys.getUserOnboardById, userData.onboard.id]);
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    }
  };

  const onIssuerDetailsSubmit = async (values: IssuerContactDetailsFormInputs): Promise<void> => {
    try {
      await updateUserById(userData.id, values);
      enqueueSnackbar(...CompanyInfoSaveSuccess);
      mutate([SwrKeys.useGetUserById, userData.id]);
    } catch (e) {
      enqueueSnackbar(...CompanyInfoSaveFail);
      console.error('Failed to save company information');
    }
  };
  const onIssuerDetailsSubmitRef = useRef(onIssuerDetailsSubmit);

  const uploadOnboardingDocument: UploadDocument<IssuerOnboardFileType> = async (
    onboardId,
    documentType,
    file
  ) => {
    try {
      await uploadOnboardDocument(onboardId, documentType, file);
      mutate([SwrKeys.useGetUserById, userData.id]);
      mutate([SwrKeys.useGetUserOnboardFilesById, userData.onboard.id]);
    } catch (e) {
      console.error('Unable to upload issuer onboarding document', e);
    }
  };

  const uploadOnboardingDocumentRef = useRef(uploadOnboardingDocument);

  const discardOnboardDocument: DiscardDocument<IssuerOnboardFileType> = async (
    onboardId: number,
    fileId: number
  ) => {
    try {
      await discardOnboardFile(onboardId, fileId);
      mutate([SwrKeys.useGetUserById, userData.id]);
      mutate([SwrKeys.useGetUserOnboardFilesById, userData.onboard.id]);
    } catch (e) {
      console.error('Unable to discard issuer onboarding document', e);
    }
  };
  const discardOnboardDocumentRef = useRef(discardOnboardDocument);

  const uploadCompanyDocument: UploadDocument<CompanyFileType> = async (
    companyId,
    documentType,
    file
  ) => {
    try {
      await uploadCompanyFile(companyId, documentType, file);
      mutate([SwrKeys.getCompanyById, userCompanyId]);
    } catch (e) {
      console.error('Unable to upload issuer company document', e);
    }
  };
  const uploadCompanyDocumentRef = useRef(uploadCompanyDocument);

  const discardCompanyDocument: DiscardDocument<CompanyFileType> = async (companyId, fileId) => {
    try {
      await discardCompanyFile(companyId, fileId);
      mutate([SwrKeys.getCompanyById, userCompanyId]);
    } catch (e) {
      console.error('Unable to upload issuer company document', e);
    }
  };
  const discardCompanyDocumentRef = useRef(discardCompanyDocument);

  const onCompanyDetailsSubmit = async (values: CompanyDetailsFormInputs): Promise<void> => {
    try {
      if (companyData.id) {
        await updateCompanyById(companyData.id, values);
      } else {
        await createCompany(userData.id, values);
        mutate([SwrKeys.useGetUserById, userData.id]);
      }
      enqueueSnackbar(...CompanyInfoSaveSuccess);
      mutate([SwrKeys.getCompanyById, userCompanyId]);
    } catch (e) {
      enqueueSnackbar(...CompanyInfoSaveFail);
      console.error('Failed to save company information');
    }
  };
  const onCompanyDetailsSubmitRef = useRef(onCompanyDetailsSubmit);

  const onLegalRepresentativeSubmit = async (
    values: LegalRepresentativesInputValues[]
  ): Promise<void> => {
    try {
      for (const member of values) {
        if (member.id) {
          await updateCompanyMember(companyData.id, member.id, {
            ...member,
            companyId: companyData.id,
            role: 'LEGAL_REPRESENTATIVE',
          });
        } else {
          await addCompanyMember(companyData.id, {
            ...member,
            companyId: companyData.id,
            role: 'LEGAL_REPRESENTATIVE',
          });
        }
      }
      mutate([SwrKeys.getCompanyById, userCompanyId]);
      enqueueSnackbar(...CompanyMemberSaveSuccess);
    } catch (e) {
      enqueueSnackbar(...CompanyMemberSaveFail);
      console.error('Could not add company member');
    }
  };
  const onLegalRepresentativeSubmitRef = useRef(onLegalRepresentativeSubmit);

  const onLegalRepresentativeRemove = async (member: LegalRepresentativesInputValues) => {
    try {
      await deleteCompanyMember(companyData.id, member.id);
      mutate([SwrKeys.getCompanyById, userCompanyId]);
      enqueueSnackbar(...CompanyMemberDeleteSuccess);
    } catch (e) {
      enqueueSnackbar(...CompanyMemberDeleteFail);
      console.error('Could not delete company member');
    }
  };
  const onLegalRepresentativeRemoveRef = useRef(onLegalRepresentativeRemove);

  const onShareholderSubmit = async (values: ShareholdersInputValues[]): Promise<void> => {
    try {
      for (const member of values) {
        if (member.id) {
          await updateCompanyMember(companyData.id, member.id, {
            ...member,
            companyId: companyData.id,
            role: 'SHAREHOLDER',
          });
        } else {
          await addCompanyMember(companyData.id, {
            ...member,
            companyId: companyData.id,
            role: 'SHAREHOLDER',
          });
        }
      }
      mutate([SwrKeys.getCompanyById, userCompanyId]);
      enqueueSnackbar(...CompanyMemberSaveSuccess);
    } catch (e) {
      enqueueSnackbar(...CompanyMemberSaveFail);
      console.error('Could not add company member');
    }
  };
  const onShareholderSubmitRef = useRef(onShareholderSubmit);

  const onShareholderRemove = async (member: ShareholdersInputValues) => {
    try {
      await deleteCompanyMember(companyData.id, member.id);
      mutate([SwrKeys.getCompanyById, userCompanyId]);
      enqueueSnackbar(...CompanyMemberDeleteSuccess);
    } catch (e) {
      enqueueSnackbar(...CompanyMemberDeleteFail);
      console.error('Could not delete company member');
    }
  };
  const onShareholderRemoveRef = useRef(onShareholderRemove);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Issuer Profile Workspace' });
    onIssuerDetailsSubmitRef.current = onIssuerDetailsSubmit;
    uploadOnboardingDocumentRef.current = uploadOnboardingDocument;
    discardOnboardDocumentRef.current = discardOnboardDocument;
    uploadCompanyDocumentRef.current = uploadCompanyDocument;
    discardCompanyDocumentRef.current = discardCompanyDocument;
    onCompanyDetailsSubmitRef.current = onCompanyDetailsSubmit;
    onLegalRepresentativeSubmitRef.current = onLegalRepresentativeSubmit;
    onLegalRepresentativeRemoveRef.current = onLegalRepresentativeRemove;
    onShareholderSubmitRef.current = onShareholderSubmit;
    onShareholderRemoveRef.current = onShareholderRemove;
  }, [userData, userOnboardFiles]);

  const IssuerProfileProvider: FC = useCallback(({ children }) => {
    const handlers: IIssuerProfileContext = {
      onIssuerDetailsSubmit: () => onIssuerDetailsSubmitRef.current,
      uploadOnboardingDocument: () => uploadOnboardingDocumentRef.current,
      discardOnboardingDocument: () => discardOnboardDocumentRef.current,
      uploadCompanyDocument: () => uploadCompanyDocumentRef.current,
      discardCompanyDocument: () => discardCompanyDocumentRef.current,
      onCompanyDetailsSubmit: () => onCompanyDetailsSubmitRef.current,
      onLegalRepresentativeSubmit: () => onLegalRepresentativeSubmitRef.current,
      onLegalRepresentativeRemove: () => onLegalRepresentativeRemoveRef.current,
      onShareholderSubmit: () => onShareholderSubmitRef.current,
      onShareholderRemove: () => onShareholderRemoveRef.current,
    };
    return (
      <IssuerProfileContext.Provider
        value={{
          ...handlers,
        }}
      >
        {children}
      </IssuerProfileContext.Provider>
    );
  }, []);

  return (
    <div>
      <IssuerStatusActionBar
        kycCompleted={kycCompleted}
        currentStatus={status}
        onStatusChange={changeUserStatus}
      />
      <IssuerProfileProvider>
        <IssuerProfile
          onboardData={onboard}
          companyData={companyData}
          userData={userData}
          userOnboardFiles={userOnboardFiles}
        />
      </IssuerProfileProvider>
    </div>
  );
};

export default withErrorSuspense(IssuerProfileWorkspace);
