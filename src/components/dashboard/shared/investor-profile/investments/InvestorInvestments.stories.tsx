import { Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { InvestorInvestments } from '.';
import { Components } from 'lib/GadgetClientJava';
import { BrowserRouter } from 'react-router-dom';
import { mockInvestments } from './InvestorInvestments.mock';

export default {
  title: 'Dashboard/Investor/InvestorInvestments',
  component: InvestorInvestments,
} as ComponentMeta<typeof InvestorInvestments>;

const Template: ComponentStory<typeof InvestorInvestments> = (args) => (
  <BrowserRouter>
    <InvestorInvestments {...args} />
  </BrowserRouter>
);

export const Primary: Story<{ data: Components.Schemas.InvestmentDto[] }> = Template.bind({});
Primary.args = {
  ...mockInvestments,
};
