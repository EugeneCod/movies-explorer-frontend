import { useState, useCallback } from 'react';

export default function useFormAndValidation(validity) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [inputsValidity, setInputsValidity] = useState({});
  const [isValid, setIsValid] = useState(validity);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setInputsValidity({ ...inputsValidity, [name]: true });
    setIsValid(evt.target.closest('form').checkValidity());
  };

  const hadleShiftFocus = (evt) => {
    const { name } = evt.target;
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setInputsValidity({ ...inputsValidity, [name]: evt.target.validity.valid });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    setValues,
    handleChange,
    hadleShiftFocus,
    errors,
    setErrors,
    inputsValidity,
    setInputsValidity,
    isValid,
    setIsValid,
    resetForm,
  };
}
