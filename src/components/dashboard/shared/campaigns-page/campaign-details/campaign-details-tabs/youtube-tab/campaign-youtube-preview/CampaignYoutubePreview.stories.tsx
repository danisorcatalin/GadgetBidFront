import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignYoutubePreview, CampaignYoutubePreviewProps } from './CampaignYoutubePreview';
import { mockCampaignYoutubePreviewProps } from './CampaignYoutubePreview.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignYoutubePreview',
  component: CampaignYoutubePreview,
} as ComponentMeta<typeof CampaignYoutubePreview>;

const Template: ComponentStory<typeof CampaignYoutubePreview> = (args) => (
  <CampaignYoutubePreview {...args} />
);

export const Primary: Story<CampaignYoutubePreviewProps> = Template.bind({});
Primary.args = {
  ...mockCampaignYoutubePreviewProps,
};
