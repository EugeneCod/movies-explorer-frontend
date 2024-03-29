import { useReducer, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context';
import { MoviesCardList } from '../';
import { getMovies } from '../../utils/moviesApi';
import { saveMovie, deleteMovie } from '../../utils/mainApi';
import { ROUTES } from '../../utils/constants';
import { generalFilter, prepareMovieForSaving, clearStorage } from '../../utils/functions';

function Movies() {
  const navigate = useNavigate();
  const { setSavedMovies, setLoggedIn, isLoading, setIsLoading } = useContext(CurrentUserContext);
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
    if (isLoading) return;
    setIsLoading(true)
    saveMovie(prepareMovieForSaving(movie))
      .then((savedMovie) => {
        setSavedMovies((prev) => {
          return [...prev, savedMovie];
        });
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate(ROUTES.MAIN);
          clearStorage();
          setLoggedIn(false);
          return;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleMovieRemove(movieId) {
    if (isLoading) return;
    setIsLoading(true)
    deleteMovie(movieId)
      .then((removedMovie) => {
        setSavedMovies((prev) => {
          return prev.filter((movie) => movie._id !== movieId);
        });
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate(ROUTES.MAIN);
          clearStorage();
          setLoggedIn(false);
          return;
        }
      })
      .finally(() => {
        setIsLoading(false);
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
