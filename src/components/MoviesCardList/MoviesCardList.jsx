import { useState, useEffect } from 'react';
import { FilterCheckbox, MoviesCard, Preloader, SearchForm } from '../';
import { NOTIFICATIONS, CONTENT_DISPLAY_SETTINGS } from '../../utils/constants';

function MoviesCardList({ state, onSearchSubmit, onToggleFilter, onMovieLike, onMovieRemove }) {
  const { MOBILE_WIDTH, MAX_NUMBER_OF_CARDS, MIN_NUMBER_OF_CARDS } = CONTENT_DISPLAY_SETTINGS;
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
  const [moviesQuantity, setMoviesQuantity] = useState(MAX_NUMBER_OF_CARDS);
  const [renderedMovies, setRenderedMovies] = useState([]);
  let timeoutId = null;

  useEffect(() => {
    wasSaved
      ? setRenderedMovies(resultMovies.slice(0).reverse())
      : setRenderedMovies(resultMovies);
  }, [resultMovies, wasSaved]);

  useEffect(() => {
    if (!wasSaved) {
      if (windowWidth <= MOBILE_WIDTH) {
        setMoviesQuantity(MIN_NUMBER_OF_CARDS);
      } else {
        setMoviesQuantity(MAX_NUMBER_OF_CARDS);
      }
    }
  }, [wasSaved, windowWidth, MAX_NUMBER_OF_CARDS, MIN_NUMBER_OF_CARDS, MOBILE_WIDTH]);

  useEffect(() => {
    if (!wasSaved) {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };
  }, []);

  function handleResize() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(setWindowWidth(window.innerWidth, 2000));
  }

  function displayMoreMovies() {
    if (windowWidth <= MOBILE_WIDTH) {
      setMoviesQuantity((prev) => prev + MIN_NUMBER_OF_CARDS);
    } else {
      setMoviesQuantity((prev) => prev + MAX_NUMBER_OF_CARDS);
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
        <p className="movies-card-list__notification">{NOTIFICATIONS.SERVER_ERROR}</p>
      )}
      {noResult && <p className="movies-card-list__notification">{NOTIFICATIONS.NOTHING_FOUND}</p>}
      {successfully && (
        <>
          <ul className="movies-card-list__list">
            {renderedMovies
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
          {(resultMovies.length > moviesQuantity && !wasSaved) && (
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