import { useReducer, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context';
import { MoviesCardList } from '../';
import { deleteMovie } from '../../utils/mainApi';
import { ROUTES } from '../../utils/constants';
import { generalFilter, clearStorage } from '../../utils/functions';

function SavedMovies() {
  const navigate = useNavigate();
  const { savedMovies, setSavedMovies, setLoggedIn, isLoading, setIsLoading } = useContext(CurrentUserContext);
  const initialSavedMoviesListState = {
    resultMovies: savedMovies || [],
    searchText: '',
    shortMoviesFilter: false,
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

  function handleSearchSubmit(searchValue) {
    if (savedMovies.length === 0) return;
    updateSavedMoviesListState({ searchText: searchValue });
    const resultMovies = generalFilter(savedMovies, searchValue, shortMoviesFilter);
    updateSavedMoviesListState({ resultMovies });
  }

  function handleToggleFilter(currentState) {
    updateSavedMoviesListState({ shortMoviesFilter: !currentState });
  }

  function handleMovieRemove(movieId) {
    if (isLoading) return;
    setIsLoading(true)
    deleteMovie(movieId)
      .then((removedMovie) => {
        updateSavedMoviesListState({
          resultMovies: savedMoviesListState.resultMovies.filter((movie) => movie._id !== movieId),
        });
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
