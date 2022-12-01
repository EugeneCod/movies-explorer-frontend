import { Link, useLocation } from 'react-router-dom';
// import classNames from 'classnames';

function Navigation() {
  const location = useLocation().pathname;
  return (
    <nav className="navigation">
      {location === '/' ? (
        <ul className="navigation__list">
          <li className="navigation__item-auth">
            <Link to="/signup" className="navigation__link-auth">
              Регистрация
            </Link>
          </li>
          <li className="navigation__item-auth">
            <Link to="/signin" className="navigation__link-auth navigation__link-auth_signin">
              Войти
            </Link>
          </li>
        </ul>
      ) : (
        <>
          <ul className="navigation__list">
            <li className="navigation__item-movies">
              <Link to="/signup" className="navigation__link-movies">
                Фильмы
              </Link>
            </li>
            <li className="navigation__item-auth">
              <Link to="/signin" className="navigation__link-movies">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Link to="/signin" className="navigation__link-profile">
            <p className="navigation__profile-text">Аккаунт</p>
            <div className="navigation__profile-icon" />
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
