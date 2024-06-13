import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { InvestmentDetailsTab, InvestmentDetailsTabProps } from './InvestmentDetailsTab';
import { mockInvestmentDetailsTabProps } from './InvestmentDetailsTab.mock';

export default {
  title: 'Dashboard/InvestorProfile/InvestmentDetailsTab',
  component: InvestmentDetailsTab,
} as ComponentMeta<typeof InvestmentDetailsTab>;

const Template: ComponentStory<typeof InvestmentDetailsTab> = (args) => (
  <InvestmentDetailsTab {...args} />
);

export const Primary: Story<InvestmentDetailsTabProps> = Template.bind({});
Primary.args = {
  ...mockInvestmentDetailsTabProps,
};
