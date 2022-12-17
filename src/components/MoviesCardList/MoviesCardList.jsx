import { useState, useEffect } from 'react';
import { FilterCheckbox, MoviesCard, Preloader, SearchForm } from '../';

function MoviesCardList({ isLoading, movies, wasSaved, onSearch, filter, onToggleFilter, displayMovies }) {

  const screenWithMobile = 420;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesQuantity, setMoviesQuantity] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    if (windowWidth <= screenWithMobile) {
      setMoviesQuantity(5);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <section className="movies-card-list">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <SearchForm className="movies-card-list__search-form" onSubmit={onSearch}/>
          <FilterCheckbox
            className="movies-card-list__filter-checkbox"
            description="Короткометражки"
            filterIsActive={filter.shortFilms}
            onToggleFilter={onToggleFilter}

          />
          <ul className="movies-card-list__list">
            {movies
              .filter((item, index) => index < moviesQuantity)
              .map((movie) => (
                <MoviesCard key={movie.id} movie={movie} wasSaved={wasSaved}/>
              ))}
          </ul>
          {movies.length > moviesQuantity && <button className="movies-card-list__button-more">Ещё</button>}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
