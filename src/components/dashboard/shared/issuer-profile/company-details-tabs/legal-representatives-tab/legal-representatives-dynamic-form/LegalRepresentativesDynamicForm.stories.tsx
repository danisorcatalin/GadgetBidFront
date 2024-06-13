import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import {
  LegalRepresentativesDynamicForm,
  LegalRepresentativesDynamicFormProps,
} from './LegalRepresentativesDynamicForm';
import { mockLegalRepresentativesDynamicFormProps } from './LegalRepresentativesDynamicForm.mock';

export default {
  title: 'Dashboard/IssuerProfile/LegalRepresentativesDynamicForm',
  component: LegalRepresentativesDynamicForm,
} as ComponentMeta<typeof LegalRepresentativesDynamicForm>;

const Template: ComponentStory<typeof LegalRepresentativesDynamicForm> = (args) => (
  <LegalRepresentativesDynamicForm {...args} />
);

export const Primary: Story<LegalRepresentativesDynamicFormProps> = Template.bind({});
Primary.args = {
  ...mockLegalRepresentativesDynamicFormProps,
};
