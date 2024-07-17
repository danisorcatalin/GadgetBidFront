import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Divider, Link, Typography } from '@mui/material';
import { Spacer } from 'components/Spacer';
import { useAuth } from 'hooks';
import { useGetUserById } from 'api';
import { useTranslation } from 'react-i18next';
import { BusinessValidations } from 'utils/business-validations';
import { responsive } from 'theme';

const IssuerOverview = (): JSX.Element => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: userData } = useGetUserById(user.id);
  const businessValidations = new BusinessValidations(userData);
  const allGood =
    businessValidations.isCompanyProfileCompleted() &&
    businessValidations.isIssuerApplicationApproved() &&
    businessValidations.userHasCampaignStarted();

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          mt: 5.5,
          border: '1px solid #E3E5E6',
          borderRadius: '8px',
          letterSpacing: '-0.88px',
        }}
      >
        <Typography sx={{ color: '#000000' }} variant="h1">
          {t('issuer.overview.welcome')}
        </Typography>
        <Spacer marginBottom="20px" />
        <Typography
          sx={{
            color: '#000000',
            fontSize: '16.5px !important',
            letterSpacing: '-0.33px',
            textAlign: 'left',
          }}
        >
          {allGood ? t('issuer.overview.allGood') : t('issuer.overview.steps')}
        </Typography>
        <Spacer marginBottom="20px" />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              sx={{ color: '#000000', display: 'flex', py: 3, alignItems: 'center' }}
              variant="h1"
            >
              <Typography sx={responsive.issuerOverview.text}>1</Typography>
              {businessValidations.isCompanyProfileCompleted() ? (
                <Box>{t('issuer.overview.stepOneCheck')}</Box>
              ) : (
                <Box>
                  {t('issuer.overview.stepOne')}
                  <Link underline="none" href="/dashboard/company-profile">
                    &nbsp;{t('issuer.overview.profile')}
                  </Link>
                </Box>
              )}
            </Typography>
          </Box>
          {businessValidations.isCompanyProfileCompleted() ? (
            <Box>
              <CheckCircleOutlineIcon sx={responsive.issuerOverview.checkIcon} />
            </Box>
          ) : null}
        </Box>
        <Divider sx={{ color: '#96B7DB' }} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              sx={{ color: '#000000', display: 'flex', py: 3, alignItems: 'center' }}
              variant="h1"
            >
              <Typography sx={responsive.issuerOverview.text}>2</Typography>
              {businessValidations.isIssuerApplicationApproved() ? (
                <Box>{t('issuer.overview.stepTwoCheck')}</Box>
              ) : (
                <Box>{t('issuer.overview.stepTwo')}</Box>
              )}
            </Typography>
          </Box>
          {businessValidations.isIssuerApplicationApproved() ? (
            <Box>
              <CheckCircleOutlineIcon sx={responsive.issuerOverview.checkIcon} />
            </Box>
          ) : null}
        </Box>
        <Divider sx={{ color: '#96B7DB' }} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              sx={{ color: '#000000', display: 'flex', py: 3, alignItems: 'center' }}
              variant="h1"
            >
              <Typography sx={responsive.issuerOverview.text}>3</Typography>
              {businessValidations.userHasCampaignStarted() ? (
                <Box>{t('issuer.overview.stepThreeCheck')}</Box>
              ) : (
                <Box>
                  {t('issuer.overview.stepThree')}
                  <Link underline="none" href="/dashboard/crowdfunding-campaign">
                    &nbsp;{t('issuer.overview.firstCampaign')}
                  </Link>
                </Box>
              )}
            </Typography>
          </Box>
          {businessValidations.userHasCampaignStarted() ? (
            <Box>
              <CheckCircleOutlineIcon sx={responsive.issuerOverview.checkIcon} />
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default IssuerOverview;
