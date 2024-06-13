import { FC, useCallback, useEffect } from 'react';
import {
  addCampaignMember,
  deleteCampaignMember,
  discardCampaignFile,
  updateCampaignMember,
  uploadCampaignFile,
  useGetCampaignById,
  useGetCampaignFilesById,
  useGetCampaignMembersById,
  useGetUserById,
} from 'api';
import { CampaignDetailsFormInputs } from 'components/dashboard/shared/campaigns-page/campaign-details';
import { CampaignDetails } from 'components/dashboard/shared/campaigns-page/campaign-details/CampaignDetails';
import { useSnackbar } from 'notistack';
import {
  CampaignFinalizeFail,
  CampaignFinalizeSuccess,
  CampaignInfoUpdateFail,
  CampaignInfoUpdateSuccess,
  CompanyMemberDeleteFail,
  CompanyMemberDeleteSuccess,
  CompanyMemberSaveFail,
  CompanyMemberSaveSuccess,
} from 'snacks';
import { mutate } from 'swr';
import { SwrKeys } from 'swrKeys';
import { withErrorSuspense } from 'utils/withErrorSuspense';
import { CampaignDetailsContext, ICampaignDetailsContext } from 'hooks/contexts';
import { CampaignTeamInputValues } from 'components/dashboard/shared/campaigns-page/campaign-details/campaign-details-tabs/teams-tab/campaign-team-form';
import { useAuth } from 'hooks';
import { CampaignFileType, NewCampaign, CampaignUpdateDto } from 'types/campaign';
import { DiscardDocument, UploadDocument } from 'types/document';
import { useRef } from 'react';
import { createCampaign } from 'api/createCampaign';
import { updateCampaignById } from 'api/updateCampaignById';
import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import CampaignStartCard from 'ui/gadget/CampaignCard/CampaignStartCard';
import { blobToFile } from 'utils/utils';
import { useGetCompanyById } from 'api/hooks/useGetCompanyById';
import { Components } from 'lib/GadgetClientJava';

const CampaignDetailsWorkspace = () => {
  const {
    user: { id: currentUserId },
  } = useAuth();
  const { data: userData } = useGetUserById(currentUserId);
  const { campaigns } = userData;
  const userCampaignId = campaigns[0]?.id;
  const userCompanyId = (userData.companies[0] as Components.Schemas.CompanyDto)?.id;
  const { data: campaignData = {} as NewCampaign } = useGetCampaignById(userCampaignId);
  const { data: campaignFiles } = useGetCampaignFilesById(userCampaignId);
  const { data: campaignMembers } = useGetCampaignMembersById(userCampaignId);
  const { data: userCompany } = useGetCompanyById(userCompanyId);
  const { enqueueSnackbar } = useSnackbar();

  const campaignUpdateModel = () => {
    return {
      shortDescription: campaignData.shortDescription,
      description: campaignData.description,
      risk: campaignData.risk,
      qa: campaignData.qa,
      videoPresentation: campaignData.videoPresentation,
      location: campaignData.location,
      companyName: campaignData.companyName,
      equity: campaignData.equity,
      amountToRaise: campaignData.amountToRaise,
      maximumAmountToRaise: campaignData.maximumAmountToRaise,
      tokenValue: campaignData.tokenValue,
      valuation: campaignData.valuation,
      maximumTicketsPerInvestor: campaignData.maximumTicketsPerInvestor,
      companyId: campaignData?.company?.id,
      status: campaignData.status,
      category: campaignData.category,
      currency: campaignData.currency,
      startDate: campaignData.startDate,
      endDate: campaignData.endDate,
    };
  };

  const onCampaignDetailsFormSubmit = async (values: CampaignDetailsFormInputs): Promise<void> => {
    try {
      if (campaignData.id) {
        const toUpdate = { ...campaignUpdateModel(), ...values };
        if (toUpdate.amountToRaise) toUpdate.amountToRaise = +toUpdate.amountToRaise;
        if (toUpdate.maximumAmountToRaise)
          toUpdate.maximumAmountToRaise = +toUpdate.maximumAmountToRaise;
        if (toUpdate.tokenValue) toUpdate.tokenValue = +toUpdate.tokenValue;
        if (toUpdate.valuation) toUpdate.valuation = +toUpdate.valuation;
        if (toUpdate.maximumTicketsPerInvestor)
          toUpdate.maximumTicketsPerInvestor = +toUpdate.maximumTicketsPerInvestor;
        await updateCampaignById(campaignData.id, toUpdate);
        mutate([SwrKeys.getCampaignById, campaignData.id]);
      } else {
        await createCampaign({
          companyId: userCompanyId,
          amountToRaise: +values.amountToRaise,
          maximumAmountToRaise: +values.maximumAmountToRaise,
          tokenValue: +values.tokenValue,
          shortDescription: values.shortDescription,
          category: values.category,
          currency: values.currency,
          equity: values.equity,
          valuation: +values.valuation,
          maximumTicketsPerInvestor: +values.maximumTicketsPerInvestor,
        });
        mutate([SwrKeys.useGetUserById, currentUserId]);
        mutate([SwrKeys.getCampaignById, userCampaignId]);
      }
      enqueueSnackbar(...CampaignInfoUpdateSuccess);
    } catch (e) {
      enqueueSnackbar(...CampaignInfoUpdateFail);
      console.error('Failed to save company information', e);
    }
  };

  const onCampaignDetailsFormSubmitRef = useRef(onCampaignDetailsFormSubmit);

  const onCampaignDescriptionSave = async (description: string) => {
    if (!campaignData.id) return;
    try {
      await updateCampaignById(campaignData.id, {
        ...campaignUpdateModel(),
        description,
      } as CampaignUpdateDto);
      enqueueSnackbar(...CampaignInfoUpdateSuccess);
      mutate([SwrKeys.getCampaignById, userCampaignId]);
    } catch (e) {
      enqueueSnackbar(...CampaignInfoUpdateFail);
      console.error('Failed to save company description', e);
    }
  };
  const onCampaignDescriptionSaveRef = useRef(onCampaignDescriptionSave);

  const onCampaignMemberSubmit = async (values: CampaignTeamInputValues[]): Promise<void> => {
    try {
      for (const member of values) {
        if (typeof member.file === 'string') {
          const existingFile = await fetch(`${member.file}`);
          const existingFileBlob = await existingFile.blob();
          const fileToUpload = blobToFile(existingFileBlob, 'photo.png');
          member.file = fileToUpload;
        }
        if (member.id) {
          await updateCampaignMember(campaignData.id, member.id, {
            ...member,
            file: member.file as string,
          });
        } else {
          await addCampaignMember(campaignData.id, {
            ...member,
            file: member.file as string,
          });
        }
      }
      mutate([SwrKeys.getCampaignMembersById, userCampaignId]);
      enqueueSnackbar(...CompanyMemberSaveSuccess);
    } catch (e) {
      enqueueSnackbar(...CompanyMemberSaveFail);
      console.error('Could not add company member', e);
    }
  };
  const onCampaignMemberSubmitRef = useRef(onCampaignMemberSubmit);

  const onCampaignMemberRemove = async (member: CampaignTeamInputValues) => {
    try {
      await deleteCampaignMember(campaignData.id, member.id);
      mutate([SwrKeys.getCampaignMembersById, userCampaignId]);
      enqueueSnackbar(...CompanyMemberDeleteSuccess);
    } catch (e) {
      enqueueSnackbar(...CompanyMemberDeleteFail);
      console.error('Could not delete company member', e);
    }
  };
  const onCampaignMemberRemoveRef = useRef(onCampaignMemberRemove);

  const onCampaignYoutubeSubmit = async (url: string) => {
    try {
      await updateCampaignById(campaignData.id, {
        ...campaignUpdateModel(),
        videoPresentation: url,
      } as CampaignUpdateDto);
      mutate([SwrKeys.getCampaignById, userCampaignId]);
      enqueueSnackbar(...CampaignInfoUpdateSuccess);
    } catch (e) {
      console.error('Could not save campaign Youtube link', e);
      enqueueSnackbar(...CampaignInfoUpdateFail);
    }
  };
  const onCampaignYoutubeSubmitRef = useRef(onCampaignYoutubeSubmit);

  const uploadCampaignDocument: UploadDocument<CampaignFileType> = async (
    projectId,
    documentType,
    file
  ) => {
    try {
      await uploadCampaignFile(projectId, documentType, file);
      mutate([SwrKeys.getCampaignFilesById, userCampaignId]);
    } catch (e) {
      console.error('Could not upload campaign document', e);
    }
  };
  const uploadCampaignDocumentRef = useRef(uploadCampaignDocument);

  const discardCampaignDocument: DiscardDocument<CampaignFileType> = async (projectId, fileId) => {
    try {
      await discardCampaignFile(projectId, fileId);
      mutate([SwrKeys.getCampaignFilesById, userCampaignId]);
    } catch (e) {
      console.error('Could not upload campaign document', e);
    }
  };
  const discardCampaignDocumentRef = useRef(discardCampaignDocument);

  const onCampaignRiskSave = async (risk: string) => {
    if (!campaignData.id) return;
    try {
      await updateCampaignById(campaignData.id, {
        ...campaignUpdateModel(),
        risk,
      } as CampaignUpdateDto);
      mutate([SwrKeys.getCampaignById, userCampaignId]);
      enqueueSnackbar(...CampaignInfoUpdateSuccess);
    } catch (e) {
      enqueueSnackbar(...CampaignInfoUpdateFail);
      console.error('Failed to save company risk', e);
    }
  };
  const onCampaignRiskSaveRef = useRef(onCampaignRiskSave);

  const onCampaignQaSave = async (qa: string) => {
    if (!campaignData.id) return;
    try {
      await updateCampaignById(campaignData.id, {
        ...campaignUpdateModel(),
        qa,
      } as CampaignUpdateDto);
      mutate([SwrKeys.getCampaignById, userCampaignId]);
      enqueueSnackbar(...CampaignInfoUpdateSuccess);
    } catch (e) {
      enqueueSnackbar(...CampaignInfoUpdateFail);
      console.error('Failed to save company risk', e);
    }
  };
  const onCampaignQaSaveRef = useRef(onCampaignQaSave);

  const onFinalizeCampaign = async () => {
    try {
      await updateCampaignById(campaignData.id, {
        ...campaignUpdateModel(),
        status: 'READY',
      } as CampaignUpdateDto);
      mutate([SwrKeys.getCampaignById, userCampaignId]);
      enqueueSnackbar(...CampaignFinalizeSuccess);
    } catch (e) {
      enqueueSnackbar(...CampaignFinalizeFail);
      console.error('Failed to finalize campaign', e);
    }
  };
  const onFinalizeCampaignRef = useRef(onFinalizeCampaign);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Campaign Details Workspace' });
    onCampaignDetailsFormSubmitRef.current = onCampaignDetailsFormSubmit;
    onCampaignDescriptionSaveRef.current = onCampaignDescriptionSave;
    onCampaignMemberSubmitRef.current = onCampaignMemberSubmit;
    onCampaignMemberRemoveRef.current = onCampaignMemberRemove;
    onCampaignYoutubeSubmitRef.current = onCampaignYoutubeSubmit;
    uploadCampaignDocumentRef.current = uploadCampaignDocument;
    discardCampaignDocumentRef.current = discardCampaignDocument;
    onCampaignRiskSaveRef.current = onCampaignRiskSave;
    onCampaignQaSaveRef.current = onCampaignQaSave;
    onFinalizeCampaignRef.current = onFinalizeCampaign;
  }, [userData, campaignData]);

  const CampaignDetailsProvider: FC = useCallback(({ children }) => {
    const handlers: ICampaignDetailsContext = {
      onCampaignDetailsFormSubmit: () => onCampaignDetailsFormSubmitRef.current,
      onCampaignDescriptionSave: () => onCampaignDescriptionSaveRef.current,
      onCampaignMemberSubmit: () => onCampaignMemberSubmitRef.current,
      onCampaignMemberRemove: () => onCampaignMemberRemoveRef.current,
      onCampaignYoutubeSubmit: () => onCampaignYoutubeSubmitRef.current,
      uploadCampaignDocument: () => uploadCampaignDocumentRef.current,
      discardCampaignDocument: () => discardCampaignDocumentRef.current,
      onCampaignRiskSave: () => onCampaignRiskSaveRef.current,
      onCampaignQaSave: () => onCampaignQaSaveRef.current,
      onFinalizeCampaign: () => onFinalizeCampaignRef.current,
    };
    return (
      <CampaignDetailsContext.Provider
        value={{
          ...handlers,
        }}
      >
        {children}
      </CampaignDetailsContext.Provider>
    );
  }, []);

  if (userData?.onboard?.status !== 'KYC_KYB_AML_OK') {
    return <CampaignStartCard />;
  }
  const readonly =
    campaignData.status !== undefined && !['IN_PROGRESS'].includes(campaignData.status);
  return (
    <CampaignDetailsProvider>
      <CampaignDetails
        userCompany={userCompany}
        campaignMembers={campaignMembers}
        campaignFiles={campaignFiles}
        campaignData={campaignData}
        readonly={readonly}
      />
    </CampaignDetailsProvider>
  );
};

export default withErrorSuspense(CampaignDetailsWorkspace);
