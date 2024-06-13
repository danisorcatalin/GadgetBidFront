import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { InvestmentsDocumentsTable } from './InvestmentsDocumentsTable';
import { mockInvestmentsDocumentsTableProps } from './InvestmentsDocumentsTable.mock';

import type { InvestmentsDocumentsTableProps } from './InvestmentsDocumentsTable';

export default {
  title: 'Dashboard/InvestorProfile/InvestmentsDocumentsTable',
  component: InvestmentsDocumentsTable,
} as ComponentMeta<typeof InvestmentsDocumentsTable>;

const Template: ComponentStory<typeof InvestmentsDocumentsTable> = (args) => (
  <InvestmentsDocumentsTable {...args} />
);

export const Primary: Story<InvestmentsDocumentsTableProps> = Template.bind({});
Primary.args = {
  ...mockInvestmentsDocumentsTableProps,
};
