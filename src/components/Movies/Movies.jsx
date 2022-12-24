import { useReducer, useEffect, useContext } from 'react';

import { AuthContext } from '../../context';
import { MoviesCardList } from '../';
import { getMovies } from '../../utils/moviesApi';
import { saveMovie, deleteMovie } from '../../utils/mainApi';
import { generalFilter, prepareMovieForSaving } from '../../utils/functions';

function Movies() {
  const { savedMovies, setSavedMovies } = useContext(AuthContext);
  const initialMoviesListState = {
    initialMovies: JSON.parse(localStorage.getItem('initialMovies')) || [],
    resultMovies: JSON.parse(localStorage.getItem('resultMovies')) || [],
    searchText: localStorage.getItem('searchText') || '',
    shortMoviesFilter: JSON.parse(localStorage.getItem('filterShortMovies')) || false,
    wasSaved: false,
    isLoading: false,
    isLoadingError: false,
    noResult: false,
    successfully: false,
  };

  const [moviesListState, updateMoviesListState] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialMoviesListState,
  );

  const { initialMovies, searchText, shortMoviesFilter } = moviesListState;

  useEffect(() => {
    moviesListState.initialMovies.length > 0 &&
      updateMoviesListState({
        resultMovies: generalFilter(initialMovies, searchText, shortMoviesFilter),
        successfully: true,
      });
  }, []);

  useEffect(() => {
    updateMoviesListState({
      resultMovies: generalFilter(initialMovies, searchText, shortMoviesFilter),
    });
  }, [moviesListState.shortMoviesFilter]);

  async function handleSearchSubmit(searchValue) {
    updateMoviesListState({ isLoading: true });
    updateMoviesListState({ searchText: searchValue });
    localStorage.setItem('searchText', searchValue);
    let foundMovies = initialMovies;
    if (foundMovies.length === 0) {
      try {
        foundMovies = await getMovies();
        localStorage.setItem('initialMovies', JSON.stringify(foundMovies));
        updateMoviesListState({ initialMovies: foundMovies });
      } catch (err) {
        updateMoviesListState({ isLoadingError: true });
        console.log(`При загрузке фильмов произошла ошибка: ${err}`);
        return;
      }
    }
    const resultMovies = generalFilter(foundMovies, searchValue, shortMoviesFilter);
    updateMoviesListState({ resultMovies, isLoading: false });

    localStorage.setItem('resultMovies', JSON.stringify(resultMovies));
    resultMovies.length === 0
      ? updateMoviesListState({ successfully: false, noResult: true })
      : updateMoviesListState({ successfully: true, noResult: false });
  }

  function handleToggleFilter(currentState) {
    updateMoviesListState({ shortMoviesFilter: !currentState });
    localStorage.setItem('filterShortMovies', JSON.stringify(!currentState));
  }

  function handleMovieLike(movie) {
    saveMovie(prepareMovieForSaving(movie))
      .then((savedMovie) => {
        setSavedMovies((prev) => {
          return [...prev, savedMovie];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieRemove(movieId) {
    deleteMovie(movieId)
      .then((removedMovie) => {
        setSavedMovies((prev) => {
          return prev.filter((movie) => movie._id !== movieId);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="movies">
      <div className="movies__container">
        <MoviesCardList
          state={moviesListState}
          onSearchSubmit={handleSearchSubmit}
          // onSearchInput={handleSearchInput}
          onToggleFilter={handleToggleFilter}
          onMovieLike={handleMovieLike}
          onMovieRemove={handleMovieRemove}
        />
      </div>
    </main>
  );
}

export default Movies;
