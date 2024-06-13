import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignQaTextEditor, CampaignQaTextEditorProps } from './CampaignQaTextEditor';
import { mockCampaignQaTextEditorProps } from './CampaignQaTextEditor.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignQaTextEditor',
  component: CampaignQaTextEditor,
} as ComponentMeta<typeof CampaignQaTextEditor>;

const Template: ComponentStory<typeof CampaignQaTextEditor> = (args) => (
  <CampaignQaTextEditor {...args} />
);

export const Primary: Story<CampaignQaTextEditorProps> = Template.bind({});
Primary.args = {
  ...mockCampaignQaTextEditorProps,
};
