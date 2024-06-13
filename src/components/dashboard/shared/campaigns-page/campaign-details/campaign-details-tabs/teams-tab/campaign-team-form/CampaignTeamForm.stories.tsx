import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignTeamForm, CampaignTeamFormProps } from './CampaignTeamForm';
import { mockCampaignTeamFormProps } from './CampaignTeamForm.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignTeamForm',
  component: CampaignTeamForm,
} as ComponentMeta<typeof CampaignTeamForm>;

const Template: ComponentStory<typeof CampaignTeamForm> = (args) => <CampaignTeamForm {...args} />;

export const Primary: Story<CampaignTeamFormProps> = Template.bind({});
Primary.args = {
  ...mockCampaignTeamFormProps,
};
