import { Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { CampaignDocumentsTab } from './CampaignDocumentsTab';
import { mockCampaignDocumentsTabProps } from './CampaignDocumentsTab.mock';

import type { CampaignDocumentsTabProps } from './CampaignDocumentsTab';

export default {
  title: 'Dashboard/CampaignsPage/CampaignDocumentsTab',
  component: CampaignDocumentsTab,
} as ComponentMeta<typeof CampaignDocumentsTab>;

const Template: ComponentStory<typeof CampaignDocumentsTab> = (args) => (
  <CampaignDocumentsTab {...args} />
);

export const Primary: Story<CampaignDocumentsTabProps> = Template.bind({});
Primary.args = {
  ...mockCampaignDocumentsTabProps,
};
