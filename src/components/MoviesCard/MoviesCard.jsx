import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';

import { AuthContext } from '../../context';
import { URL } from '../../utils/constants';

function MoviesCard({ movie, wasSavedList, onMovieRemove, onMovieLike }) {
  const { savedMovies } = useContext(AuthContext);
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
    const savedMovie = savedMovies.find((item) => item.movieId === movie.id);
    if (savedMovie) {
      setIsLiked(true);
      setSavedMovieId(savedMovie._id);
    } else {
      setIsLiked(false);
      setSavedMovieId('');
    }
  }, [wasSavedList, savedMovies, movie]);

  function handleLikeClick() {
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
          style={
            wasSavedList
              ? { backgroundImage: `url(${movie.image})` }
              : { backgroundImage: `url(${URL.MOVIES_API}${movie.image.url})` }
          }
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
