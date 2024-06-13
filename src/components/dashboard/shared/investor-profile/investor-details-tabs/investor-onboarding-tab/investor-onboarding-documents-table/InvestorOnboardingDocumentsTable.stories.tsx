import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import {
  InvestorOnboardingDocumentsTable,
  InvestorOnboardingDocumentsTableProps,
} from './InvestorOnboardingDocumentsTable';
import { mockInvestorOnboardingDocumentsTableProps } from './InvestorOnboardingDocumentsTable.mock';

export default {
  title: 'Dashboard/InvestorProfile/InvestorOnboardingDocumentsTable',
  component: InvestorOnboardingDocumentsTable,
} as ComponentMeta<typeof InvestorOnboardingDocumentsTable>;

const Template: ComponentStory<typeof InvestorOnboardingDocumentsTable> = (args) => (
  <InvestorOnboardingDocumentsTable {...args} />
);

export const Primary: Story<InvestorOnboardingDocumentsTableProps> = Template.bind({});
Primary.args = {
  ...mockInvestorOnboardingDocumentsTableProps,
};
