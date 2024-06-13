import type { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getRouteName } from 'routes';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
}
export const DashboardPageInnerLayout: FC<Props> = (props: Props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const pageTitle = getRouteName(pathname);
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{`${t(pageTitle)} | GadgetBid`}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          pt: '30px',
          height: '100%',
          display: 'flex',
        }}
      >
        <Container
          maxWidth="lg"
          sx={
            {
              // width: '100%',
              // display: 'flex',
              // flexDirection: 'column',
              // alignItems: 'center',
              // maxWidth: '1024px',
            }
          }
        >
          <Grid container maxWidth="1024px" width="100%">
            <Grid item xs={12}>
              <Typography color="#A2AAAD" variant="h3">
                {pageTitle}
              </Typography>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
