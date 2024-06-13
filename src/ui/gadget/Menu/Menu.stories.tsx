import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { Menu } from './Menu';
import { userDataMock } from 'mocks/userData';

export default {
  title: 'NewUI/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Primary: Story<typeof Menu> = Template.bind({});
Primary.args = {
  user: userDataMock,
};
