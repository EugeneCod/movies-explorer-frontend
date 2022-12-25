import { NavLink } from 'react-router-dom';
import { Logo, AuthForm, AuthInput } from '../';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { ROUTES, REGEX } from '../../utils/constants';

function Register({ onRegistration, buttonText, registrationError }) {
  const { values, handleChange, hadleShiftFocus, errors, inputsValidity, isValid } =
    useFormAndValidation(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(values.name, values.email, values.password);
  }
  return (
    <main className="register">
      <div className="register__container">
        <Logo className="register__logo" />
        <AuthForm
          className="register__auth-form"
          name="register"
          onSubmit={handleSubmit}
          title="Добро пожаловать!"
          buttonText={buttonText}
          isValid={isValid}
          notification={registrationError}>
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
            maxLength="30"
            pattern={REGEX.NAME}
          />
          <AuthInput
            value={values.email || ''}
            error={errors.email || ''}
            isValid={inputsValidity.email || ''}
            onChange={handleChange}
            onBlur={hadleShiftFocus}
            type="email"
            name="email"
            label="E-mail"
            minLength=""
            maxLength=""
            pattern={REGEX.EMAIL}
          />
          <AuthInput
            value={values.password || ''}
            error={errors.password || ''}
            isValid={inputsValidity.password || ''}
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
          <NavLink to={ROUTES.SIGNIN} className="register__redirection-link">
            Войти
          </NavLink>
        </p>
      </div>
    </main>
  );
}

export default Register;
