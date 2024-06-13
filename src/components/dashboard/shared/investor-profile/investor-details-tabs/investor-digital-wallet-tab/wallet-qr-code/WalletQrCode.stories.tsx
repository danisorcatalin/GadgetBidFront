import { Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { WalletQrCode } from './WalletQrCode';
import { walletQrCodeMock } from './WalletQrCode.mock';

import type { WalletQrCodeProps } from './WalletQrCode';

export default {
  title: 'Dashboard/InvestorProfile/WalletQrCode',
  component: WalletQrCode,
} as ComponentMeta<typeof WalletQrCode>;

const Template: ComponentStory<typeof WalletQrCode> = (args) => <WalletQrCode {...args} />;

export const Primary: Story<WalletQrCodeProps> = Template.bind({});
Primary.args = {
  ...walletQrCodeMock,
};
