import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import Login from './Login';

export default {
  title: 'NewUI/Login',
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Primary: Story<typeof Login> = Template.bind({});
Primary.args = {};
