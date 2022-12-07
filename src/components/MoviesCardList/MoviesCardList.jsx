import { useState } from 'react';
import classNames from 'classnames';

import posterOne from '../../images/movies-card-list__poster-1.jpg';
import posterTwo from '../../images/movies-card-list__poster-2.jpg';
import posterThree from '../../images/movies-card-list__poster-3.jpg';
import posterFour from '../../images/movies-card-list__poster-4.jpg';
import posterFive from '../../images/movies-card-list__poster-5.jpg';

function MoviesCardList() {
  const [isLiked, setIsLiked] = useState('false');
  const wasSaved = false;

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  function handleRemoveClick() {
    return;
  }

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        <div className="movies-card-list__filter">
          <div className="movies-card-list__checkbox" />
          <p className="movies-card-list__filter-description">Короткометражки</p>
        </div>
      </div>
      <ul className="movies-card-list__list">
        <li className="movies-card">
          <div
            className="movies-card__image-container"
            style={{ backgroundImage: `url(${posterOne})` }}
          />
          <div className="movies-card__text-container"></div>
          <p className="movies-card__name">33 слова о дизайне</p>
          <p className="movies-card__duration">1ч 42м</p>
          <div className="movies-card__button-container">
            {wasSaved ? (
              <button type="button" className="movies-card__remove" onClick={handleRemoveClick} />
            ) : (
              <button
                type="button"
                className={classNames('movies-card__like', {
                  'movies-card__like_active': isLiked,
                })}
                onClick={handleLikeClick}
              />
            )}
          </div>
        </li>
      </ul>
    </section>
  );
}

export default MoviesCardList;
