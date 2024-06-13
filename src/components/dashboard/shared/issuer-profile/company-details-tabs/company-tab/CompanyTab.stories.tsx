import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CompanyTab, CompanyTabProps } from './CompanyTab';
import { mockCompanyTabProps } from './CompanyTab.mock';

export default {
  title: 'Dashboard/IssuerProfile/CompanyTab',
  component: CompanyTab,
} as ComponentMeta<typeof CompanyTab>;

const Template: ComponentStory<typeof CompanyTab> = (args) => <CompanyTab {...args} />;

export const Primary: Story<CompanyTabProps> = Template.bind({});
Primary.args = {
  ...mockCompanyTabProps,
};
