import { Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { NewsFeed, NewsFeedProps } from '.';
import { BrowserRouter } from 'react-router-dom';
import { mockNewsFeed } from './NewsFeed.mock';

export default {
  title: 'Dashboard/NewsFeed',
  component: NewsFeed,
} as ComponentMeta<typeof NewsFeed>;

const Template: ComponentStory<typeof NewsFeed> = (args) => (
  <BrowserRouter>
    <NewsFeed {...args} />
  </BrowserRouter>
);

export const Primary: Story<NewsFeedProps> = Template.bind({});
Primary.args = {
  ...mockNewsFeed,
};
