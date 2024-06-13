import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import {
  CampaignDescriptionTextEditor,
  CampaignDescriptionTextEditorProps,
} from './CampaignDescriptionTextEditor';
import { mockCampaignDescriptionTextEditorProps } from './CampaignDescriptionTextEditor.mock';

export default {
  title: 'Dashboard/CampaignsPage/CampaignDescriptionTextEditor',
  component: CampaignDescriptionTextEditor,
} as ComponentMeta<typeof CampaignDescriptionTextEditor>;

const Template: ComponentStory<typeof CampaignDescriptionTextEditor> = (args) => (
  <CampaignDescriptionTextEditor {...args} />
);

export const Primary: Story<CampaignDescriptionTextEditorProps> = Template.bind({});
Primary.args = {
  ...mockCampaignDescriptionTextEditorProps,
};
