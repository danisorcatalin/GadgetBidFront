import { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import isEqual from 'react-fast-compare';
import { useDebouncedCallback } from 'use-debounce';

export const FormPersist = ({ name }: { name: string }): JSX.Element => {
  const { values, setValues } = useFormikContext();
  const previousValuesRef = useRef<unknown>();

  const onSave = (values: unknown) => {
    window.localStorage.setItem(name, JSON.stringify(values));
  };

  const debouncedOnSave = useDebouncedCallback(onSave, 300);

  useEffect(() => {
    const savedForm = window.localStorage.getItem(name);

    if (savedForm) {
      const parsedForm = JSON.parse(savedForm);

      previousValuesRef.current = parsedForm;
      setValues(parsedForm);
    }
  }, [name, setValues]);

  useEffect(() => {
    if (!isEqual(previousValuesRef.current, values)) {
      debouncedOnSave(values);
    }
  });

  useEffect(() => {
    previousValuesRef.current = values;
  });

  return null;
};
export default FormPersist;
