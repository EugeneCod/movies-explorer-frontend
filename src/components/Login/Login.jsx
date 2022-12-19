import { NavLink } from 'react-router-dom';
import { Logo, AuthForm, AuthInput } from '../';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function Login({ buttonText }) {
  const { values, handleChange, hadleShiftFocus, errors, inputsValidity, isValid } =
    useFormAndValidation(false);

  function handleSubmit(evt) {
    evt.preventDefault();
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
          isValid={isValid}>
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
        <p className="login__redirection">
          Ещё не зарегистрированы?
          <NavLink to="/signup" className="login__redirection-link">Регистрация</NavLink>
        </p>
      </div>
    </main>
  );
}

export default Login;
