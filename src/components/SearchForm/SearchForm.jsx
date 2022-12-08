import { useState } from 'react';

function SearchForm({ className }) {
  const [value, setValue] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <form className={`search-form ${className}`} name="search" id="search" method="get" onSubmit={handleSubmit}>
      <fieldset className="search-form__fieldset" form="search">
        <input
          className="search-form__input"
          type="text"
          name="search"
          placeholder="Фильм"
          value={value}
          onChange={(evt) => {
            setValue(evt.value);
          }}
        />
        <button type="submit" className="search-form__button">
          Найти
        </button>
      </fieldset>
    </form>
  );
}

export default SearchForm;
