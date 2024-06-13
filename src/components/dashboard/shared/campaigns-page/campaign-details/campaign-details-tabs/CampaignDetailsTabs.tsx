import { Badge, Box, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { CampaignDescriptionTab } from './description-tab/CampaignDescriptionTab';
import { CampaignQaTab } from './qa-tab';
import { CampaignRisksTab } from './risks-tab/CampaignRisksTab';
import { CampaignTeamTab } from './teams-tab/CampaignTeamTab';
import { CampaignYoutubeTab } from './youtube-tab/CampaignYoutubeTab';
import { useTranslation } from 'react-i18next';

import { CampaignDocumentsTab } from './documents-tab/CampaignDocumentsTab';
import { Campaign, CampaignMember, CampaignFile } from 'types/campaign';
import gtm from '../../../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../../../constants';
import { BusinessValidationsCampaign } from 'utils/business-validations-campaign';
import { responsive } from 'theme';

export interface CampaignDetailsTabsData {
  description: string;
  qa: string;
  videoPresentation: string;
  risk: string;
}

type TabValue = 'description' | 'team' | 'design' | 'documents' | 'risks' | 'questionsAndAnswers';

interface Tab {
  label: string;
  value: TabValue;
}

interface Props {
  campaignData: Partial<Campaign>;
  campaignMembers: CampaignMember[];
  campaignFiles: CampaignFile[];
  readonly?: boolean;
  checkTabsCompletion?: (completed: boolean) => void;
}

export const CampaignDetailsTabs: FC<Props> = (props: Props): JSX.Element => {
  const {
    campaignData = {},
    checkTabsCompletion = () => {},
    readonly = false,
    campaignMembers = [],
    campaignFiles = [],
  } = props;
  const [currentTab, setCurrentTab] = useState<TabValue>('description');
  const handleTabsChange = (event: ChangeEvent<{}>, value: TabValue): void => {
    setCurrentTab(value);
  };
  const { t } = useTranslation();

  const tabs: Tab[] = [
    { label: t('campaign.description'), value: 'description' },
    { label: t('campaign.team'), value: 'team' },
    { label: t('campaign.design'), value: 'design' },
    { label: t('campaign.documents'), value: 'documents' },
    { label: t('campaign.risks'), value: 'risks' },
    { label: t('campaign.qa'), value: 'questionsAndAnswers' },
  ];

  const renderTabContent = (currentTab: TabValue) => {
    let component: JSX.Element;
    switch (currentTab) {
      case 'description':
        gtm.push({ event: GTM_EVENTS.CAMPAIGN_DESCRIPTION_TAB_CLICK });
        component = <CampaignDescriptionTab readonly={readonly} campaignData={campaignData} />;
        break;
      case 'team':
        gtm.push({ event: GTM_EVENTS.CAMPAIGN_TEAM_TAB_CLICK });
        component = <CampaignTeamTab campaignMembers={campaignMembers} readonly={readonly} />;
        break;
      case 'design':
        gtm.push({ event: GTM_EVENTS.CAMPAIGN_YOUTUBE_TAB_CLICK });
        component = (
          <CampaignYoutubeTab
            campaignFiles={campaignFiles}
            campaignData={campaignData}
            readonly={readonly}
          />
        );
        break;
      case 'documents':
        gtm.push({ event: GTM_EVENTS.CAMPAIGN_DOCUMENTS_TAB_CLICK });
        component = (
          <CampaignDocumentsTab
            readonly={readonly}
            campaignData={campaignData}
            campaignFiles={campaignFiles}
          />
        );
        break;
      case 'risks':
        gtm.push({ event: GTM_EVENTS.CAMPAIGN_RISKS_TAB_CLICK });
        component = <CampaignRisksTab readonly={readonly} campaignData={campaignData} />;
        break;
      case 'questionsAndAnswers':
        gtm.push({ event: GTM_EVENTS.CAMPAIGN_QA_TAB_CLICK });
        component = <CampaignQaTab readonly={readonly} campaignData={campaignData} />;
        break;

      default:
        break;
    }
    return component;
  };

  const tabWarnings = {
    description: false,
    team: false,
    design: false,
    documents: false,
    risks: false,
    questionsAndAnswers: false,
  };

  const getTabWarning = (tabName: string) => {
    const validations = new BusinessValidationsCampaign(
      campaignData,
      campaignFiles,
      campaignMembers
    );
    tabWarnings.description = validations.isDescriptionTabCompleted();
    tabWarnings.team = validations.isTeamTabCompleted();
    tabWarnings.design = validations.isDesignTabCompleted();
    tabWarnings.risks = validations.isRiskTabCompleted();
    tabWarnings.questionsAndAnswers = validations.isQaTabCompleted();
    tabWarnings.documents = validations.isDocumentsTabCompleted();
    return tabWarnings[tabName];
  };

  useEffect(() => {
    checkTabsCompletion(Object.values(tabWarnings).every((value) => value));
  }, [tabWarnings]);

  return (
    <div>
      <Box>
        <Tabs
          indicatorColor="primary"
          onChange={handleTabsChange}
          textColor="primary"
          value={currentTab}
          sx={responsive.tabs}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={`campaignDetailsTabs.${index}`}
              label={
                <Tooltip title={getTabWarning(tab.value) ? '' : t('general.tabTooltip')}>
                  <Badge color="error" invisible={getTabWarning(tab.value)}>
                    {tab.label}
                  </Badge>
                </Tooltip>
              }
              value={tab.value}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 2,
          border: '0.7px solid #E3E5E6',
          borderRadius: '10px',
        }}
      >
        <Typography sx={{ color: '#A2AAAD', mb: 4 }} variant="h1">
          2
        </Typography>
        {renderTabContent(currentTab)}
      </Box>
    </div>
  );
};
