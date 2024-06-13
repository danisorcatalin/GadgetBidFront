import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { InvestmentDetailsForm, InvestmentDetailsFormProps } from './InvestmentDetailsForm';
import { mockInvestmentDetailsFormProps } from './InvestmentDetailsForm.mock';

export default {
  title: 'Dashboard/InvestorProfile/InvestmentDetailsForm',
  component: InvestmentDetailsForm,
} as ComponentMeta<typeof InvestmentDetailsForm>;

const Template: ComponentStory<typeof InvestmentDetailsForm> = (args) => (
  <InvestmentDetailsForm {...args} />
);

export const Primary: Story<InvestmentDetailsFormProps> = Template.bind({});
Primary.args = {
  ...mockInvestmentDetailsFormProps,
};
