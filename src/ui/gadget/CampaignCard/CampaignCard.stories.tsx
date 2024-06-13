import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignCard, CampaignCardProps } from './CampaignCard';
import { campaignDataMock } from 'mocks';

export default {
  title: 'NewUI/CampaignCard',
  component: CampaignCard,
} as ComponentMeta<typeof CampaignCard>;

const Template: ComponentStory<typeof CampaignCard> = (args) => <CampaignCard {...args} />;

export const Primary: Story<CampaignCardProps> = Template.bind({});
Primary.args = { campaignData: campaignDataMock, hasDetails: true };
