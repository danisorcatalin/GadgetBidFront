import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { ShareholdersTab, ShareholdersTabProps } from './ShareholdersTab';
import { mockShareholdersTabProps } from './ShareholdersTab.mock';

export default {
  title: 'Dashboard/IssuerProfile/ShareholdersTab',
  component: ShareholdersTab,
} as ComponentMeta<typeof ShareholdersTab>;

const Template: ComponentStory<typeof ShareholdersTab> = (args) => <ShareholdersTab {...args} />;

export const Primary: Story<ShareholdersTabProps> = Template.bind({});
Primary.args = {
  ...mockShareholdersTabProps,
};
