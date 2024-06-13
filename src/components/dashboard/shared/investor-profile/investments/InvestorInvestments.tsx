import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Spacer } from 'components/Spacer';
import { FC } from 'react';
import { InvestmentsPieChart } from './pie-chart';
import { InvestmentsTable } from './table';
import { generateSeededHexColor } from 'utils/utils';
import { useTranslation } from 'react-i18next';
import gtm from '../../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../../constants';
import useAuth from 'hooks/useAuth';
import { useGetSimpleUserByUserId } from 'api/hooks/useGetSimpleUserByUserId';
import { SimpleInvestmentDto } from 'types/investment';
import { useGetVerifyUrl } from '../../../../../api/useGetVerifyUrl';

interface Props {
  investmentsData: SimpleInvestmentDto[];
  isAdmin?: boolean;
}

export const InvestorInvestments: FC<Props> = (props: Props) => {
  const { investmentsData, isAdmin = false } = props;
  const {
    user: { id: currentUserId },
  } = useAuth();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: userData } = useGetSimpleUserByUserId(currentUserId);

  const filteredInvestments = [];
  const groupByCompany: { [key: string]: SimpleInvestmentDto[] } = {};
  investmentsData.forEach((investment) => {
    const companyName = investment.campaign.company.name;
    if (!groupByCompany[companyName]) {
      groupByCompany[companyName] = [];
    }
    groupByCompany[companyName].push(investment);

    const presubscribedInvestmentIndex = groupByCompany[companyName].findIndex(
      (investment) => investment.status === 'PRESUBSCRIBED'
    );

    const hasPresubscribedInvestment = presubscribedInvestmentIndex > -1;

    const hasOtherInvestment =
      groupByCompany[companyName].findIndex((investment) => investment.status !== 'PRESUBSCRIBED') >
      -1;

    if (hasPresubscribedInvestment && hasOtherInvestment) {
      groupByCompany[companyName].splice(presubscribedInvestmentIndex, 1);
    }
  });
  // eslint-disable-next-line
  Object.entries(groupByCompany).forEach(([_key, investments]) => {
    filteredInvestments.push(...investments);
  });

  const chartData = [];
  for (const companyName of Object.keys(groupByCompany)) {
    const companyInvestments = groupByCompany[companyName];
    const companyTotalInvestments = companyInvestments.reduce((prev, curr) => {
      const amount = (prev += curr.tokenAmount * curr.campaign.tokenValue);
      return amount;
    }, 0);
    chartData.push({
      label: companyName,
      data: companyTotalInvestments,
      color: generateSeededHexColor(companyName),
      currency: companyInvestments[0].campaign.currency,
    });
  }
  const { t } = useTranslation();

  const hasPresubscribedInvestment = investmentsData.some(
    (investment) => investment.status === 'PRESUBSCRIBED'
  );

  async function GetUrl() {
    return await useGetVerifyUrl();
  }

  const retryVerification = async () => {
    gtm.push({ event: GTM_EVENTS.INVESTMENT_WIZARD_GET_VERIFIED_CLICK });
    const { redirectUrl } = await GetUrl();
    location.href = redirectUrl;
  };

  return (
    <>
      {filteredInvestments.length > 0 ? (
        <>
          <InvestmentsPieChart data={{ series: chartData }} />
          {userData.kycCompleted !== true && !hasPresubscribedInvestment && !isAdmin ? (
            <Box
              sx={{
                mt: 5,
                display: 'flex',
                flexDirection: mobileDevice ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>{t('investments.notYetVerified')}:</Typography>
              <Button
                onClick={retryVerification}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  width: mobileDevice ? '40%' : '15%',
                  fontSize: '24px',
                  marginTop: mobileDevice ? '16px' : '0',
                }}
                fullWidth={true}
              >
                {t('investments.verifyMe')}
              </Button>
            </Box>
          ) : (
            <Spacer marginTop="16px" marginBottom="16px" />
          )}
          <InvestmentsTable data={filteredInvestments} isAdmin={isAdmin} />
        </>
      ) : (
        <Typography>{t('investments.noInvestmentsYet')}</Typography>
      )}
    </>
  );
};
