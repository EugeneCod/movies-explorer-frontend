import { useReducer, useEffect } from 'react';

import { MoviesCardList } from '../';
import { getMovies } from '../../utils/moviesApi';
import { generalFilter } from '../../utils/functions';

function Movies() {
  const initialMoviesListState = {
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
    initialMoviesListState,
  );

  const { initialMovies, searchText, shortMoviesFilter } = moviesListState;

  useEffect(() => {
    moviesListState.resultMovies.length > 0 &&
      updateMoviesListState({ moviesLoadingStatus: { successfully: true } });
    updateMoviesListState({
      resultMovies: generalFilter(initialMovies, searchText, shortMoviesFilter),
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
    if (!localStorage.getItem('initialMovies')) {
      try {
        const foundMovies = await getMovies();
        localStorage.setItem('initialMovies', JSON.stringify(foundMovies));
        updateMoviesListState({ initialMovies: foundMovies });
      } catch (err) {
        updateMoviesListState({ isLoadingError: true });
        console.log(`При загрузке фильмов произошла ошибка: ${err}`);
      }
    }
    const resultMovies = generalFilter(initialMovies, searchValue, shortMoviesFilter);
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

  // function handleSearchInput(value) {
    // updateMoviesListState({ searchText: value });
    // localStorage.setItem('searchText', value);
  // }

  return (
    <main className="movies">
      <div className="movies__container">
        <MoviesCardList
          state={moviesListState}
          onSearchSubmit={handleSearchSubmit}
          // onSearchInput={handleSearchInput}
          onToggleFilter={handleToggleFilter}
        />
      </div>
    </main>
  );
}

export default Movies;
