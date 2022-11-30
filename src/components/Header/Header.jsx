import { Link } from 'react-router-dom';
import logoSvg from '../../images/header__logo.svg';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo-container">
          <img src={logoSvg} alt="Логотип" />
        </div>
      </Link>
      <div>
        <h1>Заголовок</h1>
        <p>Подзаголовок</p>
      </div>
    </div>
  );
}

export default Header;
