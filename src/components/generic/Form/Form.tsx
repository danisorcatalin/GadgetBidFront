import {
  Box,
  Button,
  Grid,
  TextField,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from '@mui/material';
import type { GridProps } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { DatePicker } from '@mui/lab';
import { FormEvent, Key } from 'react';
import gtm from '../../../lib/gtm';
import { GadgetInput } from 'ui/gadget/GadgetInput';

export enum FormInputType {
  TEXT_FIELD = 'TEXT_FIELD',
  TEXT_AREA = 'TEXT_AREA',
  DATE_PICKER = 'DATE_PICKER',
  CHECKBOX = 'CHECKBOX',
  SELECT = 'SELECT',
  NON_FORM = 'NON_FORM',
}

export interface FormInput {
  name?: string;
  label: string;
  validation?: unknown;
  type: FormInputType;
  gridItemProps?: GridProps;
  disabled?: boolean;
  placeholder?: string;
  extraElement?: JSX.Element;
  selectValues?: { key: Key; value: string }[];
}
interface Props<T> {
  inputs: FormInput[];
  initialValues: T;
  showSubmitBtn?: boolean;
  onSubmit?: (values: T) => Promise<void>;
  onChange?: (values: FormEvent) => void;
  submitBtnText?: string;
  enableReinitialize?: boolean;
  readonly?: boolean;
  submitBtnFullWidth?: boolean;
  submitEventName?: string;
  formErrorText?: string;
}
export const Form = <T extends { submit: unknown }>(props: Props<T>): JSX.Element => {
  const {
    inputs,
    initialValues,
    onSubmit = () => {},
    onChange = () => {},
    showSubmitBtn = true,
    submitBtnText,
    enableReinitialize = false,
    readonly = false,
    submitBtnFullWidth = true,
    submitEventName,
    formErrorText,
  } = props;
  const isMountedRef = useIsMountedRef();

  const validations = inputs.reduce((result, input) => {
    result[input.name] = input.validation;
    return result;
  }, {});
  const validationSchema = Yup.object().shape(validations);

  const submitEventClick = () => {
    gtm.push({ event: submitEventName });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          await onSubmit(values);
          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue,
      }): JSX.Element => {
        return (
          <form style={{ width: '100%' }} noValidate onChange={onChange} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {inputs.map((inputConfig, index) => {
                const {
                  placeholder,
                  name,
                  label,
                  gridItemProps = { xs: 12, md: 6 },
                  disabled = false,
                  extraElement,
                } = inputConfig;

                return (
                  <Grid item {...gridItemProps} key={`form.${index}`}>
                    {(inputConfig.type === FormInputType.TEXT_FIELD ||
                      inputConfig.type === FormInputType.TEXT_AREA) && (
                      <GadgetInput
                        error={Boolean(touched[name] && errors[name])}
                        helperText={touched[name] && errors[name]}
                        label={label}
                        name={name}
                        multiline={inputConfig.type === FormInputType.TEXT_AREA}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[name]}
                        disabled={readonly || disabled}
                        placeholder={placeholder}
                        formVariant={true}
                      />
                    )}
                    {inputConfig.type === FormInputType.DATE_PICKER && (
                      <DatePicker
                        value={values[name]}
                        onChange={(newValue) => {
                          setFieldValue(name, new Date(newValue).toISOString());
                        }}
                        inputFormat="dd/MM/yyyy"
                        renderInput={({ ...rest }) => {
                          return (
                            <>
                              <TextField
                                {...rest}
                                disabled={readonly || disabled}
                                name={name}
                                fullWidth
                                label={label}
                              />
                            </>
                          );
                        }}
                      />
                    )}
                    {inputConfig.type === FormInputType.SELECT && (
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            border: values[name]
                              ? '1px solid #96B7DB'
                              : touched[name] && errors[name]
                              ? '1px solid red'
                              : '1px solid #A2AAAD',
                            height: '32px',
                            marginTop: '31px',
                            fontSize: '22px',
                            borderRadius: '4px',
                            paddingLeft: '10px',
                            paddingTop: '3px',
                          },
                        }}
                        variant="standard"
                        fullWidth
                        error={Boolean(touched[name] && errors[name])}
                        helperText={touched[name] && errors[name]}
                        label={label}
                        name={name}
                        select
                        value={values[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={readonly || disabled}
                        InputLabelProps={{
                          style: {
                            top: values[name] ? '6px' : '12px',
                            left: values[name] ? '0px' : '7px',
                            color: values[name]
                              ? '#96B7DB'
                              : touched[name] && errors[name]
                              ? '1px solid red'
                              : '#A2AAAD',
                            fontSize: values[name] ? '16px' : '22px',
                          },
                        }}
                      >
                        {inputConfig.selectValues.map((value) => (
                          <MenuItem key={Number(value.key)} value={Number(value.key)}>
                            {value.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    {inputConfig.type === FormInputType.CHECKBOX && (
                      <FormControlLabel
                        control={
                          <Checkbox checked={values[name]} onChange={handleChange} name={name} />
                        }
                        label={label}
                      />
                    )}
                    {inputConfig.type === FormInputType.NON_FORM && extraElement}
                  </Grid>
                );
              })}
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{JSON.stringify(errors.submit)}</FormHelperText>
              </Box>
            )}
            {formErrorText && (
              <Box sx={{ mt: 2 }}>
                <FormHelperText error>{formErrorText}</FormHelperText>
              </Box>
            )}
            {showSubmitBtn && (
              <Box sx={{ mt: 6 }}>
                <Button
                  color="primary"
                  disabled={isSubmitting || readonly}
                  fullWidth={submitBtnFullWidth}
                  type="submit"
                  variant="contained"
                  onClick={submitEventClick}
                >
                  {submitBtnText}
                </Button>
              </Box>
            )}
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
