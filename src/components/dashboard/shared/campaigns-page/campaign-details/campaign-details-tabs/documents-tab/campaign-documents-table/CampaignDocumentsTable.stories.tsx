import { Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { CampaignDocumentsTable } from './CampaignDocumentsTable';
import { mockCampaignDocumentsTableProps } from './CampaignDocumentsTable.mock';

import type { CampaignDocumentsTableProps } from './CampaignDocumentsTable';

export default {
  title: 'Dashboard/CampaignsPage/CampaignDocumentsTable',
  component: CampaignDocumentsTable,
} as ComponentMeta<typeof CampaignDocumentsTable>;

const Template: ComponentStory<typeof CampaignDocumentsTable> = (args) => (
  <CampaignDocumentsTable {...args} />
);

export const Primary: Story<CampaignDocumentsTableProps> = Template.bind({});
Primary.args = {
  ...mockCampaignDocumentsTableProps,
};
