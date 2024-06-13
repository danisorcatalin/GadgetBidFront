import gtm from '../../../../../lib/gtm';
import type { FC, ChangeEvent } from 'react';
import type {
  InvestorOnboardFileType,
  UserKycFile,
  UserOnboardOutputDto,
  UserOutputSingleDto,
} from 'types/user';
import { Box, Tabs, Tab, Badge, Tooltip } from '@mui/material';
import { GTM_EVENTS } from '../../../../../constants';
import { InvestorDetailsFormInputValues } from './investor-general-information-tab/investor-details-form';
import { InvestorDigitalWalletTab } from './investor-digital-wallet-tab/InvestorDigitalWalletTab';
import { InvestorGeneralInformationTab } from './investor-general-information-tab/InvestorGeneralInformationTab';
import { InvestorInvestments } from '../investments';
import { UploadDocument } from 'types/document';
import { useAuth } from 'hooks';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { responsive } from 'theme';
import { SimpleInvestmentDto } from 'types/investment';

type InvestorDetailsTabValue = 'general' | 'onboarding' | 'wallet' | 'investments';

export interface InvestorDetailsTabs {
  label: string;
  value: InvestorDetailsTabValue;
}

export interface InvestorDetailsTabsProps {
  userData: Partial<UserOutputSingleDto>;
  onboard: UserOnboardOutputDto;
  userKycFiles: UserKycFile[];
  userInvestments: SimpleInvestmentDto[];
  handleCompanyDetailsSubmit?: unknown;
  isAdmin?: boolean;
  onInvestorDetailsSubmit?: (values: InvestorDetailsFormInputValues) => Promise<void>;
  uploadInvestorDocument?: UploadDocument<InvestorOnboardFileType>;
  saveWalletId?: (id: string) => Promise<void>;
  removeWalletId?: () => Promise<void>;
}

export const InvestorDetailsTabs: FC<InvestorDetailsTabsProps> = (
  props: InvestorDetailsTabsProps
) => {
  const { t } = useTranslation();
  const tabs: InvestorDetailsTabs[] = [
    { label: t('investor.generalInformation'), value: 'general' },
    { label: t('investor.wallet'), value: 'wallet' },
  ];
  const { user } = useAuth();
  const {
    userData = {},
    isAdmin = false,
    userInvestments = [],
    onboard: onboardData,
    userKycFiles,
  } = props;
  const [investorTabs, setInvestorTabs] = useState<InvestorDetailsTabs[]>(tabs);
  const [currentTab, setCurrentTab] = useState<InvestorDetailsTabValue>('general');
  const handleTabsChange = (event: ChangeEvent<{}>, value: InvestorDetailsTabValue): void => {
    setCurrentTab(value);
  };
  useEffect(() => {
    if (user.role === 'ADMIN' || user.role === 'ACCOUNT_MANAGER') {
      setInvestorTabs([
        ...investorTabs,
        { label: t('investor.investments'), value: 'investments' },
      ]);
    }
  }, []);

  const renderTabContent = (currentTab: InvestorDetailsTabValue): JSX.Element => {
    let component;
    switch (currentTab) {
      case 'general':
        gtm.push({ event: GTM_EVENTS.INVESTOR_GENERAL_INFORMATION_TAB_CLICK });
        component = (
          <InvestorGeneralInformationTab
            userKycFiles={userKycFiles}
            userData={userData}
            onboardData={onboardData}
          />
        );
        break;
      case 'wallet':
        gtm.push({ event: GTM_EVENTS.INVESTOR_WALLET_TAB_CLICK });
        component = <InvestorDigitalWalletTab userData={userData} isAdmin={isAdmin} />;
        break;
      case 'investments':
        gtm.push({ event: GTM_EVENTS.INVESTOR_INVESTMENTS_TAB_CLICK });
        component = <InvestorInvestments investmentsData={userInvestments} isAdmin={isAdmin} />;
        break;
      default:
        component = <div />;
        break;
    }
    return component;
  };

  const getTabWarning = useCallback(
    (tabName) => {
      const tabWarnings = {
        onboarding: false,
        general: false,
        wallet: false,
      };

      if (onboardData?.files?.length < 2) tabWarnings.onboarding = true;
      if (!userData?.walletId) tabWarnings.wallet = true;

      return tabWarnings[tabName];
    },
    [userData, onboardData]
  );

  return (
    <Box>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="primary"
        value={currentTab}
        variant="scrollable"
        sx={responsive.tabs}
      >
        {investorTabs.map((tab, index) => {
          return (
            <Tab
              key={`investorDetailsTabs.${index}`}
              value={tab.value}
              label={
                <Tooltip title={!getTabWarning(tab.value) ? '' : t('general.tabTooltip')}>
                  <Badge color="error" invisible={!getTabWarning(tab.value)}>
                    {tab.label}
                  </Badge>
                </Tooltip>
              }
            />
          );
        })}
      </Tabs>
      <Box sx={{ borderRadius: '8px', border: '1px solid #E3E5E6', padding: '32px 16px' }}>
        {renderTabContent(currentTab)}
      </Box>
    </Box>
  );
};
