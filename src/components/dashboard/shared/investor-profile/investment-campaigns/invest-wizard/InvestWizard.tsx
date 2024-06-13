import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SelectTokens } from './SelectTokens';
import { KycRedirect } from './KycRedirect';
import { InvestSave } from './InvestSave';
import { InvestFinish } from './InvestFinish';
import { NewCampaign } from 'types/campaign';
import { UserAnswerInputDto, UserOutputSingleDto } from 'types/user';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import gtm from '../../../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../../../constants';
import { Investment, NewInvestmentDto } from 'types/investment';
import { Components as JavaComponents } from 'lib/GadgetClientJava';

interface InvestWizardProps {
  kycStatus?: boolean;
  finish?: boolean;
  kycCompleted?: boolean;
  kycResponseStatus?: string;
  saveInvestment?: (tokenAmount: number, tokenValue: number) => Promise<void>;
  updateInvestment?: (investmentId: number, tokenAmount: number) => Promise<void>;
  investmentSaved?: boolean;
  userData?: UserOutputSingleDto;
  campaignData?: NewCampaign;
  investmentQuestions?: JavaComponents.Schemas.UserQuestionDto[];
  lastUserInvestment?: Investment;
  saveInvestmentAnswers?: (answers: UserAnswerInputDto[]) => Promise<number>;
  mutateUserData?: () => Promise<unknown>;
  userInvestmentsInCurrentCampaign?: NewInvestmentDto[];
}

export const InvestWizard = (props: InvestWizardProps): JSX.Element => {
  const {
    kycStatus,
    finish = false,
    kycCompleted = false,
    saveInvestment,
    updateInvestment,
    investmentSaved = false,
    userData = {} as UserOutputSingleDto,
    campaignData = {} as NewCampaign,
    lastUserInvestment,
    userInvestmentsInCurrentCampaign,
    kycResponseStatus,
  } = props;
  const { t } = useTranslation();
  const step = finish ? 3 : 0;
  const [activeStep, setActiveStep] = useState(step);
  const navigate = useNavigate();
  const [tokenAmount, setTokenAmount] = useState(0);
  const { tokenValue, currency, remainingTicketsPerInvestor } = campaignData;
  const { id: campaignId } = campaignData;
  const steps = getSteps();

  const handleNext = () => {
    gtm.push({ event: GTM_EVENTS.INVESTMENT_WIZARD_NEXT_CLICK });
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      const hasQa = userData.qaScore !== null;
      if (nextStep === 2 && hasQa) return nextStep + 1;
      return nextStep;
    });
  };

  const handleBack = () => {
    gtm.push({ event: GTM_EVENTS.INVESTMENT_WIZARD_BACK_CLICK });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getSteps() {
    return [
      t('investment.wizard.selectTickets'),
      t('investment.wizard.confirmInvestment'),
      // t('investment.wizard.qa'),
      t('investment.wizard.kycVerification'),
      t('investment.wizard.finish'),
    ];
  }

  const handleTokenChange = (value) => {
    setTokenAmount(value);
    localStorage.setItem('tokenAmount', value);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <SelectTokens
            currency={currency}
            tokenAmount={tokenAmount}
            remainingTicketsPerInvestor={remainingTicketsPerInvestor}
            tokenValue={tokenValue}
            onChange={handleTokenChange}
          />
        );
      case 1:
        return (
          <InvestSave
            currency={currency}
            tokenValue={tokenValue}
            tokenAmount={tokenAmount}
            saveInvestment={saveInvestment}
            updateInvestment={updateInvestment}
            investmentSaved={investmentSaved}
            campaignId={campaignId}
            lastUserInvestment={lastUserInvestment}
            userInvestmentsInCurrentCampaign={userInvestmentsInCurrentCampaign}
          />
        );
      // case 2:
      //   mutateUserData();
      //   return (
      //     <InvestQA
      //       questions={investmentQuestions}
      //       lastUserInvestment={lastUserInvestment}
      //       saveInvestmentAnswers={saveInvestmentAnswers}
      //     />
      //   );
      case 2:
        return <KycRedirect />;
      case 3:
        return (
          <InvestFinish
            kycResponseStatus={kycResponseStatus}
            kycStatus={kycStatus}
            kycCompleted={kycCompleted}
          />
        );
    }
  }

  const goToFinish = () => {
    navigate('/dashboard/investment-wizard/finish');
  };

  const lastStep = activeStep === steps.length - 1;
  return (
    <Container sx={{ paddingLeft: '0px !important', paddingRight: '0px !important' }}>
      {campaignData.status === 'LISTED' || finish ? (
        <>
          <Typography sx={{ mt: 3 }} textAlign="center" variant="h5">
            {t('investment.wizard.patienceIsEverything')}
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 5 }}>
            {steps.map((label, index) => (
              <Step key={`investWizard.${index}`}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ my: 5 }}>
            <Card>
              <CardContent sx={{ backgroundColor: '#FFFFFF' }}>
                {getStepContent(activeStep)}
              </CardContent>
            </Card>
            {!lastStep && (
              <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === 1 && userData.kycCompleted ? goToFinish : handleNext}
                  size="large"
                  disabled={
                    (activeStep === 0 && !tokenAmount) ||
                    (activeStep === 1 && !investmentSaved) ||
                    (activeStep === 2 && userData.qaScore === null) ||
                    activeStep === 3
                  }
                  sx={{ mb: 1, fontSize: '24px' }}
                  fullWidth={true}
                >
                  {t('investment.wizard.next')}
                </Button>
                <Button
                  disabled={activeStep !== 1 || investmentSaved}
                  onClick={handleBack}
                  size="large"
                  sx={{ fontSize: '24px' }}
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                >
                  {t('investment.wizard.back')}
                </Button>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <Card>
          <CardContent>Project has ended</CardContent>
        </Card>
      )}
    </Container>
  );
};
