import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Navigation } from '../';


function Header() {
  const location = useLocation().pathname;

  return (
    <header
      className={classNames('header', {
        header_main: location === '/',
        header_movies: location === '/movies',
      })}>
      <Link to="/">
        <div className="header__logo">
        </div>
      </Link>
      < Navigation className="header__navigation"/>
    </header>
  );
}

export default Header;
