import React from 'react';
import classNames from 'classnames';

function AuthInput({
  value,
  error,
  isValid,
  onChange,
  onBlur,
  type,
  name,
  label,
  minLength,
  maxLength,
}) {

  function handleChange(evt) {
    onChange(evt);
  }

  function handleBlur(evt) {
    onBlur(evt);
  }
  return (
    <div className="auth-input">
      <label className="auth-input__label" htmlFor={name}>
        {label}
      </label>
      <input
        required
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        type={type}
        name={name}
        id={name}
        minLength={minLength}
        maxLength={maxLength}
        className={classNames('auth-input__input-line', {
          'auth-input__input-line_invalid': !isValid,
        })}
      />
      <span className="auth-input__input-error">{error}</span>
    </div>
  );
}

export default AuthInput;
