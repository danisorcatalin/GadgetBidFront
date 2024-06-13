import { FC, useCallback, useEffect, useRef } from 'react';
import {
  addCampaignMember,
  deleteCampaignMember,
  discardCampaignFile,
  issueTokens,
  updateCampaignMember,
  uploadCampaignFile,
  useGetCampaignById,
  useGetCampaignFilesById,
  useGetCampaignMembersById,
  useGetUserById,
} from 'api';
import { createCampaign } from 'api/createCampaign';
import { CampaignDetailsFormInputs } from 'components/dashboard/shared/campaigns-page/campaign-details';
import { CampaignDetails } from 'components/dashboard/shared/campaigns-page/campaign-details/CampaignDetails';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';
import {
  CampaignFinalizeFail,
  CampaignFinalizeSuccess,
  CampaignInfoUpdateFail,
  CampaignInfoUpdateSuccess,
  CompanyMemberDeleteFail,
  CompanyMemberDeleteSuccess,
  CompanyMemberSaveFail,
  CompanyMemberSaveSuccess,
  TokenizationFinishFail,
  TokenizationFinishSuccess,
  TokenizationStartError,
  TokenizationStartSuccess,
} from 'snacks';
import { mutate } from 'swr';
import { SwrKeys } from 'swrKeys';
import { withErrorSuspense } from 'utils/withErrorSuspense';
import { CampaignDetailsContext, ICampaignDetailsContext } from 'hooks/contexts';
import { CampaignTeamInputValues } from 'components/dashboard/shared/campaigns-page/campaign-details/campaign-details-tabs/teams-tab/campaign-team-form';
import { DiscardDocument, UploadDocument } from 'types/document';
import { CampaignFileType, CampaignStatus, CampaignUpdateDto } from 'types/campaign';
import { CampaignStatusActionBar } from 'components/dashboard/shared/campaigns-page/campaign-details/campaign-status/CampaignStatusActionBar';
import { InvestmentsTable } from 'components/dashboard/shared/investments/InvestmentsTable';
import { Spacer } from 'components/Spacer';
import { getListingTemplateOk } from 'utils/user';
import { updateCampaignById } from 'api/updateCampaignById';
import gtm from '../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../constants';
import { blobToFile } from 'utils/utils';
import { downloadCampaignMemberFile } from '../../../../api/downloadCampaignMemberFile';
import { useGetCompanyById } from 'api/hooks/useGetCompanyById';
import { useGetCampaignInvestmentsByCampaignId } from 'api/hooks/useGetCampaignInvestmentsByCampaignId';

const CampaignDetailsWorkspace = () => {
  const { campaignId } = useParams();
  const campaignIdToInt = parseInt(campaignId);
  const { data: campaignData } = useGetCampaignById(campaignIdToInt);
  const { data: campaignFiles } = useGetCampaignFilesById(campaignIdToInt);
  const { data: campaignMembers } = useGetCampaignMembersById(campaignIdToInt);
  const campaignUserData = campaignData?.user;
  const { data: userData } = useGetUserById(campaignUserData?.id);
  const { enqueueSnackbar } = useSnackbar();
  const userCompanyId = (userData?.companies[0] || {}).id;
  const { data: userCompany } = useGetCompanyById(userCompanyId);
  const { data: campaignInvestments = [] } = useGetCampaignInvestmentsByCampaignId(+campaignId);

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
          companyId: +userCompany.id,
          amountToRaise: +values.amountToRaise,
          maximumAmountToRaise: +values.maximumAmountToRaise,
          tokenValue: +values.tokenValue,
          shortDescription: values.shortDescription,
          currency: values.currency,
          category: values.category,
          valuation: +values.valuation,
        });
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
      await updateCampaignById(campaignData.id, { ...campaignUpdateModel(), description });
      enqueueSnackbar(...CampaignInfoUpdateSuccess);
      mutate([SwrKeys.getCampaignById, campaignData.id]);
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
          const existingFile = (await downloadCampaignMemberFile(member?.id)) as BlobPart;
          const existingFileBlob = new Blob([existingFile], { type: 'application/octet-stream' });
          member.file = blobToFile(existingFileBlob, 'photo.png');
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
      mutate([SwrKeys.getCampaignMembersById, campaignData.id]);
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
      mutate([SwrKeys.getCampaignMembersById, campaignData.id]);
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
      mutate([SwrKeys.getCampaignById, campaignData.id]);
      enqueueSnackbar(...CampaignInfoUpdateSuccess);
    } catch (e) {
      console.error('Could not save campaign Youtube link', e);
      enqueueSnackbar(...CampaignInfoUpdateFail);
    }
  };
  const onCampaignYoutubeSubmitRef = useRef(onCampaignYoutubeSubmit);

  const uploadCampaignDocument: UploadDocument<CampaignFileType> = async (
    CampaignId,
    documentType,
    file
  ) => {
    try {
      await uploadCampaignFile(CampaignId, documentType, file);
      mutate([SwrKeys.getCampaignFilesById, campaignData.id]);
    } catch (e) {
      console.error('Could not upload campaign document', e);
    }
  };
  const uploadCampaignDocumentRef = useRef(uploadCampaignDocument);

  const discardCampaignDocument: DiscardDocument<CampaignFileType> = async (CampaignId, fileId) => {
    try {
      await discardCampaignFile(CampaignId, fileId);
      mutate([SwrKeys.getCampaignFilesById, campaignData.id]);
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
      mutate([SwrKeys.getCampaignById, campaignData.id]);
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
      mutate([SwrKeys.getCampaignById, campaignData.id]);
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
      mutate([SwrKeys.getCampaignById, campaignData.id]);
      enqueueSnackbar(...CampaignFinalizeSuccess);
    } catch (e) {
      enqueueSnackbar(...CampaignFinalizeFail);
      console.error('Failed to finalize campaign', e);
    }
  };
  const onFinalizeCampaignRef = useRef(onFinalizeCampaign);

  const onCampaignStatusChange = async (status: CampaignStatus) => {
    try {
      await updateCampaignById(campaignData.id, {
        ...campaignUpdateModel(),
        status,
      } as CampaignUpdateDto);
      mutate([SwrKeys.getCampaignById, campaignData.id]);
      enqueueSnackbar(...CampaignInfoUpdateSuccess);
    } catch (e) {
      enqueueSnackbar(...CampaignInfoUpdateFail);
      console.error('Failed to change campaign campaign', e);
    }
  };

  const onStartTokenizationClick = async () => {
    try {
      enqueueSnackbar(...TokenizationStartSuccess);
      const tokensIssued = await issueTokens(campaignData.id);
      if (tokensIssued) {
        enqueueSnackbar(...TokenizationFinishSuccess);
      } else {
        enqueueSnackbar(...TokenizationFinishFail);
      }
      mutate([SwrKeys.getCampaignById, campaignData.id]);
    } catch (e) {
      enqueueSnackbar(...TokenizationStartError);
      console.error('Failed to issue tokens for Campaign', campaignData.id, e);
    }
  };

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Campaign Details Workspace' });
    onCampaignDetailsFormSubmitRef.current = onCampaignDetailsFormSubmit;
    onCampaignDescriptionSaveRef.current = onCampaignDescriptionSave;
    onCampaignMemberSubmitRef.current = onCampaignMemberSubmit;
    onCampaignMemberRemoveRef.current = onCampaignMemberRemove;
    onCampaignYoutubeSubmitRef.current = onCampaignYoutubeSubmit;
    uploadCampaignDocumentRef.current = uploadCampaignDocument;
    onCampaignRiskSaveRef.current = onCampaignRiskSave;
    onCampaignQaSaveRef.current = onCampaignQaSave;
    onFinalizeCampaignRef.current = onFinalizeCampaign;
  }, [userData, campaignData, campaignMembers, campaignFiles]);

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

  const listingTemplateOk = getListingTemplateOk(campaignData.status) ? 1 : 0;

  return (
    <>
      <CampaignStatusActionBar
        currentStatus={campaignData.status}
        listingTemplateOk={listingTemplateOk}
        onStatusChange={onCampaignStatusChange}
        onStartTokenizationClick={onStartTokenizationClick}
      />
      <CampaignDetailsProvider>
        <CampaignDetails
          managerView={true}
          userCompany={userCompany}
          campaignData={campaignData}
          campaignFiles={campaignFiles}
          campaignMembers={campaignMembers}
          showCampaignStatus={false}
        />
      </CampaignDetailsProvider>
      <Spacer marginTop="16px" marginBottom="16px" />
      <InvestmentsTable campaignData={campaignData} investmentsData={campaignInvestments} />
    </>
  );
};

export default withErrorSuspense(CampaignDetailsWorkspace);
