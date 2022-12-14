import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Logo } from '../';
import { CurrentUserContext } from '../../context';

function Navigation() {
  const { loggedIn } = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const screenWithTablet = 768;
  const isMenuOpenClassFr = '_is-menu-open';
  const isMenuClassFr = '_is-menu';

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    if (windowWidth <= screenWithTablet) {
      setIsMenu(true);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth > screenWithTablet && (isMenu || isMenuOpen)) {
      setIsMenu(false);
      setIsMenuOpen(false);
    }
  }, [windowWidth, isMenu, isMenuOpen]);

  useEffect(() => {
    let bodyStyle = document.body.style;
    isMenuOpen ? (bodyStyle.overflow = 'hidden') : (bodyStyle.overflow = 'initial');
  }, [isMenuOpen]);

  function toggleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav
      className={classNames('navigation', {
        navigation_main: !loggedIn,
        'navigation_is-menu-open': isMenuOpen,
      })}>
      {!loggedIn ? (
        <>
          <Logo className="navigation__logo" />
          <ul className="navigation__list navigation__list_auth">
            <li className="navigation__list-item">
              <NavLink to="/signup" className="navigation__link navigation__link_auth">
                Регистрация
              </NavLink>
            </li>
            <li className="navigation__list-item">
              <NavLink
                to="/signin"
                className=" navigation__link navigation__link_auth navigation__link_with-bg">
                Войти
              </NavLink>
            </li>
          </ul>
        </>
      ) : (
        <>
          {isMenu && <Logo className="navigation__logo" />}
          <div
            onClick={toggleMenuOpen}
            className={`
            navigation__burger-container 
            ${isMenuOpen ? `navigation__burger-container${isMenuOpenClassFr}` : ''}
            ${isMenu ? `navigation__burger-container${isMenuClassFr}` : ''}
          `}>
            <span
              className={`navigation__burger ${
                isMenuOpen ? `navigation__burger${isMenuOpenClassFr}` : ''
              }`}></span>
          </div>
          <div
            className={classNames('navigation__menu', {
              'navigation__menu_is-open': isMenuOpen,
            })}>
            {!isMenu && <Logo className="navigation__logo" />}
            <ul className="navigation__list navigation__list_movies">
              {isMenu && (
                <li className="navigation__list-item">
                  <NavLink to="/" onClick={toggleMenuOpen} className="navigation__link navigation__link_movies">
                    Главная
                  </NavLink>
                </li>
              )}
              <li className="navigation__list-item">
                <NavLink to="/movies" onClick={toggleMenuOpen} className=" navigation__link navigation__link_movies">
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__list-item">
                <NavLink
                  to="/saved-movies"
                  onClick={toggleMenuOpen}
                  className="navigation__link navigation__link_movies navigation__link_saved-movies">
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
            <NavLink to="/profile" onClick={toggleMenuOpen} className="navigation__link navigation__link_profile">
              <p className="navigation__profile-text">Аккаунт</p>
              <div className="navigation__profile-icon" />
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navigation;
