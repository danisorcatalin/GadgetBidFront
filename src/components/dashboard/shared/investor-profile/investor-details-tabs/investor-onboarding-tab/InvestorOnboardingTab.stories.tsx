import { Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { InvestorOnboardingTab, InvestorOnboardingTabProps } from './InvestorOnboardingTab';
import { mockInvestorOnboardingTabProps } from './InvestorOnboardingTab.mock';

export default {
  title: 'Dashboard/InvestorProfile/InvestorOnboardingTab',
  component: InvestorOnboardingTab,
} as ComponentMeta<typeof InvestorOnboardingTab>;

const Template: ComponentStory<typeof InvestorOnboardingTab> = (args) => (
  <InvestorOnboardingTab {...args} />
);

export const Primary: Story<InvestorOnboardingTabProps> = Template.bind({});
Primary.args = {
  ...mockInvestorOnboardingTabProps,
};
