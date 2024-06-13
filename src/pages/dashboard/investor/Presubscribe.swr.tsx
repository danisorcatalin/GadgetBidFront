import gtm from '../../../lib/gtm';
import { FC, useEffect } from 'react';
import { GTM_EVENTS } from '../../../constants';
import {
  addFeedbackAnswer,
  addInvestmentPresubscription,
  updateInvestmentById,
  useGetCampaignById,
  useGetFeedbackForm,
  useGetUserById,
} from 'api';
import { useNavigate, useParams } from 'react-router-dom';
import { withErrorSuspense } from 'utils/withErrorSuspense';
import { Container } from '@mui/material';
import { Presubscribe } from 'components/dashboard/shared/investor-profile/investment-campaigns/presubscribe/Presubscribe';
import { useSnackbar } from 'notistack';
import {
  InvestmentSaveFail,
  InvestmentSaveSuccess,
  PresubscribeCancelFeedbackFail,
  PresubscribeToCampaignFail,
  PresubscribeToCampaignSuccess,
} from 'snacks';
import { useModal } from 'mui-modal-provider';
import PresubscribeSuccessModal from 'components/dashboard/shared/investor-profile/investment-campaigns/presubscribe/PresubscribeSuccessModal';
import PresubscribeCancelFeedbackModal from 'components/dashboard/shared/investor-profile/investment-campaigns/presubscribe/PresubscribeCancelFeedbackModal';
import { FeedbackForms } from 'feedbackForms';
import { FeedbackAnswerInput } from 'types/feedback';
import { useAuth } from 'hooks';
import { useGetCampaignInvestmentsByCampaignId } from 'api/hooks/useGetCampaignInvestmentsByCampaignId';

const PresubscribePage: FC = () => {
  const { campaignId } = useParams();
  const {
    user: { id: userId },
  } = useAuth();
  const { data: campaignData } = useGetCampaignById(+campaignId);
  const { data: feedbackForm } = useGetFeedbackForm(FeedbackForms.PresubscribeCancelFeedbackFrom);
  const { data: campaignInvestments = [] } = useGetCampaignInvestmentsByCampaignId(+campaignId);
  const { mutate: mutateUserData } = useGetUserById(userId);
  const { enqueueSnackbar } = useSnackbar();
  const { showModal } = useModal();
  const navigate = useNavigate();

  let userInvestmentInCurrentCampaign =
    campaignInvestments.filter((investment) => investment.user.id === userId)[0] || null;

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Presubscribe' });
  }, []);

  const presubscribeToInvestment = async (tokenAmount: number) => {
    try {
      userInvestmentInCurrentCampaign = await addInvestmentPresubscription({
        campaignId: +campaignId,
        tokenAmount,
      });
      enqueueSnackbar(...PresubscribeToCampaignSuccess);
      showModal(PresubscribeSuccessModal);
      mutateUserData();
    } catch (e) {
      enqueueSnackbar(...PresubscribeToCampaignFail);
      console.error('Could not presubscribe to campaign', e);
    }
  };

  const updateInvestmentPresubscription = async (tokenAmount: number) => {
    try {
      await updateInvestmentById(userInvestmentInCurrentCampaign.id, {
        tokenAmount,
      });
      enqueueSnackbar(...InvestmentSaveSuccess);
      showModal(PresubscribeSuccessModal);
      mutateUserData();
    } catch (e) {
      enqueueSnackbar(...InvestmentSaveFail);
      console.error('Could not presubscribe to campaign', e);
    }
  };

  const handlePresubscribeCancelSubmit = async (values: FeedbackAnswerInput[]): Promise<void> => {
    try {
      await addFeedbackAnswer(FeedbackForms.PresubscribeCancelFeedbackFrom, {
        data: values,
        extra: JSON.stringify({
          campaignId,
          companyName: campaignData.company.name,
        }),
      });
    } catch (e) {
      enqueueSnackbar(...PresubscribeCancelFeedbackFail);
      console.error('Could not submit feedback', e);
    }
  };

  const cancelPresubcribeToCampaign = async () => {
    userInvestmentInCurrentCampaign
      ? navigate('/dashboard')
      : showModal(PresubscribeCancelFeedbackModal, {
          feedbackForm: feedbackForm,
          onSubmit: handlePresubscribeCancelSubmit,
        });
  };

  return (
    <Container style={{ padding: 0 }} maxWidth={false}>
      <Presubscribe
        campaignData={campaignData}
        presubscribe={
          userInvestmentInCurrentCampaign
            ? updateInvestmentPresubscription
            : presubscribeToInvestment
        }
        cancelPresubcribeToCampaign={cancelPresubcribeToCampaign}
        previousPresubscription={userInvestmentInCurrentCampaign}
      />
    </Container>
  );
};

export default withErrorSuspense(PresubscribePage);
