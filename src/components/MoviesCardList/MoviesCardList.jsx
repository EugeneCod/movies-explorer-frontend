import { useState, useEffect } from 'react';
import { FilterCheckbox, MoviesCard, Preloader, SearchForm } from '../';
import { notifications, contentDisplaySettings } from '../../utils/constants';

function MoviesCardList({ state, onSearchSubmit, onToggleFilter, onMovieLike, onMovieRemove }) {
  const { mobileWidth, maxNumberOfCards, minNumberOfCards } = contentDisplaySettings;
  const {
    resultMovies,
    searchText,
    shortMoviesFilter,
    wasSaved,
    isLoading,
    isLoadingError,
    noResult,
    successfully,
  } = state;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesQuantity, setMoviesQuantity] = useState(maxNumberOfCards);
  let timeoutId = null;

  useEffect(() => {
    if (!wasSaved) {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (!wasSaved) {
      if (windowWidth <= mobileWidth) {
        setMoviesQuantity(minNumberOfCards);
      } else {
        setMoviesQuantity(maxNumberOfCards);
      }
    }
  }, [wasSaved, windowWidth, maxNumberOfCards, minNumberOfCards, mobileWidth]);

  function handleResize() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(setWindowWidth(window.innerWidth, 2000));
  }

  function displayMoreMovies() {
    if (windowWidth <= mobileWidth) {
      setMoviesQuantity((prev) => prev + minNumberOfCards);
    } else {
      setMoviesQuantity((prev) => prev + maxNumberOfCards);
    }
  }

  return (
    <section className="movies-card-list">
      <SearchForm
        className="movies-card-list__search-form"
        onSubmit={onSearchSubmit}
        searchText={searchText}
      />
      <FilterCheckbox
        className="movies-card-list__filter-checkbox"
        description="Короткометражки"
        filterIsActive={shortMoviesFilter}
        onToggleFilter={onToggleFilter}
      />
      {isLoading && <Preloader />}
      {isLoadingError && (
        <p className="movies-card-list__notification">{notifications.serverError}</p>
      )}
      {noResult && <p className="movies-card-list__notification">{notifications.nothingFound}</p>}
      {successfully && (
        <>
          <ul className="movies-card-list__list">
            {resultMovies
              .filter((item, index) => index < moviesQuantity)
              .map((movie, index) => (
                <MoviesCard
                  key={movie.id || movie._id}
                  movie={movie}
                  wasSavedList={wasSaved}
                  onMovieRemove={onMovieRemove}
                  onMovieLike={onMovieLike}
                />
              ))}
          </ul>
          {(resultMovies.length > moviesQuantity || !wasSaved) && (
            <button onClick={displayMoreMovies} className="movies-card-list__button-more">
              Ещё
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
