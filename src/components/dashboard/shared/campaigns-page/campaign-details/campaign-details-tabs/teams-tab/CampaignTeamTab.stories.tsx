import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignTeamTab, CampaignTeamTabProps } from './CampaignTeamTab';
import { mockCampaignTeamTabProps } from './CampaignTeamTab.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignTeamTab',
  component: CampaignTeamTab,
} as ComponentMeta<typeof CampaignTeamTab>;

const Template: ComponentStory<typeof CampaignTeamTab> = (args) => <CampaignTeamTab {...args} />;

export const Primary: Story<CampaignTeamTabProps> = Template.bind({});
Primary.args = {
  ...mockCampaignTeamTabProps,
};
