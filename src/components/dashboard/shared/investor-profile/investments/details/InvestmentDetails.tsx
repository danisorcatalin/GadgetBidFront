import { Box, Tab, Tabs, Typography } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { Investment, InvestmentFileType } from 'types/investment';
import { UploadDocument } from 'types/document';
import { useTranslation } from 'react-i18next';
import { StatusStepper } from 'components/generic/StatusStepper';
import { useAuth } from 'hooks';
import { getInvestmentStepperStatusString, investmentStepperStatuses } from 'utils/status-stepper';
import { InvestmentDetailsTab } from './investments-details-tab/InvestmentDetailsTab';
import { responsive } from 'theme';

export interface InvestmentDetailsProps {
  investmentData: Partial<Investment>;
  useAuthHook?: unknown;
  showInvestmentDocumentsUploadButton?: boolean;
  uploadInvestmentDocument?: UploadDocument<InvestmentFileType>;
}

type TabValue = 'investmentDetails' | 'news';

interface Tab {
  label: string;
  value: TabValue;
}

export const InvestmentDetails: FC<InvestmentDetailsProps> = (
  props: InvestmentDetailsProps
): JSX.Element => {
  const { investmentData, showInvestmentDocumentsUploadButton, uploadInvestmentDocument } = props;
  const { user } = useAuth();
  const { t } = useTranslation();
  const tabs: Tab[] = [
    { label: t('investment.details.investmentDetailsTab'), value: 'investmentDetails' },
    { label: t('investment.details.newsTab'), value: 'news' },
  ];

  investmentData.createdAt = new Date(investmentData.createdAt).toISOString();
  investmentData.updatedAt = new Date(investmentData.updatedAt).toISOString();

  const [currentTab, setCurrentTab] = useState<TabValue>('investmentDetails');
  const handleTabsChange = (event: ChangeEvent<{}>, value: TabValue): void => {
    setCurrentTab(value);
  };

  const renderTabContent = (currentTab: TabValue) => {
    let component: JSX.Element;
    switch (currentTab) {
      case 'news':
        component = (
          <Box sx={{ background: 'paper', p: 2 }}>
            <Typography color="textPrimary" variant="h6">
              {t('investment.details.news')}
            </Typography>
          </Box>
        );
        break;
      case 'investmentDetails':
        component = (
          <InvestmentDetailsTab
            investmentData={investmentData}
            showInvestmentDocumentsUploadButton={showInvestmentDocumentsUploadButton}
            uploadInvestmentDocument={uploadInvestmentDocument}
          />
        );
        break;
      default:
        component = <div></div>;
        break;
    }
    return component;
  };

  return (
    <>
      {user.role === 'INVESTOR' && (
        <StatusStepper
          steps={investmentStepperStatuses}
          activeStep={investmentStepperStatuses.indexOf(
            getInvestmentStepperStatusString(investmentData.status)
          )}
        />
      )}
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
          {tabs.map((tab, index) => (
            <Tab key={`investmentDetails.${index}`} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Box sx={{ borderRadius: '8px', border: '1px solid #E3E5E6', padding: '16px' }}>
          {renderTabContent(currentTab)}
        </Box>
      </Box>
    </>
  );
};
