import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { LanguageSwitcher } from './LanguageSwitcher';

export default {
  title: 'NewUI/LanguageSwitcher',
  component: LanguageSwitcher,
} as ComponentMeta<typeof LanguageSwitcher>;

const Template: ComponentStory<typeof LanguageSwitcher> = (args: object) => <LanguageSwitcher {...args} />;

export const Primary: Story<typeof LanguageSwitcher> = Template.bind({});
Primary.args = {};
