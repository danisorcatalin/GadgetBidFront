import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { NewCampaign } from 'types/campaign';
import { Spacer } from 'components/Spacer';
import { useTranslation } from 'react-i18next';
import { CampaignCardCarousel } from 'ui/gadget/CampaignCard';
import { endedCampaignStatuses } from 'utils/user';
import { responsive } from 'theme';
export interface InvestmentCampaignsProps {
  campaignsList: NewCampaign[];
}

type TabValue = 'ongoing' | 'upcoming' | 'ended';

interface Tab {
  label: string;
  value: TabValue;
}

export const InvestmentCampaigns: FC<InvestmentCampaignsProps> = (
  props: InvestmentCampaignsProps
) => {
  const { campaignsList = [] } = props;
  const listedCampaigns = campaignsList.filter((d) => d.status === 'LISTED');
  const auditDoneCampaigns = campaignsList.filter((d) => d.status === 'AUDIT_DONE');
  const endedCampaigns = campaignsList.filter((d) => endedCampaignStatuses.includes(d.status));
  const { t } = useTranslation();
  const tabs: Tab[] = [
    { label: t('campaign.earlyAccess'), value: 'upcoming' },
    { label: t('campaign.ongoing'), value: 'ongoing' },
    { label: t('campaign.ended'), value: 'ended' },
  ];
  const [currentTab, setCurrentTab] = useState<TabValue>('upcoming');
  const [activeCampaigns, setActiveCampaigns] = useState({
    featured: {
      label: 'Early Access',
      data: auditDoneCampaigns,
      isUpcoming: true,
      hasDetails: true,
    },
    other: { label: 'Ongoing', data: listedCampaigns, isUpcoming: false, hasDetails: true },
  });

  const handleTabsChange = (event: ChangeEvent<{}>, value: TabValue): void => {
    setCurrentTab(value);
    let featured;
    let other;
    switch (value) {
      case 'upcoming':
        featured = {
          label: 'Early Access',
          data: auditDoneCampaigns,
          hasDetails: true,
          isUpcoming: true,
        };
        other = { label: 'Ongoing', data: listedCampaigns, hasDetails: true };
        break;
      case 'ongoing':
        featured = { label: 'Ongoing', data: listedCampaigns, hasDetails: true };
        other = { label: 'Ended', data: endedCampaigns, hasDetails: false };
        break;
      case 'ended':
        featured = { label: 'Ended', data: endedCampaigns, hasDetails: false };
        other = { label: '', data: [] };
        break;
      default:
        break;
    }
    setActiveCampaigns({
      featured,
      other,
    });
  };

  return (
    <>
      <Box sx={{ marginTop: '12px' }}>
        <Tabs
          indicatorColor="primary"
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="primary"
          value={currentTab}
          variant="scrollable"
          sx={responsive.tabs}
        >
          {tabs.map((tab, index) => (
            <Tab key={`investmentCampaignDetails.${index}`} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Box>
      <Card sx={{ padding: '16px 0px 16px 16px', maxWidth: '1024px' }}>
        <Typography
          sx={{
            fontSize: '44px',
            letterSpacing: '-0.88px',
            lineHeight: '48px',
            textAlign: 'left',
            color: '#000000',
          }}
          variant="h1"
        >
          {activeCampaigns.featured.label}
        </Typography>
        <Spacer marginBottom="20px" />
        {activeCampaigns.featured.data.length ? (
          <CampaignCardCarousel
            hasDetails={activeCampaigns.featured.hasDetails}
            campaignsData={activeCampaigns.featured.data}
            isUpcoming={activeCampaigns.featured.isUpcoming}
          />
        ) : (
          <Typography
            sx={{
              color: '#000000',
              mt: '20px',
            }}
            variant="body1"
          >
            {t('campaign.noCampaigns')}
          </Typography>
        )}
        {activeCampaigns.other.data.length ? (
          <>
            <Typography
              sx={{
                fontSize: '44px',
                letterSpacing: '-0.88px',
                lineHeight: '48px',
                textAlign: 'left',
                color: '#000000',
                mt: '30px',
              }}
              variant="h1"
            >
              {activeCampaigns.other.label}
            </Typography>
            <Box
              sx={{
                marginTop: '20px',
                // display: 'flex',
                // justifyContent: 'center',
                // flexWrap: 'wrap',
              }}
            >
              <CampaignCardCarousel
                hasDetails={activeCampaigns.other.hasDetails}
                campaignsData={activeCampaigns.other.data}
                isUpcoming={activeCampaigns.other.isUpcoming}
              />
            </Box>
          </>
        ) : null}
      </Card>
    </>
  );
};
