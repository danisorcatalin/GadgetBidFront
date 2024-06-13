import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  ClickAwayListener,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface Props {
  steps: string[];
  activeStep: number;
}

export const StatusStepper = (props: Props): JSX.Element => {
  const { steps, activeStep } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [openedLabel, setOpenedLabel] = useState<string>('');

  const handleTooltipClose = (label: string) => {
    setOpenedLabel(label);
  };

  const handleTooltipOpen = (label: string) => {
    setOpenedLabel(label);
  };

  return (
    <Box>
      {mobileDevice ? (
        <ClickAwayListener onClickAway={() => handleTooltipClose('')}>
          <Box sx={{ my: 2, width: '100%' }}>
            <Stepper sx={{ overflowX: 'auto' }} activeStep={activeStep} alternativeLabel>
              {steps.map((label) => {
                const stepProps = {};
                if (activeStep === steps.length - 1) {
                  stepProps['completed'] = true;
                }
                return (
                  <Tooltip
                    key={label}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    onClose={() => handleTooltipClose(label)}
                    open={openedLabel === label ? true : false}
                    title={t(label)}
                  >
                    <Step {...stepProps}>
                      <StepLabel onClick={() => handleTooltipOpen(label)} />
                    </Step>
                  </Tooltip>
                );
              })}
            </Stepper>
          </Box>
        </ClickAwayListener>
      ) : (
        <Stepper sx={{ overflowX: 'auto' }} activeStep={activeStep} alternativeLabel>
          {steps.map((label) => {
            const stepProps = {};
            if (activeStep === steps.length - 1) {
              stepProps['completed'] = true;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{t(label)}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
    </Box>
  );
};
