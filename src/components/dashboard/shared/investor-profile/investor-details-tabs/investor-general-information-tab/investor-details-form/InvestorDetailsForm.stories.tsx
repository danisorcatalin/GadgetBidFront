import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { InvestorDetailsForm, InvestorDetailsFormProps } from './InvestorDetailsForm';
import { mockInvestorDetailsFormProps } from './InvestorDetailsForm.mock';

export default {
  title: 'Dashboard/InvestorProfile/InvestorDetailsForm',
  component: InvestorDetailsForm,
} as ComponentMeta<typeof InvestorDetailsForm>;

const Template: ComponentStory<typeof InvestorDetailsForm> = (args) => (
  <InvestorDetailsForm {...args} />
);

export const Primary: Story<InvestorDetailsFormProps> = Template.bind({});
Primary.args = {
  ...mockInvestorDetailsFormProps,
};
