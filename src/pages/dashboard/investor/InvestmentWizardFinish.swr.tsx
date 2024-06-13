import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import { InvestWizard } from 'components/dashboard/shared/investor-profile/investment-campaigns/invest-wizard/InvestWizard';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';
import { withErrorSuspense } from 'utils/withErrorSuspense';
import { useGetSimpleUserByUserId } from 'api/hooks/useGetSimpleUserByUserId';
import { mutate } from 'swr';
import { SwrKeys } from 'swrKeys';
import { useGetLastUserKyc } from 'api';

const InvestmentWizardFinish = () => {
  const {
    user: { id: userId },
  } = useAuth();
  const [triggeredLooping, setTriggeredLooping] = useState(false);
  const [forcedStatus, setForcedStatus] = useState(null);

  const { data: userData } = useGetSimpleUserByUserId(userId);
  const { data: userKycData } = useGetLastUserKyc(userId);
  const { kycCompleted } = userData;

  useEffect(() => {
    let interval;
    let mutateLoops = 0;
    if (userData && !userData.kycCompleted && !triggeredLooping) {
      setTriggeredLooping(true);
      interval = setInterval(() => {
        if (mutateLoops === 10 || userData.kycCompleted) {
          if (!userData.kycCompleted) {
            setForcedStatus('not_eligible');
          }
          clearInterval(interval);
          return;
        }
        mutateLoops += 1;
        mutate([SwrKeys.getSimpleUserByUserId, userId]);
        mutate([SwrKeys.getLastUserKyc, userId]);
      }, 1000);
    }
    if (mutateLoops === 10 || userData?.kycCompleted || userKycData.status === 'not_eligible') {
      if (!userData.kycCompleted) {
        setForcedStatus('not_eligible');
      }
      clearInterval(interval);
      return;
    }
    return () => {
      clearInterval(interval);
    };
  }, [userData]);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investment Wizard Finish' });
  }, []);

  return (
    <InvestWizard
      finish
      kycResponseStatus={forcedStatus || userKycData?.status}
      kycStatus={kycCompleted}
      kycCompleted={kycCompleted}
    />
  );
};

export default withErrorSuspense(InvestmentWizardFinish);
