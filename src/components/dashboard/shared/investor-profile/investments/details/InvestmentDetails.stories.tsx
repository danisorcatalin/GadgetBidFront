import { Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { InvestmentDetails, InvestmentDetailsProps } from './InvestmentDetails';
import { mockInvestmentDetailsProps } from './InvestmentDetails.mock';

export default {
  title: 'Dashboard/InvestorProfile/InvestmentDetails',
  component: InvestmentDetails,
} as ComponentMeta<typeof InvestmentDetails>;

const Template: ComponentStory<typeof InvestmentDetails> = (args) => (
  <InvestmentDetails {...args} />
);

export const Primary: Story<InvestmentDetailsProps> = Template.bind({});
Primary.args = {
  ...mockInvestmentDetailsProps,
};
