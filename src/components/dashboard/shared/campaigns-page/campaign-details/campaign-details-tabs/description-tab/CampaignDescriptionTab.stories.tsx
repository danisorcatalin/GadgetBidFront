import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignDescriptionTab, CampaignDescriptionTabProps } from './CampaignDescriptionTab';
import { mockCampaignDescriptionTabProps } from './CampaignDescriptionTab.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignDescriptionTab',
  component: CampaignDescriptionTab,
} as ComponentMeta<typeof CampaignDescriptionTab>;

const Template: ComponentStory<typeof CampaignDescriptionTab> = (args) => (
  <CampaignDescriptionTab {...args} />
);

export const Primary: Story<CampaignDescriptionTabProps> = Template.bind({});
Primary.args = {
  ...mockCampaignDescriptionTabProps,
};
