import { useState, useEffect } from 'react';
import classNames from 'classnames';

function MoviesCard({ wasSaved, movie, onMovieRemove, onMovieLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [resDuration, setResDuration] = useState('');

  useEffect(() => {
    function calculateDuration() {
      let hours = Math.trunc(movie.duration / 60);
      let minutes = movie.duration % 60;
      return `${hours}ч ${minutes}м`;
    }

    setResDuration(calculateDuration());
  }, [movie.duration]);

  function handleLikeClick() {
    console.log('click');
    setIsLiked(!isLiked);
  }

  function handleRemoveClick() {
    return;
  }

  return (
    <li className="movies-card">
      <div
        className="movies-card__image-container"
        style={{ backgroundImage: `url(${movie.image.url})` }}
      />
      <div className="movies-card__text-container">
        <p className="movies-card__name">{movie.nameRU}</p>
        <p className="movies-card__duration">{resDuration}</p>
        {wasSaved ? (
          <button type="button" className="movies-card__button movies-card__button_remove" onClick={handleRemoveClick} />
        ) : (
          <button
            type="button"
            className={classNames('movies-card__button movies-card__button_like', {
              'movies-card__like_active': isLiked,
            })}
            onClick={handleLikeClick}
          />
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
