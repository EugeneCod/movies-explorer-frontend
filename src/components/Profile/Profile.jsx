import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { AuthContext } from '../../context';

function Profile({ onUpdateUser, onLogout }) {
  const auth = useContext(AuthContext);
  const { currentUser, isLoading } = auth;
  const [inputsСhanged, setInputsСhanged] = useState(false);
  const {
    values,
    setValues,
    handleChange,
    hadleShiftFocus,
    errors,
    setErrors,
    inputsValidity,
    setInputsValidity,
    isValid,
    setIsValid,
    resetForm,
  } = useFormAndValidation(false);
  console.log(isLoading);

  useEffect(() => {
    setValues({
      name: currentUser.name || '',
      email: currentUser.email || '',
    });
  }, [currentUser]);

  useEffect(() => {
    values.name !== currentUser.name || values.email !== currentUser.email
      ? setInputsСhanged(true)
      : setInputsСhanged(false);
  }, [setValues, currentUser, values]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values.name, values.email);
  }
  
  return (
    <main className="profile">
      <div className="profile__container">
        <p className="profile__greeting">{`Привет, ${currentUser.name}!`}</p>
        <form noValidate onSubmit={handleSubmit} id="profile" className="profile__form">
          <div className="profile__form-row">
            <label htmlFor="name" className="profile__form-label">
              Имя
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              minLength="2"
              maxLength="30"
              pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
              className="profile__form-input"
              value={values.name || ''}
              onChange={handleChange}
              onBlur={hadleShiftFocus}
            />
            <span className="profile__input-error">{errors.name || ''}</span>
          </div>
          <div className="profile__form-row">
            <label htmlFor="email" className="profile__form-label">
              E-mail
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              className="profile__form-input"
              value={values.email || ''}
              onChange={handleChange}
              onBlur={hadleShiftFocus}
            />
            <span className="profile__input-error">{errors.email || ''}</span>
          </div>
        </form>
        <ul className="profile__buttons-list">
          <li className="profile__buttons-list-item">
            <button
              form="profile"
              className={classNames('profile__button profile__button_function_edit', {
                profile__button_inactive: !inputsСhanged || !isValid || isLoading,
              })}
              disabled={!inputsСhanged || !isValid || isLoading}
            >
              {!isLoading ? 'Редактировать' : '...Выполнение'}
            </button>
          </li>
          <li className="profile__buttons-list-item">
            <button onClick={onLogout} className="profile__button profile__button_function_logout">
              Выйти из аккаунта
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Profile;
