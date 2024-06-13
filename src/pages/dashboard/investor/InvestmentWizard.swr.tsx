import { useParams } from 'react-router';
import { InvestWizard } from 'components/dashboard/shared/investor-profile/investment-campaigns/invest-wizard/InvestWizard';
import {
  addInvestment,
  useGetCampaignById,
  useGetUserById,
  updateInvestmentById,
  useGetInvestmentQuestions,
  addInvestmentAnswers,
} from 'api';
import { withErrorSuspense } from 'utils/withErrorSuspense';
import { useAuth } from 'hooks';
import { useSnackbar } from 'notistack';
import { InvestmentSaveSuccess, InvestmentSaveFail } from 'snacks';
import { useEffect, useMemo, useState } from 'react';
import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import type { Components as JavaComponents } from 'lib/GadgetClientJava';
import { useGetCampaignInvestmentsByCampaignId } from 'api/hooks/useGetCampaignInvestmentsByCampaignId';

const InvestmentWizard = () => {
  const {
    user: { id: userId },
  } = useAuth();
  const { campaignId } = useParams();
  const { data: userData, mutate: mutateUserData } = useGetUserById(userId);
  const { data: campaignData } = useGetCampaignById(+campaignId);
  const { data: campaignInvestments = [] } = useGetCampaignInvestmentsByCampaignId(+campaignId);
  const { data: investmentQuestions } = useGetInvestmentQuestions();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investment Wizard' });
  }, []);

  const [investmentSaved, setInvestmentSaved] = useState(false);

  const userInvestmentsInCurrentCampaign = useMemo(
    () => campaignInvestments.filter((investment) => investment.user.id === userId),
    [campaignInvestments]
  );

  const saveInvestment = async (tokenAmount) => {
    try {
      if (!tokenAmount) throw new Error('tokenAmount missing');
      await addInvestment({
        tokenAmount,
        userId: userData.id,
        campaignId: +campaignId,
      });
      setInvestmentSaved(true);
      enqueueSnackbar(...InvestmentSaveSuccess);
    } catch (e) {
      enqueueSnackbar(...InvestmentSaveFail);
      console.error('Could not save investment', e);
    }
  };

  const updateInvestment = async (investmentId, tokenAmount) => {
    try {
      if (!tokenAmount) throw new Error('tokenAmount missing');
      await updateInvestmentById(investmentId, {
        tokenAmount,
      });
      setInvestmentSaved(true);
      enqueueSnackbar(...InvestmentSaveSuccess);
    } catch (e) {
      enqueueSnackbar(...InvestmentSaveFail);
      console.error('Could not save investment', e);
    }
  };

  const saveInvestmentAnswers = async (answers) => {
    try {
      const lastInvestment = getLastUserInvestment();
      const { score } = await addInvestmentAnswers(lastInvestment.id, {
        qa: answers,
      });
      mutateUserData();
      return score;
    } catch (e) {
      console.error('Could not save investment QA', e);
    }
  };

  const getLastUserInvestment = (): JavaComponents.Schemas.InvestmentDto | undefined => {
    const userInvestments = userInvestmentsInCurrentCampaign.filter(
      (investment) => investment.status !== 'PRESUBSCRIBED'
    );

    const userHasPreviousInvestments = !!userInvestments.length;
    if (userHasPreviousInvestments) {
      return userInvestments[userInvestments.length - 1];
    }
    return undefined;
  };

  return (
    <InvestWizard
      mutateUserData={mutateUserData}
      kycStatus={userData.kycCompleted}
      saveInvestment={saveInvestment}
      updateInvestment={updateInvestment}
      investmentSaved={investmentSaved}
      userInvestmentsInCurrentCampaign={userInvestmentsInCurrentCampaign}
      userData={userData}
      campaignData={campaignData}
      investmentQuestions={investmentQuestions}
      lastUserInvestment={getLastUserInvestment()}
      saveInvestmentAnswers={saveInvestmentAnswers}
    />
  );
};

export default withErrorSuspense(InvestmentWizard);
