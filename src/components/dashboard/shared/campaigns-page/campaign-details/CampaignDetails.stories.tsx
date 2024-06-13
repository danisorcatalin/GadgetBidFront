import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignDetails, CampaignDetailsProps } from './CampaignDetails';
import { mockCampaignDetailsProps } from './CampaignDetails.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignDetails',
  component: CampaignDetails,
} as ComponentMeta<typeof CampaignDetails>;

const Template: ComponentStory<typeof CampaignDetails> = (args) => <CampaignDetails {...args} />;

export const Primary: Story<CampaignDetailsProps> = Template.bind({});
Primary.args = {
  ...mockCampaignDetailsProps,
};
