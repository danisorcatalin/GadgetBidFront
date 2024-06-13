import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import {
  InvestorGeneralInformationTab,
  InvestorGeneralInformationTabProps,
} from './InvestorGeneralInformationTab';
import { mockInvestorGeneralInformationTabProps } from './InvestorGeneralInformationTab.mock';

export default {
  title: 'Dashboard/InvestorProfile/InvestorGeneralInformationTab',
  component: InvestorGeneralInformationTab,
} as ComponentMeta<typeof InvestorGeneralInformationTab>;

const Template: ComponentStory<typeof InvestorGeneralInformationTab> = (args) => (
  <InvestorGeneralInformationTab {...args} />
);

export const Primary: Story<InvestorGeneralInformationTabProps> = Template.bind({});
Primary.args = {
  ...mockInvestorGeneralInformationTabProps,
};
