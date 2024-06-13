import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignRisksTextEditor, CampaignRisksTextEditorProps } from './CampaignRisksTextEditor';
import { mockCampaignRisksTextEditorProps } from './CampaignRisksTextEditor.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignRisksTextEditor',
  component: CampaignRisksTextEditor,
} as ComponentMeta<typeof CampaignRisksTextEditor>;

const Template: ComponentStory<typeof CampaignRisksTextEditor> = (args) => (
  <CampaignRisksTextEditor {...args} />
);

export const Primary: Story<CampaignRisksTextEditorProps> = Template.bind({});
Primary.args = {
  ...mockCampaignRisksTextEditorProps,
};
