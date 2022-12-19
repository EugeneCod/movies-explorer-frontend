import { useReducer, useEffect } from 'react';

import { MoviesCardList } from '../';
import { getSavedMovies } from '../../utils/mainApi';
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

  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <MoviesCardList
          state={savedMoviesListState}
          onSearchSubmit={handleSearchSubmit}
          onToggleFilter={handleToggleFilter}
        />
      </div>
    </main>
  );
}

export default SavedMovies;
