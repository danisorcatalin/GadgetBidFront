import gtm from '../../../../lib/gtm';
import { Components } from 'lib/GadgetClientJava';
import { FC, useEffect } from 'react';
import { GTM_EVENTS } from '../../../../constants';
import { InvestmentsTable } from 'components/dashboard/shared/investments/InvestmentsTable';
import { useGetInvestmentsList } from 'api';
import { withErrorSuspense } from 'utils/withErrorSuspense';

type EnhancedInvestmentData = Components.Schemas.InvestmentDto & {
  total: number;
  companyName: string;
};

const InvestmentsWorkspace: FC = () => {
  const { data } = useGetInvestmentsList();
  const investmentsData: EnhancedInvestmentData[] = data.map((investment) => ({
    ...investment,
    total: investment.tokenAmount * investment.campaign?.tokenValue,
    companyName: investment?.campaign?.company?.name,
    tokenValue: investment.campaign?.tokenValue,
  }));

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investments Workspace' });
  }, []);

  return <InvestmentsTable investmentsData={investmentsData} />;
};

export default withErrorSuspense(InvestmentsWorkspace);
