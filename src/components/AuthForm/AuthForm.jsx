import { useContext } from 'react';
import classNames from 'classnames';
import { CurrentUserContext } from '../../context';


function AuthForm({ children, name, onSubmit, title, buttonText, isValid, className, notification }) {
  const { isLoading } = useContext(CurrentUserContext);
  
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
        <p className="auth-form__notification-block">{notification}</p>
        <button
          type="submit"
          className={classNames('auth-form__button', { 'auth-form__button_inactive': !isValid || isLoading })}
          disabled={!isValid || isLoading}>
          {buttonText}
        </button>
      </fieldset>
    </form>
  );
}

export default AuthForm;
