import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { ShareholdersDynamicForm, ShareholdersDynamicFormProps } from './ShareholdersDynamicForm';
import { mockShareholdersDynamicFormProps } from './ShareholdersDynamicForm.mock';

export default {
  title: 'Dashboard/IssuerProfile/ShareholdersDynamicForm',
  component: ShareholdersDynamicForm,
} as ComponentMeta<typeof ShareholdersDynamicForm>;

const Template: ComponentStory<typeof ShareholdersDynamicForm> = (args) => (
  <ShareholdersDynamicForm {...args} />
);

export const Primary: Story<ShareholdersDynamicFormProps> = Template.bind({});
Primary.args = {
  ...mockShareholdersDynamicFormProps,
};
