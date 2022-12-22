import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { url } from '../../utils/constants';

function MoviesCard({ movie, wasSavedList, onMovieRemove, onMovieLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [resDuration, setResDuration] = useState('');
  const [savedMovieId, setSavedMovieId] = useState('');

  useEffect(() => {
    function calculateDuration() {
      let hours = Math.trunc(movie.duration / 60);
      let minutes = movie.duration % 60;
      return `${hours}ч ${minutes}м`;
    }

    setResDuration(calculateDuration());
  }, [movie.duration]);

  useEffect(() => {
    if (wasSavedList) return;
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (!savedMovies) return;
    console.log(savedMovies);
    const savedMovie = savedMovies.find((item) => item.movieId === movie.id);
    if (savedMovie) {
      setIsLiked(true);
      setSavedMovieId(savedMovie._id);
    }
  }, [wasSavedList, movie]);

  function handleLikeClick() {
    console.log('click');
    console.log(isLiked);
    !isLiked ? onMovieLike(movie) : onMovieRemove(savedMovieId);
  }

  function handleRemoveClick() {
    onMovieRemove(movie._id);
  }

  return (
    <li className="movies-card">
      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="movies-card__trailer-link">
        <div
          className="movies-card__image-container"
          style={{ backgroundImage: `url(${url.serverApi}${movie.image.url})` }}
        />
      </a>
      <div className="movies-card__text-container">
        <p className="movies-card__name">{movie.nameRU}</p>
        <p className="movies-card__duration">{resDuration}</p>
        {wasSavedList ? (
          <button
            type="button"
            className="movies-card__button movies-card__button-remove"
            onClick={handleRemoveClick}
          />
        ) : (
          <button
            type="button"
            className={classNames('movies-card__button movies-card__button-like', {
              'movies-card__button-like_active': isLiked,
            })}
            onClick={handleLikeClick}
          />
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
