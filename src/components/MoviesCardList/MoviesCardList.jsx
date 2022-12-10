import { useState, useEffect } from 'react';
import { MoviesCard } from '../';
import fakeMovies from '../../utils/fakeMovies';

function MoviesCardList() {
  const screenWithMobile = 420;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesLength, setMoviesLength] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    if (windowWidth <= screenWithMobile) {
      setMoviesLength(5);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {fakeMovies
          .filter((item) => item.id <= moviesLength)
          .map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
      </ul>
      <button className="movies-card-list__button-more">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
