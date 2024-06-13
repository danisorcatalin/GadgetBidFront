import gtm from '../../../lib/gtm';
import { Container } from '@mui/material';
import { FC, useEffect } from 'react';
import { GTM_EVENTS } from '../../../constants';
import { InvestmentDetails } from 'components/dashboard/shared/investor-profile/investments/details';
import { useGetInvestmentById } from 'api';
import { useParams } from 'react-router-dom';

const InvestorInvestmentDetailsPage: FC = () => {
  const { investmentId } = useParams();
  const { data: investmentData } = useGetInvestmentById(+investmentId);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investor Investment Details' });
  }, []);

  return (
    <Container style={{ padding: 0 }} maxWidth={false}>
      <InvestmentDetails investmentData={investmentData} />
    </Container>
  );
};

export default InvestorInvestmentDetailsPage;
