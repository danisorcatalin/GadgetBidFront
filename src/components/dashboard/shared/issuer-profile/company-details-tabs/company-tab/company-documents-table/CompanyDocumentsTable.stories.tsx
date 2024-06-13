import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { CompanyDocumentsTable, CompanyDocumentsTableProps } from './CompanyDocumentsTable';
import { mockCompanyDocumentsTableProps } from './CompanyDocumentsTable.mock';

export default {
  title: 'Dashboard/IssuerProfile/CompanyDocumentsTable',
  component: CompanyDocumentsTable,
} as ComponentMeta<typeof CompanyDocumentsTable>;

const Template: ComponentStory<typeof CompanyDocumentsTable> = (args) => (
  <CompanyDocumentsTable {...args} />
);

export const Primary: Story<CompanyDocumentsTableProps> = Template.bind({});
Primary.args = {
  ...mockCompanyDocumentsTableProps,
};
