import { Card, CardContent, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ErrorFallback({ error, componentStack, resetError }): JSX.Element {
  const { t } = useTranslation();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Card sx={{ margin: 16 }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Typography color="error" gutterBottom variant="h6">
          {t('general.snackbar.errorOccurred')}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          <textarea>{error.toString()}</textarea>
        </Typography>
        <Typography color="textSecondary" variant="body2">
          <textarea>{componentStack}</textarea>
        </Typography>
        <Button
          color="primary"
          onClick={() => {
            resetError();
          }}
          variant="outlined"
          sx={{ marginTop: '10px' }}
        >
          {t('general.retry')}
        </Button>
      </CardContent>
    </Card>
  );
}
