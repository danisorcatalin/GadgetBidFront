import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CompanyDetailsForm, CompanyDetailsFormProps } from './CompanyDetailsForm';
import { mockCompanyDetailsFormProps } from './CompanyDetailsForm.mock';

export default {
  title: 'Dashboard/IssuerProfile/CompanyDetailsForm',
  component: CompanyDetailsForm,
} as ComponentMeta<typeof CompanyDetailsForm>;

const Template: ComponentStory<typeof CompanyDetailsForm> = (args) => (
  <CompanyDetailsForm {...args} />
);

export const Primary: Story<CompanyDetailsFormProps> = Template.bind({});
Primary.args = {
  ...mockCompanyDetailsFormProps,
};
