import type { FC, ChangeEvent, FocusEvent } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Grid,
} from '@mui/material';

export interface IDetailedRadio {
  value: string;
  title: string;
  description: string;
}

const DetailedRadioGroup: FC<{
  radios: IDetailedRadio[];
  mobileDevice: boolean;
  name: string;
  error: boolean;
  errorText: string;
  fullWidth: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  onBlur: (event: FocusEvent<HTMLDivElement>) => void;
}> = ({ radios, mobileDevice, name, error, errorText, fullWidth, onChange, onBlur }) => (
  <FormControl component="fieldset" error={error} fullWidth={fullWidth}>
    <RadioGroup row onChange={onChange} onBlur={onBlur}>
      <Grid sx={{ mb: 1.5 }} container spacing={2}>
        {radios.map((radio, index) => (
          <Grid key={`gridGroup.${index}`} item xs={12} sm={6}>
            <Paper
              key={`detailedRadioGroup.${index}`}
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                p: 0,
                backgroundColor: 'transparent',
                border: 0,
                width: mobileDevice ? '100%' : null,
              }}
              variant="outlined"
            >
              <FormControlLabel
                labelPlacement="start"
                sx={
                  mobileDevice
                    ? { display: 'flex', justifyContent: 'space-between', width: '100%' }
                    : { ml: 0 }
                }
                control={<Radio name={name} />}
                key={`detailedRadioGroup.${radio.value}`}
                label={
                  <Box sx={{ ml: 0, mr: 2 }}>
                    <Typography
                      sx={{
                        fontSize: '22px',
                        letterSpacing: '-0.44px',
                        lineHeight: '24px',
                        textAlign: 'left',
                        color: '#000000',
                      }}
                      variant="subtitle2"
                    >
                      {radio.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '11px',
                        letterSpacing: '-0.22px',
                        lineHeight: '12px',
                        textAlign: 'left',
                        color: '#000000',
                      }}
                      variant="body2"
                    >
                      {radio.description}
                    </Typography>
                  </Box>
                }
                value={radio.value}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
    <FormHelperText sx={{ ml: 2, color: '#F44336' }}>{errorText}</FormHelperText>
  </FormControl>
);

export default DetailedRadioGroup;
