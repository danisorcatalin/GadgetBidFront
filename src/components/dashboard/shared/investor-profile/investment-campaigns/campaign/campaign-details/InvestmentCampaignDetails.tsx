import { Box, Button, Grid, LinearProgress, Tab, Tabs, Typography } from '@mui/material';
import { TextEditor } from 'components/generic/TextEditor';
import ResponsiveVideoPlayer from 'components/generic/ResponsiveVideoPlayer';
import { ChangeEvent, FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TeamDetails } from './team-details';
import { CampaignDocumentsTable } from 'components/dashboard/shared/campaigns-page/campaign-details/campaign-details-tabs/documents-tab/campaign-documents-table';

import type { SimpleCompany } from 'types/company';
import type { CampaignStatus, NewCampaign } from 'types/campaign';
import { useTranslation } from 'react-i18next';
import { dateTimeFormat, daysUntil, numberFormat } from 'utils/utils';
import gtm from '../../../../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../../../../constants';
import { endedCampaignStatuses } from 'utils/user';
import { responsive } from 'theme';
import { campaignDetailsCategories } from 'components/dashboard/shared/campaigns-page/campaign-details/campaign-categories';
import { Components } from 'lib/GadgetClientJava';

interface Props {
  userOnboardStatus: Components.Schemas.UserOnboardStatus;
  campaignData: Partial<NewCampaign>;
  campaignFiles: Components.Schemas.CampaignFileDto[];
  campaignMembers: Components.Schemas.CampaignMemberDto[];
}

type TabValue = 'description' | 'team' | 'documents' | 'risks' | 'questionsAndAnswers';

interface Tab {
  label: string;
  value: TabValue;
}

const validStatuses: CampaignStatus[] = ['AUDIT_DONE', 'LISTED'];

export const InvestmentCampaignDetails: FC<Props> = (props: Props) => {
  const { userOnboardStatus, campaignData, campaignMembers, campaignFiles } = props;

  const {
    id,
    shortDescription,
    description,
    currency,
    startDate,
    endDate,
    videoPresentation,
    maximumAmountToRaise,
    risk,
    qa,
    category,
    amountToRaise,
    tokenValue,
    equity,
    valuation,
    company = {} as SimpleCompany,
    status,
    amountRaised,
  } = campaignData;
  const progressBarValue = 100 * (amountRaised / amountToRaise);
  const { t } = useTranslation();
  const tabs: Tab[] = [
    { label: t('campaign.description'), value: 'description' },
    { label: t('campaign.team'), value: 'team' },
    { label: t('campaign.documents'), value: 'documents' },
    { label: t('campaign.risks'), value: 'risks' },
    { label: t('campaign.qa'), value: 'questionsAndAnswers' },
  ];
  const { name: companyName, city: companyCity, country: companyCountry } = company;
  const percentage = Math.round((amountRaised / amountToRaise) * 100).toFixed(0) + '%';
  const categoryString = t(
    campaignDetailsCategories.find((campaignCategory) => campaignCategory.key === category).value
  );
  const [currentTab, setCurrentTab] = useState<TabValue>('description');

  const handleTabsChange = (event: ChangeEvent<{}>, value: TabValue): void => {
    setCurrentTab(value);
  };

  const logo = campaignFiles.find((file) => file.type === 'LOGO');
  const cover = campaignFiles.find((file) => file.type === 'COVER');

  const DescriptionDetail: FC = () => {
    return <TextEditor readonly={true} initialText={description} />;
  };
  const RiskDetail: FC = () => {
    return <TextEditor readonly={true} initialText={risk} />;
  };
  const QaDetail: FC = () => {
    return <TextEditor readonly={true} initialText={qa} />;
  };

  const renderTabContent = (currentTab: TabValue) => {
    let component: JSX.Element;
    switch (currentTab) {
      case 'description':
        gtm.push({ event: GTM_EVENTS.INVESTMENT_DESCRIPTION_TAB_CLICK });
        component = <DescriptionDetail />;
        break;
      case 'team':
        gtm.push({ event: GTM_EVENTS.INVESTMENT_TEAM_TAB_CLICK });
        component = <TeamDetails team={campaignMembers} />;
        break;
      case 'documents':
        gtm.push({ event: GTM_EVENTS.INVESTMENT_DOCUMENTS_TAB_CLICK });
        component = (
          <CampaignDocumentsTable
            campaignFiles={campaignFiles}
            campaignData={campaignData}
            viewonly={true}
          />
        );
        break;
      case 'risks':
        gtm.push({ event: GTM_EVENTS.INVESTMENT_RISKS_TAB_CLICK });
        component = <RiskDetail />;
        break;
      case 'questionsAndAnswers':
        gtm.push({ event: GTM_EVENTS.INVESTMENT_QA_TAB_CLICK });
        component = <QaDetail />;
        break;
      default:
        break;
    }
    return component;
  };

  const investEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.INVEST_CLICK });
  };

  return (
    <Box
      sx={{
        maxWidth: '1024px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '9px',
        mt: 2,
        border: '0.7px solid #E3E5E6',
      }}
    >
      <Box sx={{ mb: 3, width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: '360px',
            background: `url(${cover ? cover.filePath : ''})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'relative',
            borderRadius: '9px',
          }}
        ></Box>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={5}>
            <Grid item md={12} xs={12}>
              <Box sx={responsive.investmentCampaignDetails.description}>
                <Box sx={responsive.investmentCampaignDetails.companyName}>
                  <Box
                    sx={{
                      minWidth: '110px',
                      maxWidth: '160px',
                      height: '110px',
                      background: `url(${logo ? logo.filePath : ''})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      top: '200px',
                      left: '25px',
                      backgroundSize: 'contain',
                    }}
                  ></Box>
                  <Typography color="textPrimary" variant="h1">
                    {companyName.toUpperCase()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    flexBasis: '50%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography color="textPrimary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {t('crowdfunding.campaign.category')}
                    </Typography>
                    <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {categoryString}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography color="textPrimary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {t('crowdfunding.campaign.location')}
                    </Typography>
                    <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {companyCity}, {companyCountry}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography color="textPrimary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {t('crowdfunding.campaign.targetAmountToRaise')}
                    </Typography>
                    <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {numberFormat(amountToRaise, currency)}
                      {' - '}
                      {numberFormat(maximumAmountToRaise, currency)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {status !== 'AUDIT_DONE' && (
                      <>
                        <Typography color="textPrimary" variant="body1" sx={{ flexBasis: '50%' }}>
                          {t('crowdfunding.campaign.amountRaised')}
                        </Typography>
                        <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                          {numberFormat(amountRaised, currency)}
                        </Typography>
                      </>
                    )}

                    {/* <Typography color="textPrimary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {status === 'AUDIT_DONE'
                        ? t('crowdfunding.campaign.amountPresubscribed')
                        : t('crowdfunding.campaign.amountRaised')}
                    </Typography>
                    <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {numberFormat(amountRaised, currency)}
                    </Typography> */}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography sx={{ flexBasis: '50%' }}>
                      {t('crowdfunding.campaign.minimumInvestment')}
                    </Typography>
                    <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {numberFormat(tokenValue, currency)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography sx={{ flexBasis: '50%' }}>
                      {t('crowdfunding.campaign.equity')}
                    </Typography>
                    <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {equity ? `${equity}%` : '-'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography sx={{ flexBasis: '50%' }}>
                      {t('crowdfunding.campaign.valuation')}
                    </Typography>
                    <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                      {valuation ? numberFormat(valuation, currency) : '-'}
                    </Typography>
                  </Box>

                  {startDate && endDate && status === 'LISTED' && (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Typography color="textPrimary" variant="body1" sx={{ flexBasis: '50%' }}>
                          {t('crowdfunding.campaign.startDate')}
                        </Typography>
                        <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                          {dateTimeFormat(new Date(startDate))}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Typography color="textPrimary" variant="body1" sx={{ flexBasis: '50%' }}>
                          {t('crowdfunding.campaign.endDate')}
                        </Typography>
                        <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                          {dateTimeFormat(new Date(endDate))}
                        </Typography>
                      </Box>
                    </>
                  )}
                  {startDate && endDate && status === 'AUDIT_DONE' && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography color="textPrimary" variant="body1" sx={{ flexBasis: '50%' }}>
                        {t('crowdfunding.campaign.timeRemainingForPresubscription')}
                      </Typography>
                      <Typography color="primary" variant="body1" sx={{ flexBasis: '50%' }}>
                        {daysUntil(new Date(startDate))} days
                      </Typography>
                    </Box>
                  )}
                  {endedCampaignStatuses.includes(status) && (
                    <Typography color="textSecondary" variant="body1">
                      {t('crowdfunding.campaign.campaignEnded')}
                    </Typography>
                  )}
                  <Button
                    sx={{ mt: 2 }}
                    color="primary"
                    variant="contained"
                    component={RouterLink}
                    to={
                      status === 'LISTED'
                        ? `/dashboard/investment-wizard/${id}`
                        : `/dashboard/presubscribe/${id}`
                    }
                    disabled={
                      userOnboardStatus === 'NOT_ELIGIBLE' || !validStatuses.includes(status)
                    }
                    onClick={investEventClick}
                  >
                    {status === 'AUDIT_DONE'
                      ? 'Get Early Access'
                      : t('crowdfunding.campaign.invest')}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography color="textPrimary" variant="h2">
                {shortDescription}
              </Typography>
            </Grid>
            {status !== 'AUDIT_DONE' && (
              <Grid item md={12} xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography color="primary" variant="body1">
                    {numberFormat(amountRaised, currency)} {t('crowdfunding.campaign.of')}{' '}
                    {numberFormat(amountToRaise, currency)}{' '}
                    {campaignData.status === 'AUDIT_DONE'
                      ? t('crowdfunding.campaign.presubscribed')
                      : t('crowdfunding.campaign.raised')}
                  </Typography>
                  <Typography color="primary" variant="body1">
                    {percentage}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progressBarValue > 100 ? 100 : progressBarValue}
                  sx={{ height: '35px' }}
                />
              </Grid>
            )}
            {videoPresentation ? (
              <Grid item md={12} xs={12}>
                <ResponsiveVideoPlayer url={videoPresentation} controls={true} />
              </Grid>
            ) : null}
          </Grid>
          <Box
            sx={{
              mt: 3,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
              sx={responsive.investorCampaignTabs}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={`investmentCampaignDetails.${index}`}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: '10px', width: '100%' }}>
            {renderTabContent(currentTab)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
