import { useReducer, useEffect } from 'react';

import { MoviesCardList } from '../';
import { getMovies } from '../../utils/movies.Api';
import { generalFilter } from '../../utils/functions';

function Movies() {
  const initialmoviesListState = {
    initialMovies: JSON.parse(localStorage.getItem('initialMovies')) || [],
    resultMovies: JSON.parse(localStorage.getItem('resultMovies')) || [],
    searchText: localStorage.getItem('searchText') || '',
    shortMoviesFilter: JSON.parse(localStorage.getItem('filterShortMovies')) || false,
    wasSaved: false,
    moviesLoadingStatus: {
      isLoading: false,
      isLoadingError: false,
      noResult: false,
      successfully: false,
    },
  };

  const [moviesListState, updateMoviesListState] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialmoviesListState,
  );

  useEffect(() => {
    moviesListState.resultMovies.length > 0 &&
      updateMoviesListState({ moviesLoadingStatus: { successfully: true } });
      updateMoviesListState({ resultMovies: generalFilter()});
  }, []);

  useEffect(() => {
    updateMoviesListState({ resultMovies: generalFilter()});
  }, [moviesListState.shortMoviesFilter]);

  async function handleSearchSubmit(searchText) {
    updateMoviesListState({ isLoading: true, searchText });
    if (!localStorage.getItem('initialMovies')) {
      try {
        const initialMovies = await getMovies();
        localStorage.setItem('initialMovies', JSON.stringify(initialMovies));
      } catch (err) {
        updateMoviesListState({ isLoadingError: true });
        console.log(`При загрузке фильмов произошла ошибка: ${err}`);
      }
    }
    const resultMovies = generalFilter();
    updateMoviesListState({ resultMovies: resultMovies, isLoading: false });
    
    localStorage.setItem('resultMovies', JSON.stringify(resultMovies));
    moviesListState.resultMovies.length === 0
      ? updateMoviesListState({ moviesLoadingStatus: { noResult: true } })
      : updateMoviesListState({ moviesLoadingStatus: { successfully: true } });
  }

  function handleToggleFilter(currentState) {
    updateMoviesListState({ shortMoviesFilter: !currentState });
    localStorage.setItem('filterShortMovies', JSON.stringify(!currentState));
  }

  function handleSearchInput(value) {
    updateMoviesListState({ searchText: value });
    localStorage.setItem('searchText', value);
  }

  return (
    <main className="movies">
      <div className="movies__container">
        <MoviesCardList
          state={moviesListState}
          onSearchSubmit={handleSearchSubmit}
          onSearchInput={handleSearchInput}
          onToggleFilter={handleToggleFilter}
        />
      </div>
    </main>
  );
}

export default Movies;
