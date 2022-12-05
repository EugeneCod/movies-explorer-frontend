import React from 'react';

function Portfolio() {
  return (
    <div className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a href="https://eugenecod.github.io/how-to-learn" className="portfolio__link">
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a href="https://eugenecod.github.io/russian-travel" className="portfolio__link">
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a href="https://mesto.ekg.nomoredomains.icu/" className="portfolio__link">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Portfolio;
