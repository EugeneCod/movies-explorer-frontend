import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__bottom">
          <p className="footer__copyright">© {new Date().getFullYear()}</p>
          <ul className="footer__links">
            <li className="footer__item">
              <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item">
              <a href="https://github.com/EugeneCod" target="_blank" rel="noreferrer" className="footer__link">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
