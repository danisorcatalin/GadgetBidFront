import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignYoutubeTab, CampaignYoutubeTabProps } from './CampaignYoutubeTab';
import { mockCampaignYoutubeTabProps } from './CampaignYoutubeTab.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignYoutubeTab',
  component: CampaignYoutubeTab,
} as ComponentMeta<typeof CampaignYoutubeTab>;

const Template: ComponentStory<typeof CampaignYoutubeTab> = (args) => (
  <CampaignYoutubeTab {...args} />
);

export const Primary: Story<CampaignYoutubeTabProps> = Template.bind({});
Primary.args = {
  ...mockCampaignYoutubeTabProps,
};
