import { Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { CampaignStatusActionBar } from './CampaignStatusActionBar';
import { mockCampaignStatusActionBarProps } from './CampaignStatusActionBar.mock';

import type { CampaignStatusActionBarProps } from './CampaignStatusActionBar';

export default {
  title: 'Dashboard/CampaignsPage/CampaignStatusActionBar',
  component: CampaignStatusActionBar,
} as ComponentMeta<typeof CampaignStatusActionBar>;

const Template: ComponentStory<typeof CampaignStatusActionBar> = (args) => (
  <CampaignStatusActionBar {...args} />
);

export const Primary: Story<CampaignStatusActionBarProps> = Template.bind({});
Primary.args = {
  ...mockCampaignStatusActionBarProps,
};
