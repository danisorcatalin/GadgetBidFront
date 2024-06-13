import { Box, CardContent, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { Investment, InvestmentFileType } from 'types/investment';
import { Spacer } from 'components/Spacer';
import { UploadDocument } from 'types/document';
import { dateTimeFormat } from 'utils/utils';
import { useTranslation } from 'react-i18next';
import { GadgetInput } from 'ui/gadget/GadgetInput';
import { InvestmentsDocumentsTable } from '../investments-documents-table/InvestmentsDocumentsTable';
import CancelIcon from '@mui/icons-material/Cancel';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { responsive } from 'theme';

const styles = {
  input: {
    color: '#3769ff',
    border: '1px solid #3769ff',
  },
  text: {
    color: '#000000',
    letterSpacing: '-0.88px',
    lineHeight: '48px',
  },
  card: {
    background: '#FFFFFF',
    maxWidth: '1024px',
    padding: 0,
  },
  elrondText: {
    color: '#3769ff',
    fontSize: '12px',
    letterSpacing: '-0.22px',
    padding: '5px 0px',
  },
  elrondLink: {
    textDecoration: 'none',
    display: 'flex',
    width: '32px',
  },
  elrondCloudDoneIcon: {
    fontSize: '32px',
    color: '#4caf50',
    marginBottom: '5px',
  },
  elrondCancelIcon: {
    fontSize: '32px',
    color: '#f44336',
    marginBottom: '5px',
  },
};

export interface InvestmentDetailsTabProps {
  investmentData: Partial<Investment>;
  showInvestmentDocumentsUploadButton?: boolean;
  uploadInvestmentDocument?: UploadDocument<InvestmentFileType>;
}

export const InvestmentDetailsTab: FC<InvestmentDetailsTabProps> = (
  props: InvestmentDetailsTabProps
): JSX.Element => {
  const { investmentData, showInvestmentDocumentsUploadButton, uploadInvestmentDocument } = props;
  const { t } = useTranslation();
  const {
    user: { firstName, lastName },
  } = investmentData;

  return (
    <>
      <Typography sx={styles.text} variant="h1">
        {investmentData?.campaign?.company?.name}
      </Typography>
      <Spacer marginBottom="25px" />
      <CardContent sx={styles.card}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <GadgetInput
                label={t('investment.details.investor')}
                name="investor"
                type="text"
                value={`${firstName} ${lastName}`}
                disabled={true}
                style={styles.input}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GadgetInput
                label={t('investment.details.numberOfTickets')}
                name="numberOfTickets"
                type="text"
                value={investmentData.tokenAmount}
                disabled={true}
                style={styles.input}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GadgetInput
                label={t('investment.details.ticketValue')}
                name="ticketValue"
                type="text"
                value={investmentData.campaign?.tokenValue}
                disabled={true}
                style={styles.input}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GadgetInput
                label={t('investment.details.investmentStatus')}
                name="investmentStatus"
                type="text"
                value={t(`investmentStatus.${investmentData.status}`) as string}
                disabled={true}
                style={styles.input}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <GadgetInput
                label={t('investment.details.investmentDate')}
                name="investmentDate"
                type="text"
                value={dateTimeFormat(new Date(investmentData.createdAt))}
                disabled={true}
                style={styles.input}
              />
            </Grid>
            <Grid sx={responsive.investmentDetails.elrondTransaction} item xs={12} sm={6} md={4}>
              <Typography sx={styles.elrondText}>
                {t('investment.details.elrondTransaction')}
              </Typography>
              {investmentData.transferedHash ? (
                <a
                  href={`https://devnet-explorer.elrond.com/transactions/${investmentData.transferedHash}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.elrondLink}
                >
                  <CloudDoneIcon sx={styles.elrondCloudDoneIcon} />
                </a>
              ) : (
                <CancelIcon sx={styles.elrondCancelIcon} />
              )}
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <Spacer marginBottom="30px" />
      <InvestmentsDocumentsTable
        investmentData={investmentData}
        showUploadButton={showInvestmentDocumentsUploadButton}
        uploadDocument={uploadInvestmentDocument}
      />
    </>
  );
};
