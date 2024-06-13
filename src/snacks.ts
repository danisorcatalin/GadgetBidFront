export const RegisterSuccessSnack = {
  message: 'Waiting for email confirmation',
  opts: {
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'top',
    },
    variant: 'info',
  },
};

const anchorOrigin = {
  horizontal: 'right',
  vertical: 'top',
};

type SnackTuple = [string, unknown];

const createOpts = (variant) => ({ anchorOrigin, variant });

export const WalletQrCodeSuccess: SnackTuple = ['Wallet ID saved', createOpts('success')];
export const WalletQrCodeFail: SnackTuple = ['Unable to save Wallet ID', createOpts('error')];
export const WalletQrCodeRemoveSuccess: SnackTuple = ['Wallet removed', createOpts('success')];
export const WalletQrCodeRemoveFail: SnackTuple = ['Unable to remove wallet', createOpts('error')];

export const CompanyInfoSaveSuccess: SnackTuple = [
  'Company information saved',
  createOpts('success'),
];
export const CompanyInfoSaveFail: SnackTuple = [
  'Unable to save company information',
  createOpts('error'),
];
export const CompanyMemberSaveSuccess: SnackTuple = ['Company member saved', createOpts('success')];
export const CompanyMemberSaveFail: SnackTuple = [
  'Unable to save company member',
  createOpts('error'),
];
export const CompanyMemberDeleteSuccess: SnackTuple = [
  'Company member removed',
  createOpts('success'),
];
export const CompanyMemberDeleteFail: SnackTuple = [
  'Unable to remove company member',
  createOpts('error'),
];

export const InvestorInformationUpdateSuccess: SnackTuple = [
  'Updated successfully',
  createOpts('success'),
];
export const InvestorInformationUpdateFail: SnackTuple = [
  'Unable to update data',
  createOpts('error'),
];

export const CampaignInfoUpdateSuccess: SnackTuple = [
  'Campaign details updated successfully',
  createOpts('success'),
];
export const CampaignInfoUpdateFail: SnackTuple = [
  'Failed to update campaign details',
  createOpts('error'),
];

export const CampaignFinalizeSuccess: SnackTuple = [
  'Campaign ready to be reviewed by GadgetBid!',
  createOpts('success'),
];
export const CampaignFinalizeFail: SnackTuple = [
  'Failed to finalize campaign',
  createOpts('error'),
];

export const InvestmentSaveSuccess: SnackTuple = [
  'Your investment was saved successfully',
  createOpts('success'),
];
export const InvestmentSaveFail: SnackTuple = [
  'Failed to save your investment',
  createOpts('error'),
];

export const TokenizationStartSuccess: SnackTuple = [
  'Tokenization process started',
  createOpts('success'),
];

export const TokenizationStartError: SnackTuple = [
  'Tokenization process failed to start',
  createOpts('error'),
];

export const TokenizationFinishSuccess: SnackTuple = [
  'Tokens issued successfully',
  createOpts('success'),
];

export const PresubscribeToCampaignFail: SnackTuple = [
  'Failed to presubscribe to campaign',
  createOpts('error'),
];

export const PresubscribeToCampaignSuccess: SnackTuple = [
  'Successfully presubscribed to campaign !',
  createOpts('success'),
];

export const PresubscribeCancelFeedbackFail: SnackTuple = [
  'Failed to submit feedback',
  createOpts('success'),
];

export const TokenizationFinishFail: SnackTuple = ['Failed to issue tokens', createOpts('error')];

export const NewsFeedCreateSuccess: SnackTuple = ['Was successfully posted', createOpts('success')];

export const NewsFeedCreateError: SnackTuple = ['A posting error occurred', createOpts('error')];
export const NewsFeedUpdateSuccess: SnackTuple = [
  'Was successfully updated',
  createOpts('success'),
];

export const NewsFeedUpdateError: SnackTuple = ['An update error occurred', createOpts('error')];
