import classNames from 'classnames';
import React from 'react';

function AuthForm({ children, name, onSubmit, title, buttonText, isValid, className }) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      name={name}
      className={`auth-form auth-form_related-to_${name} ${className}`}
      id={name}
      method="get">
      <fieldset className="auth-form__fieldset" form={name}>
        <legend className="auth-form__legend">{title}</legend>
        <div className="auth-form__inputs-stack">{children}</div>
        <button
          type="submit"
          className={classNames('auth-form__button', { 'auth-form__button_inactive': !isValid })}>
          {buttonText}
        </button>
      </fieldset>
    </form>
  );
}

export default AuthForm;
