import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import {
  IssuerOnboardingDocumentsTable,
  IssuerOnboardingDocumentsTableProps,
} from './IssuerOnboardingDocumentsTable';
import { mockIssuerOnboardingDocumentsTableProps } from './IssuerOnboardingDocumentsTable.mock';

export default {
  title: 'Dashboard/IssuerProfile/IssuerOnboardingDocumentsTable',
  component: IssuerOnboardingDocumentsTable,
} as ComponentMeta<typeof IssuerOnboardingDocumentsTable>;

const Template: ComponentStory<typeof IssuerOnboardingDocumentsTable> = (args) => (
  <IssuerOnboardingDocumentsTable {...args} />
);

export const Primary: Story<IssuerOnboardingDocumentsTableProps> = Template.bind({});
Primary.args = {
  ...mockIssuerOnboardingDocumentsTableProps,
};
