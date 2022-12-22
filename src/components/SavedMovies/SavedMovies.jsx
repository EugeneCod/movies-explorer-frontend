import { useReducer, useEffect } from 'react';

import { MoviesCardList } from '../';
import { getSavedMovies } from '../../utils/mainApi';
import { deleteMovie } from '../../utils/mainApi';
import { generalFilter } from '../../utils/functions';

function SavedMovies() {
  const initialSavedMoviesListState = {
    savedMovies: JSON.parse(localStorage.getItem('savedMovies')) || [],
    resultMovies: JSON.parse(localStorage.getItem('resultSavedMovies')) || [],
    searchText: localStorage.getItem('searchSavedMoviesText') || '',
    shortMoviesFilter: JSON.parse(localStorage.getItem('filterShortSavedMovies')) || false,
    wasSaved: true,
    moviesLoadingStatus: {
      isLoading: false,
      isLoadingError: false,
      noResult: false,
      successfully: false,
    },
  };

  const [savedMoviesListState, updateSavedMoviesListState] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialSavedMoviesListState,
  );

  const { searchText, shortMoviesFilter } = savedMoviesListState;

  useEffect(() => {
    getSavedMovies()
      .then((moviesData) => {
        updateSavedMoviesListState({
          resultMovies: generalFilter(moviesData, searchText, shortMoviesFilter),
          moviesLoadingStatus: { successfully: true },
        });
        localStorage.setItem('savedMovies', JSON.stringify(moviesData));
      })
      .catch((err) => console.log(`${err} при загрузке сохраненных фильмов`));
  }, []);

  async function handleSearchSubmit(searchText) {
    return
  }

  function handleToggleFilter(currentState) {
    updateSavedMoviesListState({ shortMoviesFilter: !currentState });
    localStorage.setItem('filterShortMovies', JSON.stringify(!currentState));
  }

  function handleMovieRemove(movieId) {
    console.log(movieId);
    deleteMovie(movieId)
    .then((removedMovie) => {
      updateSavedMoviesListState({resultMovies: savedMoviesListState.resultMovies.filter((movie) => movie._id !== movieId)});
    })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <MoviesCardList
          state={savedMoviesListState}
          onSearchSubmit={handleSearchSubmit}
          onToggleFilter={handleToggleFilter}
          onMovieRemove={handleMovieRemove}
        />
      </div>
    </main>
  );
}

export default SavedMovies;
