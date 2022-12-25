import { NavLink } from 'react-router-dom';
import { Logo, AuthForm, AuthInput } from '../';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { ROUTES, REGEX } from '../../utils/constants';

function Login({ buttonText, onLogin, loginErrorMessage }) {
  const { values, handleChange, hadleShiftFocus, errors, inputsValidity, isValid } =
    useFormAndValidation(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <main className="login">
      <div className="login__container">
        <Logo className="login__logo" />
        <AuthForm
          className="login__auth-form"
          name="login"
          onSubmit={handleSubmit}
          title="Рады видеть!"
          buttonText={buttonText}
          isValid={isValid}
          notification={loginErrorMessage}>
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
        <p className="login__redirection">
          Ещё не зарегистрированы?
          <NavLink to={ROUTES.SIGNUP} className="login__redirection-link">Регистрация</NavLink>
        </p>
      </div>
    </main>
  );
}

export default Login;
