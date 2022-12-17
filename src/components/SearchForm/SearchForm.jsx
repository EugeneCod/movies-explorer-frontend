import { searchFormErrors } from '../../utils/constants';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function SearchForm({ className, onSubmit }) {
  const { values, handleChange, errors, setErrors, isValid, resetForm } = useFormAndValidation(false);


  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      setErrors({ ...errors, [evt.target.name]: searchFormErrors.inputIsRequired });
      return;
    }
    onSubmit(values.search);
    resetForm();
    return;
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
          onChange={handleChange}
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
