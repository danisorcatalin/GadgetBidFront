import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignQaTab, CampaignQaTabProps } from './CampaignQaTab';
import { mockCampaignQaTabProps } from './CampaignQaTab.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignQaTab',
  component: CampaignQaTab,
} as ComponentMeta<typeof CampaignQaTab>;

const Template: ComponentStory<typeof CampaignQaTab> = (args) => <CampaignQaTab {...args} />;

export const Primary: Story<CampaignQaTabProps> = Template.bind({});
Primary.args = {
  ...mockCampaignQaTabProps,
};
