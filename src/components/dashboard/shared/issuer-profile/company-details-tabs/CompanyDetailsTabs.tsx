import gtm from '../../../../../lib/gtm';
import type { Company, CompanyDetailsFormInputs } from 'types/company';
import type { FC, ChangeEvent } from 'react';
import type { UserOnboardOutputDto, UserOutputSingleDto } from 'types/user';
import type { createCompany, updateCompanyById } from 'api';
import { Box, Tabs, Tab, Badge, Tooltip } from '@mui/material';
import { CompanyTab } from './company-tab/CompanyTab';
import { GTM_EVENTS } from '../../../../../constants';
import { IssuerContactTab } from './issuer-contact-tab/IssuerContactTab';
import { LegalRepresentativesInputValues } from './legal-representatives-tab/legal-representatives-dynamic-form';
import { LegalRepresentativesTab } from './legal-representatives-tab/LegalRepresentativesTab';
import { ShareholdersInputValues } from './shareholders-tab/shareholders-dynamic-form/ShareholdersDynamicForm';
import { ShareholdersTab } from './shareholders-tab/ShareholdersTab';
import { Spacer } from 'components/Spacer';
import { useCallback, useState } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BusinessValidations } from 'utils';
import { responsive } from 'theme';
import { Components } from 'lib/GadgetClientJava';

type IssuerProfileFormTabValue =
  | 'contactDetails'
  | 'company'
  | 'legalRepresentatives'
  | 'shareholders';

interface IssuerProfileFormTabs {
  label: string;
  value: IssuerProfileFormTabValue;
}

export interface CompanyDetailsTabsProps {
  companyData: Partial<Company>;
  onboard: UserOnboardOutputDto;
  userData: Partial<UserOutputSingleDto>;
  userOnboardFiles: Components.Schemas.UserOnboardFileOutputDto[];
  handleCompanyDetailsSubmit?: typeof createCompany | typeof updateCompanyById;
  uploadOnboardingDocument?: (onboardId, documentType, file) => Promise<void>;
  onCompanyDetailsSubmit?: (values: CompanyDetailsFormInputs) => Promise<void>;
  onLegalRepresentativeSubmit?: (values: LegalRepresentativesInputValues[]) => Promise<void>;
  onLegalRepresentativeRemove?: (values: LegalRepresentativesInputValues) => Promise<void>;
  onShareholderSubmit?: (values: ShareholdersInputValues[]) => Promise<void>;
  onShareholderRemove?: (values: ShareholdersInputValues) => Promise<void>;
}

export const CompanyDetailsTabs: FC<CompanyDetailsTabsProps> = (props: CompanyDetailsTabsProps) => {
  const { companyData = {}, userData = {}, userOnboardFiles = [], onboard: onboardData } = props;
  const currentTabRef = useRef<IssuerProfileFormTabValue>('contactDetails');
  const [currentTab, setCurrentTab] = useState(currentTabRef.current);
  const handleTabsChange = (event: ChangeEvent<{}>, value: IssuerProfileFormTabValue): void => {
    setCurrentTab(value);
    currentTabRef.current = value;
  };
  const { t } = useTranslation();

  const tabs: IssuerProfileFormTabs[] = [
    { label: t('company.details.contactDetails'), value: 'contactDetails' },
    { label: t('company.details.company'), value: 'company' },
    { label: t('company.details.legalRepresentatives'), value: 'legalRepresentatives' },
    { label: t('company.details.shareholders'), value: 'shareholders' },
  ];

  const renderTabContent = (currentTab: IssuerProfileFormTabValue): JSX.Element => {
    let component: JSX.Element;
    switch (currentTab) {
      case 'contactDetails':
        gtm.push({ event: GTM_EVENTS.ISSUER_CONTACT_DETAILS_TAB_CLICK });
        component = (
          <IssuerContactTab
            onboard={onboardData}
            userData={userData}
            userOnboardFiles={userOnboardFiles}
          />
        );
        break;
      case 'company':
        gtm.push({ event: GTM_EVENTS.ISSUER_COMPANY_TAB_CLICK });
        component = <CompanyTab companyData={companyData} />;
        break;
      case 'legalRepresentatives':
        gtm.push({ event: GTM_EVENTS.ISSUER_LEGAL_REPRESENTATIVES_TAB_CLICK });
        component = <LegalRepresentativesTab companyData={companyData} />;
        break;
      case 'shareholders':
        gtm.push({ event: GTM_EVENTS.ISSUER_SHAREHOLDERS_TAB_CLICK });
        component = <ShareholdersTab companyData={companyData} />;
        break;
      default:
        component = <div />;
        break;
    }
    return component;
  };
  const getTabWarning = useCallback(
    (tabName: string) => {
      const tabWarnings = {
        contactDetails: false,
        company: false,
        legalRepresentatives: false,
        shareholders: false,
      };
      const validations = new BusinessValidations(userData);
      tabWarnings.contactDetails = validations.isContactTabCompleted();
      tabWarnings.company = validations.isCompanyTabCompleted();
      tabWarnings.legalRepresentatives = validations.isRepresentativesTabCompleted();
      tabWarnings.shareholders = validations.isShareholdersTabCompleted();
      return tabWarnings[tabName];
    },
    [onboardData, companyData, userData]
  );

  return (
    <Box>
      <Spacer marginBottom="24px" />
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="primary"
        value={currentTab}
        variant="scrollable"
        sx={responsive.tabs}
      >
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={`companyDetailsTabs.${index}`}
              value={tab.value}
              label={
                <Tooltip title={getTabWarning(tab.value) ? '' : t('general.tabTooltip')}>
                  <Badge color="error" invisible={getTabWarning(tab.value)}>
                    {tab.label}
                  </Badge>
                </Tooltip>
              }
            />
          );
        })}
      </Tabs>
      <Box sx={{ borderRadius: '8px', border: '1px solid #E3E5E6', padding: '32px 16px' }}>
        {renderTabContent(currentTabRef.current)}
      </Box>
    </Box>
  );
};
