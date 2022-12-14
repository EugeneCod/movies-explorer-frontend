import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Navigation } from '../';

function Header() {
  const location = useLocation().pathname;

  return (
    <header
      className={classNames('header', {
        header_main: location === '/',
      })}>
      <div className="header__container">
        <Navigation className="header__navigation" />
      </div>
    </header>
  );
}

export default Header;
