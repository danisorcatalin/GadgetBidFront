import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignRisksTab, CampaignRisksTabProps } from './CampaignRisksTab';
import { mockCampaignRisksTabProps } from './CampaignRisksTab.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignRisksTab',
  component: CampaignRisksTab,
} as ComponentMeta<typeof CampaignRisksTab>;

const Template: ComponentStory<typeof CampaignRisksTab> = (args) => <CampaignRisksTab {...args} />;

export const Primary: Story<CampaignRisksTabProps> = Template.bind({});
Primary.args = {
  ...mockCampaignRisksTabProps,
};
