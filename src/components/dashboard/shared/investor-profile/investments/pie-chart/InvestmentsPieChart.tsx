import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FC } from 'react';
import { Spacer } from 'components/Spacer';
import { numberFormat } from 'utils/utils';
import { useTranslation } from 'react-i18next';
import { responsive } from 'theme';
import { CampaignCurrency } from 'types/campaign';

export interface PieChartData {
  series: PieChartDataItem[];
}

export interface PieChartDataItem {
  color: string;
  data: number;
  label: string;
  currency: CampaignCurrency;
}

interface Props {
  title?: string;
  data: PieChartData;
}

export const InvestmentsPieChart: FC<Props> = (props: Props) => {
  const { title, data } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const chartOptions: ApexOptions = {
    plotOptions: {
      pie: {
        donut: {
          size: '35%',
        },
      },
    },
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: data.series.map((item) => item.color),
    dataLabels: {
      enabled: false,
    },
    labels: data.series.map((item) => t(`investments.${item.label}`)),
    legend: {
      show: false,
    },
    stroke: {
      colors: [theme.palette.background.paper],
      width: 1,
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = data.series.map((item) => item.data);
  const totalInvestments = data.series
    .map((item) => item.data)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return (
    <Card sx={{ mt: 5, maxWidth: '1024px' }}>
      {title && <CardHeader title={t('investments.investmentsBreakdown')} />}
      <CardContent sx={responsive.investmentsPieChart.cardContent}>
        <Box sx={responsive.investmentsPieChart.box}>
          <Typography sx={{ color: '#000000' }} variant="h1">
            {t('investments.totalInvestments')}
          </Typography>
          <Spacer marginBottom="15px" />
          <Typography variant="h2">
            {numberFormat(totalInvestments, data.series[0].currency)}
          </Typography>
        </Box>
        <Box>
          <Chart
            height={mobileDevice ? '290' : '320'}
            options={chartOptions}
            series={chartSeries}
            type="donut"
          />
        </Box>
      </CardContent>
    </Card>
  );
};
