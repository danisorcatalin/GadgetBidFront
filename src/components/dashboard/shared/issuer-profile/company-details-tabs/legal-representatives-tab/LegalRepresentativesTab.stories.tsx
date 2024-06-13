import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { LegalRepresentativesTab, LegalRepresentativesTabProps } from './LegalRepresentativesTab';
import { mockLegalRepresentativesTabProps } from './LegalRepresentativesTab.mock';

export default {
  title: 'Dashboard/IssuerProfile/LegalRepresentativesTab',
  component: LegalRepresentativesTab,
} as ComponentMeta<typeof LegalRepresentativesTab>;

const Template: ComponentStory<typeof LegalRepresentativesTab> = (args) => (
  <LegalRepresentativesTab {...args} />
);

export const Primary: Story<LegalRepresentativesTabProps> = Template.bind({});
Primary.args = {
  ...mockLegalRepresentativesTabProps,
};
