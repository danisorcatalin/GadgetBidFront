import {
  AccountGeneralSettings,
  AccountSecuritySettings,
} from '../../components/dashboard/account';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import gtm from '../../lib/gtm';
import type { FC, ChangeEvent } from 'react';
import { GTM_EVENTS } from '../../constants';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { responsive } from 'theme';

const tabs = [
  { label: 'General', value: 'general' },
  { label: 'Security', value: 'security' },
];

const Account: FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('general');
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Account' });
  }, []);

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const settingsTabEventClick = (tab: string): void => {
    switch (tab) {
      case 'general':
        gtm.push({ event: GTM_EVENTS.SETTINGS_GENERAL_TAB_CLICK });
        break;
      case 'security':
        gtm.push({ event: GTM_EVENTS.SETTINGS_SECURITY_TAB_CLICK });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('settings.title')}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          mt: '20px',
        }}
      >
        <Box sx={{ mt: 1 }}>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={responsive.tabs}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                onClick={() => {
                  settingsTabEventClick(tab.value);
                }}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box sx={{ mt: 3 }}>
          {currentTab === 'general' && <AccountGeneralSettings />}
          {currentTab === 'security' && <AccountSecuritySettings />}
        </Box>
      </Box>
    </>
  );
};

export default Account;
