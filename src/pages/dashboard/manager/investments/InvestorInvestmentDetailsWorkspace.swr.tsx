import gtm from '../../../../lib/gtm';
import { Container } from '@mui/material';
import { FC, useEffect } from 'react';
import { GTM_EVENTS } from '../../../../constants';
import { InvestmentDetails } from 'components/dashboard/shared/investor-profile/investments/details';
import { InvestmentFileType, InvestmentStatus } from 'types/investment';
import { InvestmentStatusActionBar } from 'components/dashboard/shared/investor-profile/investments/investment-status-action-bar/InvestmentStatusActionBar';
import { SwrKeys } from 'swrKeys';
import { UploadDocument } from 'types/document';
import { mutate } from 'swr';
import { updateInvestmentById } from 'api/updateInvestmentById';
import { uploadInvestmentFile, useGetInvestmentById } from 'api';
import { useParams } from 'react-router-dom';
import { withErrorSuspense } from 'utils/withErrorSuspense';

const InvestorInvestmentDetailsWorkspace: FC = () => {
  const { investmentId } = useParams();
  const { data: investmentData } = useGetInvestmentById(+investmentId);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investor Investment Details Workspace' });
  }, []);

  const changeInvestmentStatus = async (newStatus: InvestmentStatus) => {
    try {
      await updateInvestmentById(investmentData.id, { status: newStatus });
      mutate([SwrKeys.useGetInvestmentById, investmentData.id]);
    } catch (e) {
      console.error('Could not change investment status', e);
    }
  };

  const uploadInvestmentDocument: UploadDocument<InvestmentFileType> = async (
    investmentId,
    documentType,
    file
  ) => {
    try {
      await uploadInvestmentFile(investmentId, documentType, file);
      mutate([SwrKeys.useGetInvestmentById, investmentData.id]);
    } catch (e) {
      console.error('Could not upload investor onboard document', e);
    }
  };

  return (
    <Container style={{ padding: 0 }} maxWidth={false}>
      <InvestmentStatusActionBar
        currentStatus={investmentData.status}
        onStatusChange={changeInvestmentStatus}
      />
      <InvestmentDetails
        investmentData={investmentData}
        showInvestmentDocumentsUploadButton
        uploadInvestmentDocument={uploadInvestmentDocument}
      />
    </Container>
  );
};

export default withErrorSuspense(InvestorInvestmentDetailsWorkspace);
