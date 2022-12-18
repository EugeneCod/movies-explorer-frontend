import { useEffect } from 'react';
import { searchFormErrors } from '../../utils/constants';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function SearchForm({ className, onSubmit, onInput, searchText }) {
  const { values, setValues, handleChange, errors, setErrors, isValid, setIsValid } = useFormAndValidation(false);

  useEffect(() => {
    setValues({
      search: searchText || '',
    })
    searchText && setIsValid(true);
  }, [setValues, searchText, setIsValid])

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      setErrors({ ...errors, [evt.target.name]: searchFormErrors.inputIsRequired });
      return;
    }
    onSubmit(values.search);
    // resetForm();
    return;
  }

  function handleInput(evt) {
    handleChange(evt);
    onInput(evt.target.value);
  }

  return (
    <form
      className={`search-form ${className}`}
      name="search"
      id="search"
      method="get"
      onSubmit={handleSubmit}
      noValidate>
      <fieldset className="search-form__fieldset" form="search">
        <input
          required
          className="search-form__input"
          type="text"
          name="search"
          placeholder="Фильм"
          value={values.search || ''}
          onChange={handleInput}
        />
        <span className="search-form__input-error">{errors.search}</span>
        <button type="submit" className="search-form__button">
          Найти
        </button>
      </fieldset>
    </form>
  );
}

export default SearchForm;
