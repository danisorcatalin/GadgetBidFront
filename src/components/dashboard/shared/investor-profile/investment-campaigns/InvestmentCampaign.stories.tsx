import { Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { InvestmentCampaigns, InvestmentCampaignsProps } from './InvestmentCampaigns';
import { investmentCampaignsMock } from './InvestmentCampaigns.mock';

const mockInvestmentCampaigns: InvestmentCampaignsProps = {
  campaignsList: investmentCampaignsMock,
};

export default {
  title: 'Dashboard/Investor/InvestmentCampaigns',
  component: InvestmentCampaigns,
} as ComponentMeta<typeof InvestmentCampaigns>;

const Template: ComponentStory<typeof InvestmentCampaigns> = (args) => (
  <InvestmentCampaigns {...args} />
);

export const Primary: Story<InvestmentCampaignsProps> = Template.bind({});
Primary.args = {
  ...mockInvestmentCampaigns,
};
