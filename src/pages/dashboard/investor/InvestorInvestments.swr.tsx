import gtm from '../../../lib/gtm';
import { Container } from '@mui/material';
import { FC, useEffect } from 'react';
import { GTM_EVENTS } from '../../../constants';
import { InvestmentsPendingMessage } from 'components/dashboard/shared/investor-profile/investments/pending-message';
import { InvestorInvestments } from 'components/dashboard/shared/investor-profile/investments';
import { useAuth } from 'hooks';

import { useGetUserInvestmentsByUserId } from 'api/hooks/useGetUserInvestmentsByUserId';

const InvestorInvestmentsPage: FC = () => {
  const {
    user: { id: currentUserId },
  } = useAuth();

  const { data: investments } = useGetUserInvestmentsByUserId(currentUserId);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investor Investments' });
  }, []);

  return (
    <Container style={{ padding: 0 }} maxWidth={false}>
      {!investments.length ? (
        <InvestmentsPendingMessage />
      ) : (
        <InvestorInvestments investmentsData={investments} />
      )}
    </Container>
  );
};

export default InvestorInvestmentsPage;
