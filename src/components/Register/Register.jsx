import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo, AuthForm, AuthInput } from '../';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function Register() {
  const { values, handleChange, hadleShiftFocus, errors, inputsValidity, isValid } =
    useFormAndValidation(false);

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section className="register">
      <div className="register__container">
        <Logo className="register__logo" />
        <AuthForm
          className="register__auth-form"
          name="register"
          onSubmit={handleSubmit}
          title="Добро пожаловать!"
          buttonText="Зарегистрироваться"
          isValid={isValid}>
          <AuthInput
            value={values.name || ''}
            error={errors.name || ''}
            isValid={inputsValidity.name || ''}
            onChange={handleChange}
            onBlur={hadleShiftFocus}
            type="text"
            name="name"
            label="Имя"
            minLength="2"
            maxLength="40"
          />
          <AuthInput
            value={values.email || ''}
            error={errors.email || ''}
            isValid={inputsValidity.name || ''}
            onChange={handleChange}
            onBlur={hadleShiftFocus}
            type="email"
            name="email"
            label="E-mail"
            minLength=""
            maxLength=""
          />
          <AuthInput
            value={values.password || ''}
            error={errors.password || ''}
            isValid={inputsValidity.name || ''}
            onChange={handleChange}
            onBlur={hadleShiftFocus}
            type="password"
            name="password"
            label="Пароль"
            minLength=""
            maxLength=""
          />
        </AuthForm>
        <p className="register__redirection">
          Уже зарегистрированы?
          <NavLink to="signin" className="register__redirection-link">Войти</NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
