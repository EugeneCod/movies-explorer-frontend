import { useReducer, useEffect, useContext } from 'react';

import { AuthContext } from '../../context';
import { MoviesCardList } from '../';
import { deleteMovie, getSavedMovies } from '../../utils/mainApi';
import { generalFilter } from '../../utils/functions';

function SavedMovies() {
  const { savedMovies, setSavedMovies } = useContext(AuthContext);
  const initialSavedMoviesListState = {
    resultMovies: savedMovies || [],
    searchText: localStorage.getItem('searchSavedMoviesText') || '',
    shortMoviesFilter: JSON.parse(localStorage.getItem('filterShortSavedMovies')) || false,
    wasSaved: true,
    isLoading: false,
    isLoadingError: false,
    noResult: false,
    successfully: false,
  };

  const [savedMoviesListState, updateSavedMoviesListState] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialSavedMoviesListState,
  );

  const { searchText, shortMoviesFilter } = savedMoviesListState;

  useEffect(() => {
    const filteredMovies = generalFilter(savedMovies, searchText, shortMoviesFilter);
    updateSavedMoviesListState({
      resultMovies: generalFilter(filteredMovies, searchText, shortMoviesFilter),
      successfully: true,
    })
  }, [savedMovies, searchText, shortMoviesFilter]);

  async function handleSearchSubmit(searchText) {
    return;
  }

  function handleToggleFilter(currentState) {
    updateSavedMoviesListState({ shortMoviesFilter: !currentState });
    localStorage.setItem('filterShortMovies', JSON.stringify(!currentState));
  }

  function handleMovieRemove(movieId) {
    console.log(movieId);
    deleteMovie(movieId)
      .then((removedMovie) => {
        updateSavedMoviesListState({
          resultMovies: savedMoviesListState.resultMovies.filter((movie) => movie._id !== movieId),
        });
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
