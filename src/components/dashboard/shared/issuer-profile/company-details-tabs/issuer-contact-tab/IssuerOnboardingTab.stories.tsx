import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { IssuerContactTab, IssuerOnboardingTabProps } from './IssuerContactTab';
import { mockIssuerOnboardingTabProps } from './IssuerOnboardingTab.mock';

export default {
  title: 'Dashboard/IssuerProfile/IssuerOnboardingTab',
  component: IssuerContactTab,
} as ComponentMeta<typeof IssuerContactTab>;

const Template: ComponentStory<typeof IssuerContactTab> = (args) => <IssuerContactTab {...args} />;

export const Primary: Story<IssuerOnboardingTabProps> = Template.bind({});
Primary.args = {
  ...mockIssuerOnboardingTabProps,
};
