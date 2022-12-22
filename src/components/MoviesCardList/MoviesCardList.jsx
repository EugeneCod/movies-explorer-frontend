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
    moviesLoadingStatus,
  } = state;

  const { isLoading, isLoadingError, noResult, successfully } = moviesLoadingStatus;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesQuantity, setMoviesQuantity] = useState(maxNumberOfCards);
  const [numberOfAdditions, setNumberOfAdditions] = useState(1);

  useEffect(() => {
    if (!wasSaved) {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      if (windowWidth <= mobileWidth) {
        setMoviesQuantity(minNumberOfCards * numberOfAdditions);
      } else {
        setMoviesQuantity(maxNumberOfCards * numberOfAdditions);
      }

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [windowWidth, mobileWidth, minNumberOfCards, maxNumberOfCards, numberOfAdditions, wasSaved]);

  function displayMoreMovies() {
    if (windowWidth <= mobileWidth) {
      setMoviesQuantity((prev) => prev + minNumberOfCards);
    } else {
      setMoviesQuantity((prev) => prev + maxNumberOfCards);
    }
    setNumberOfAdditions((prev) => prev + 1);
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
                <MoviesCard key={`${movie.id}${index}`} movie={movie} wasSavedList={wasSaved} onMovieRemove={onMovieRemove} onMovieLike={onMovieLike} />
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

// isLoading,
//     isLoadingError,
//     noResult,
//     successfully,
