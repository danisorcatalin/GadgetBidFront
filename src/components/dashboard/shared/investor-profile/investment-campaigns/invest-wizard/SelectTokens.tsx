import { Box, Button, Slider, Typography } from '@mui/material';
import { InfoButton } from 'components/generic/InfoButton';
import { Spacer } from 'components/Spacer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { numberFormat } from 'utils/utils';
import { useModal } from 'mui-modal-provider';
import InfoModal from 'components/generic/InfoModal';
import { CampaignCurrency } from 'types/campaign';

interface SelectTokensProps {
  onChange: (value) => void;
  tokenValue: number;
  tokenAmount: number;
  currency: CampaignCurrency;
  remainingTicketsPerInvestor: number;
  fromPresubscribe?: boolean;
}

export const SelectTokens = (props: SelectTokensProps): JSX.Element => {
  const {
    onChange,
    tokenValue = 1,
    remainingTicketsPerInvestor: sliderMaxValue,
    currency,
    fromPresubscribe = false,
  } = props;
  const [value, setValue] = useState(0);
  const handleChange = (e, value) => {
    setValue(value);
    onChange(value);
  };

  const { t } = useTranslation();
  const { showModal } = useModal();

  const decrementTicket = () => {
    if (value !== 0) {
      setValue(value - 1);
      onChange(value - 1);
    }
  };

  const incrementTicket = () => {
    if (value !== sliderMaxValue) {
      setValue(value + 1);
      onChange(value + 1);
    }
  };

  return (
    <Box sx={{ pt: 2, pb: 2 }}>
      {!fromPresubscribe ? (
        <Typography sx={{ color: '#000000' }} variant="h1">
          {t('investment.investmentWizard')}
        </Typography>
      ) : null}
      <Spacer marginBottom="15px" />
      <Typography
        sx={{
          color: '#000000',
          fontSize: '22px',
          letterSpacing: '-0.44px',
          textAlign: 'left',
        }}
      >
        {t('investment.wizard.selectTickets')}
      </Typography>
      <Spacer marginBottom="40px" />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <Typography sx={{ color: '#000000', marginLeft: '30px' }} textAlign="center" variant="h3">
            {value} {t('investment.selectTickets.tickets')}
          </Typography>
        </Box>
        <Box sx={{ marginLeft: 'auto' }}>
          <InfoButton
            handleClick={() => {
              showModal(InfoModal, { text: t('investment.wizard.info') });
            }}
          />
        </Box>
      </Box>
      <Slider
        sx={{ marginTop: '25px', height: '2px' }}
        defaultValue={0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        value={value}
        step={1}
        min={0}
        max={sliderMaxValue}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          sx={{
            minWidth: '36px',
            minHeight: '36px',
            p: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
          variant="outlined"
          size="small"
          color="primary"
          onClick={decrementTicket}
        >
          <Typography variant="h2">-</Typography>
        </Button>
        <Button
          sx={{
            minWidth: '36px',
            minHeight: '36px',
            p: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
          variant="outlined"
          size="small"
          color="primary"
          onClick={incrementTicket}
        >
          <Typography variant="h2">+</Typography>
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ color: '#000000' }} textAlign="center" variant="h2">
          {t('investment.selectTickets.amount')}
        </Typography>
        <Typography sx={{ color: '#000000' }} textAlign="center" variant="h3">
          {numberFormat(value * tokenValue, currency)}
        </Typography>
      </Box>
      <Spacer marginBottom="60px" />
    </Box>
  );
};
