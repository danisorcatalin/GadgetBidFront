import { Box } from '@mui/material';
import { InvestorDetailsTabs } from './investor-details-tabs/InvestorDetailsTabs';

import type { FC } from 'react';
import type {
  InvestorOnboardFileType,
  UserKycFile,
  UserOnboardOutputDto,
  UserOutputSingleDto,
} from 'types/user';
import { InvestorDetailsFormInputValues } from './investor-details-tabs/investor-general-information-tab/investor-details-form';
import { UploadDocument } from 'types/document';
import { SimpleInvestmentDto } from 'types/investment';

interface InvestorProfileProps {
  userData: Partial<UserOutputSingleDto>;
  onboard: UserOnboardOutputDto;
  userKycFiles: UserKycFile[];
  userInvestments: SimpleInvestmentDto[];
  showUserStatus?: boolean;
  isAdmin?: boolean;
  onInvestorDetailsSubmit?: (values: InvestorDetailsFormInputValues) => Promise<void>;
  uploadInvestorDocument?: UploadDocument<InvestorOnboardFileType>;
  saveWalletId?: (id: string) => Promise<void>;
  removeWalletId?: () => Promise<void>;
}

export const InvestorProfile: FC<InvestorProfileProps> = (props: InvestorProfileProps) => {
  const {
    userData = {},
    isAdmin = false,
    userInvestments = [],
    userKycFiles = [],
    onboard = {},
  } = props;

  return (
    <Box mt="12px">
      {/* <Box sx={{ display: 'flex', marginBottom: '16px' }}>
        {showUserStatus && <StyledUserStatus userType={currentUserType} status={status} />}
        <Box>
          <Typography variant="button" marginRight={1}>
            KYC Status:
          </Typography>
          <Button style={{ color: kycCompleted ? 'green' : 'red' }} size="large" variant="outlined">
            {`${kycCompleted}`.toUpperCase()}
          </Button>
        </Box>
      </Box> */}
      <InvestorDetailsTabs
        onboard={onboard}
        userKycFiles={userKycFiles}
        userInvestments={userInvestments}
        userData={userData}
        isAdmin={isAdmin}
      />
    </Box>
  );
};
