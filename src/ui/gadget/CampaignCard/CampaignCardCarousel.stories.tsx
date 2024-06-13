import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CampaignCardCarousel, CampaignCardCarouselProps } from './CampaignCardCarousel';
import { campaignDataMock } from 'mocks';
import { Box } from '@mui/system';

export default {
  title: 'NewUI/CampaignCardCarousel',
  component: CampaignCardCarousel,
} as ComponentMeta<typeof CampaignCardCarousel>;

const Template: ComponentStory<typeof CampaignCardCarousel> = (args) => (
  <Box sx={{ width: 1024, border: '1px solid #000' }}>
    <CampaignCardCarousel {...args} />
  </Box>
);

export const Primary: Story<CampaignCardCarouselProps> = Template.bind({});
Primary.args = {
  campaignsData: [
    { ...campaignDataMock, id: 1 },
    { ...campaignDataMock, id: 2 },
    { ...campaignDataMock, id: 3 },
  ],
};
