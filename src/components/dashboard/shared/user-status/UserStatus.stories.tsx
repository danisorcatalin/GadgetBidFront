import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { UserStatus, UserStatusProps } from './UserStatus';

import { InvestorOnboardStatusEnum } from 'types/user';

export default {
  title: 'Dashboard/UserStatus',
  component: UserStatus,
  argTypes: {
    status: {
      options: Object.keys(InvestorOnboardStatusEnum),
      mapping: InvestorOnboardStatusEnum,
      status: { control: 'select' },
    },
  },
  parameters: {
    status: {
      values: Object.keys(InvestorOnboardStatusEnum),
    },
  },
} as ComponentMeta<typeof UserStatus>;

const Template: ComponentStory<typeof UserStatus> = (args) => <UserStatus {...args} />;

export const Primary: Story<UserStatusProps> = Template.bind({});
Primary.args = {
  status: InvestorOnboardStatusEnum.OPEN,
};
