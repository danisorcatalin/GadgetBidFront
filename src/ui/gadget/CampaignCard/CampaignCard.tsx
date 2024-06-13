import type { NewCampaign } from 'types/campaign';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Company } from 'types/company';
import { daysUntil, numberFormat } from 'utils/utils';
import { useTranslation } from 'react-i18next';
import { responsive } from 'theme';
import { useGetCampaignFilesById } from '../../../api';

const getStyles = ({ hasDetails, hasLogo, responsive }) => ({
  wrapper: {
    marginBottom: '16px',
    marginTop: '16px',
    marginRight: '16px',
    borderRadius: '8px',
    height: 'auto',
    maxWidth: hasDetails ? '488px' : '320px',
    width: 'auto',
    transition: 'all 0.5s',
    position: 'relative' as const,
    cursor: 'pointer',
    ':hover': {
      boxShadow: '0px 16px #CCCCCC',
      transition: 'all 0.5s',
      transform: 'translateY(-16px)',
    },
  },
  cover: {
    maxWidth: hasDetails ? '488px' : '320px',
    width: '100%',
    maxHeight: hasDetails ? '190px' : '208px',
    height: '100%',
    position: 'relative' as const,
    img: {
      maxHeight: hasDetails ? '190px' : '208px',
      height: '100%',
      maxWidth: hasDetails ? '488px' : '320px',
      width: '100%',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      objectFit: 'cover' as const,
    },
  },
  details: {
    backgroundColor: '#EBF0FF',
    maxWidth: hasDetails ? '488px' : '320px',
    width: '100%',
    height: 'auto',
    padding: '16px',
    borderBottomLeftRadius: hasDetails ? 'initial' : '8px',
    borderBottomRightRadius: hasDetails ? 'initial' : '8px',
    title: {
      color: '#000000',
      lineHeight: '24px',
      letterSpacing: '-0.22px',
    },
    subtitle: {
      paddingTop: '7px',
      paddingBottom: hasDetails ? '12px' : 0,
      color: '#000000',
      lineHeight: '18px',
      letterSpacing: '-0.33px',
      fontSize: '16.5px',
    },
  },
  footer: {
    backgroundColor: '#E3E5E6',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    maxWidth: hasDetails ? '488px' : '320px',
    width: '100%',
    height: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    ...responsive.carousel.card.footer,
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...responsive.carousel.card.footerBox,
    },
    text: {
      color: '#000000',
      lineHeight: '18px',
      letterSpacing: '-0.33px',
      fontSize: '16.5px',
      marginRight: '10px',
      ...responsive.carousel.card.footerText,
    },
    number: {
      color: '#3769FF',
      lineHeight: '24px',
      letterSpacing: '-0.44px',
      fontSize: '18px',
    },
  },
  gadgetLogo: {
    maxWidth: '125px',
    width: '100%',
    maxHeight: '119px',
    height: '100%',
    top: '14px',
    position: 'absolute' as const,
    left: '16px',
    img: {
      maxWidth: '25px',
      width: '100%',
      maxHeight: '19px',
      height: '100%',
      objectFit: 'contain' as const,
    },
  },
  logo: {
    backgroundColor: hasLogo ? '#fff' : '#00E600',
    borderRadius: '3px',
    maxWidth: '96px',
    width: '100%',
    maxHeight: '96px',
    height: '100%',
    top: 'calc(100% - 65px)',
    position: 'absolute' as const,
    right: '16px',
    img: {
      borderRadius: '3px',
      width: '100%',
      height: '100%',
      objectFit: 'contain' as const,
    },
    text: {
      color: '#000000',
      lineHeight: '25px',
      letterSpacing: '-0.44px',
      fontSize: '22px',
      padding: '4px',
    },
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    info: {
      color: '#3769FF',
      lineHeight: '12px',
      letterSpacing: '-0.22px',
      fontSize: '11px',
    },
  },
});

export interface CampaignCardProps {
  campaignData: NewCampaign;
  hasDetails?: boolean;
  isUpcoming?: boolean;
}

export const CampaignCard = (props: CampaignCardProps): JSX.Element => {
  const { campaignData = {} as NewCampaign, hasDetails, isUpcoming } = props;
  const { data: campaignFiles = [] } = useGetCampaignFilesById(campaignData.id);

  const {
    id,
    shortDescription,
    startDate,
    endDate,
    amountToRaise,
    maximumAmountToRaise,
    amountRaised,
    currency,
    company = {} as Company,
    valuation,
  } = campaignData;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logo = campaignFiles.find((file) => file.type === 'LOGO');
  const cover = campaignFiles.find((file) => file.type === 'COVER');

  const styles = getStyles({ hasDetails, hasLogo: !!logo, responsive });

  const percentage = Math.round((amountRaised / amountToRaise) * 100).toFixed(0) + '%';
  const progressBarValue = 100 * (amountRaised / amountToRaise);

  const onCardClick = () => {
    navigate(`/dashboard/investor-campaign/${id}`);
  };

  const daysLeft = isUpcoming ? daysUntil(new Date(startDate)) : daysUntil(new Date(endDate));

  return (
    <Box sx={styles.wrapper} onClick={onCardClick}>
      <Box sx={styles.cover}>
        <img src={cover && cover.filePath ? cover.filePath : null} />
        {logo ? (
          <Box sx={styles.logo}>
            <img src={logo.filePath ? logo.filePath : null} />
          </Box>
        ) : (
          <Box sx={styles.logo}>
            <Typography sx={styles.logo.text} variant="h2">
              {t('crowdfunding.campaign.logo')}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={styles.details}>
        <Typography sx={styles.details.title} variant="h3">
          {company?.name}
        </Typography>
        <Typography sx={styles.details.subtitle} variant="body1">
          {shortDescription}
        </Typography>
        {hasDetails && !isUpcoming ? (
          <Box>
            <Box sx={styles.progressBar}>
              <Typography sx={styles.progressBar.info}>
                {numberFormat(amountRaised, currency)} {t('crowdfunding.campaign.of')}{' '}
                {numberFormat(amountToRaise, currency)} {t('crowdfunding.campaign.raised')}
              </Typography>
              <Typography sx={styles.progressBar.info}>{percentage}</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              sx={{ height: '16px' }}
              value={progressBarValue > 100 ? 100 : progressBarValue}
            />
          </Box>
        ) : null}
      </Box>
      {hasDetails ? (
        <Box sx={styles.footer}>
          {isUpcoming ? (
            <Box sx={styles.footer.box}>
              <Typography sx={styles.footer.text} variant="body1">
                Target
              </Typography>
              <Typography sx={styles.footer.number} variant="body1">
                {numberFormat(amountToRaise, currency)}-
                {numberFormat(maximumAmountToRaise, currency)}
              </Typography>
            </Box>
          ) : null}

          {isUpcoming ? (
            <Box sx={styles.footer.box}>
              <Typography sx={styles.footer.text} variant="body1">
                Valuation
              </Typography>
              <Typography sx={styles.footer.number} variant="body1">
                {numberFormat(valuation, currency)}
              </Typography>
            </Box>
          ) : null}

          <Box sx={styles.footer.box}>
            <Typography sx={styles.footer.text} variant="body1">
              {t('crowdfunding.campaign.daysLeft')}
            </Typography>
            <Typography sx={styles.footer.number} variant="body1">
              {daysLeft}
            </Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
