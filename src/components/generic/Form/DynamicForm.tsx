import { Box, Button, FormHelperText, Grid, useMediaQuery, useTheme } from '@mui/material';
import type { GridProps } from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { keyable } from 'types/util';
import { useTranslation } from 'react-i18next';
import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import { GadgetInput } from 'ui/gadget/GadgetInput';
import { ChangeEvent, useState } from 'react';
import { blobToFile, dataURIToBlob, isImageFile, resizeFile } from 'utils/utils';

export enum DynamicFormInputType {
  TEXT_FIELD = 'TEXT_FIELD',
  TEXT_AREA = 'TEXT_AREA',
  FILE = 'FILE',
}

export interface DynamicFormInput {
  name: string;
  label: string;
  validation: unknown;
  type: DynamicFormInputType;
  gridItemProps?: GridProps;
  disabled?: boolean;
  placeholder?: string;
}
interface Props<T> {
  inputs: DynamicFormInput[];
  initialValues: {
    dynamicInputs: T[];
    submit: boolean;
  };
  newInputValues: T;
  showSubmitBtn?: boolean;
  showRemoveBtn?: boolean;
  showAddMoreBtn?: boolean;
  onSubmit?: (values: T[]) => Promise<void>;
  onRemove?: (values: T) => Promise<void>;
  submitBtnText?: string;
  removeBtnText?: string;
  enableReinitialize?: boolean;
  readonly?: boolean;
  submitEventName?: string;
}

export const DynamicForm = <T extends keyable>(props: Props<T>): JSX.Element => {
  const {
    inputs,
    initialValues,
    newInputValues,
    onSubmit = () => {},
    onRemove = () => {},
    showSubmitBtn = true,
    showRemoveBtn = true,
    showAddMoreBtn = true,
    submitBtnText,
    removeBtnText,
    enableReinitialize = false,
    readonly,
    submitEventName,
  } = props;
  const isMountedRef = useIsMountedRef();
  const validations = inputs.reduce((result, input) => {
    result[input.name] = input.validation;
    return result;
  }, {});
  const validationSchema = Yup.object().shape({
    dynamicInputs: Yup.array().of(Yup.object().shape(validations)),
  });
  const handleRemove = (index, formikRemove, data) => {
    gtm.push({ event: GTM_EVENTS.REMOVE_CLICK });
    formikRemove(index);
    const imageUris = [...images];
    imageUris[index] = '';
    setImages(imageUris);
    data && data.id ? onRemove(data) : null;
  };
  const { t } = useTranslation();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [images, setImages] = useState<string[]>([]);

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
          const { dynamicInputs } = values;
          await onSubmit(dynamicInputs);
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
        isSubmitting,
        touched,
        values,
        setFieldValue,
        submitCount,
      }): JSX.Element => {
        return (
          <Form>
            <FieldArray name="dynamicInputs">
              {({ remove, push }) => (
                <Box>
                  {values.dynamicInputs.map((dynamicInput, index) => (
                    <>
                      <Grid container spacing={3} key={`dynamicForm.${dynamicInput.id}`}>
                        {inputs.map((inputConfig, key) => {
                          const {
                            placeholder,
                            name,
                            label,
                            gridItemProps = { xs: 12, md: 6 },
                          } = inputConfig;

                          return (
                            <Grid item {...gridItemProps} key={`dynamicForm.${key}.${name}`}>
                              {inputConfig.type === DynamicFormInputType.FILE ? (
                                <Box
                                  key={`box.${key}.${name}`}
                                  sx={{
                                    my: 2,
                                    display: 'flex',
                                    flexDirection: mobileDevice ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <Button
                                    key={`btn.${key}.${name}`}
                                    variant="contained"
                                    component="label"
                                    disabled={isSubmitting || readonly}
                                  >
                                    {label}
                                    <input
                                      name={`dynamicInputs.${index}.${name}`}
                                      onBlur={handleBlur}
                                      type="file"
                                      accept="image/*"
                                      hidden
                                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        const file = event.target.files[0];
                                        if (isImageFile(file)) {
                                          resizeFile(file).then((imageUri) => {
                                            const blob = dataURIToBlob(imageUri);
                                            const fileName = event.target.files[0].name;
                                            const fileToUpload = blobToFile(blob, fileName);
                                            setFieldValue(
                                              `dynamicInputs.${index}.${name}`,
                                              fileToUpload
                                            );
                                            const imageUris = [...images];
                                            imageUris[index] = imageUri;
                                            setImages(imageUris);
                                          });
                                        } else {
                                          setFieldValue(`dynamicInputs.${index}.${name}`, file);
                                        }
                                      }}
                                    />
                                  </Button>
                                  {Boolean(
                                    errors?.dynamicInputs &&
                                      errors.dynamicInputs[index] &&
                                      errors.dynamicInputs[index][name] &&
                                      submitCount
                                  ) && (
                                    <FormHelperText error>
                                      {JSON.stringify(errors?.dynamicInputs[index][name])}
                                    </FormHelperText>
                                  )}
                                  {(values.dynamicInputs[index][name] !== undefined ||
                                    (images.length > 0 && images[index])) && (
                                    <img
                                      src={
                                        images.length > 0 && images[index]
                                          ? images[index]
                                          : values.dynamicInputs[index][name]
                                      }
                                      style={{
                                        height: '300px',
                                        width: '300px',
                                        marginTop: mobileDevice ? 2 : 0,
                                        objectFit: 'contain',
                                      }}
                                    />
                                  )}
                                </Box>
                              ) : (
                                <GadgetInput
                                  key={`input.${key}.${name}`}
                                  error={Boolean(
                                    touched?.dynamicInputs &&
                                      touched.dynamicInputs[index] &&
                                      touched.dynamicInputs[index][name] &&
                                      errors?.dynamicInputs &&
                                      errors.dynamicInputs[index] &&
                                      errors.dynamicInputs[index][name]
                                  )}
                                  helperText={
                                    touched?.dynamicInputs &&
                                    touched.dynamicInputs[index] &&
                                    touched.dynamicInputs[index][name] &&
                                    errors?.dynamicInputs &&
                                    errors.dynamicInputs[index] &&
                                    errors.dynamicInputs[index][name]
                                  }
                                  label={label}
                                  name={`dynamicInputs.${index}.${name}`}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.dynamicInputs[index][name]}
                                  disabled={readonly}
                                  placeholder={placeholder}
                                  formVariant={true}
                                />
                              )}
                            </Grid>
                          );
                        })}
                      </Grid>
                      {showRemoveBtn && (
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            sx={{ marginTop: '16px' }}
                            variant="outlined"
                            onClick={() => handleRemove(index, remove, values.dynamicInputs[index])}
                            disabled={isSubmitting || readonly}
                          >
                            {removeBtnText ? removeBtnText : t('generic.dynamicForm.remove')}
                          </Button>
                        </Box>
                      )}
                    </>
                  ))}
                  {showAddMoreBtn && (
                    <Button
                      sx={{ mt: 2 }}
                      fullWidth={true}
                      variant="outlined"
                      onClick={() => {
                        push(newInputValues);
                        gtm.push({ event: GTM_EVENTS.ADD_MORE_CLICK });
                      }}
                      disabled={isSubmitting || readonly}
                    >
                      {t('generic.dynamicForm.addMore')}
                    </Button>
                  )}
                </Box>
              )}
            </FieldArray>
            {/* {errors.dynamicInputs && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{JSON.stringify(errors.dynamicInputs)}</FormHelperText>
              </Box>
            )} */}
            {showSubmitBtn && (
              <Box sx={{ mt: 2 }}>
                <Button
                  color="primary"
                  disabled={isSubmitting || readonly}
                  fullWidth={true}
                  type="submit"
                  variant="contained"
                  onClick={submitEventClick}
                >
                  {submitBtnText}
                </Button>
              </Box>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
