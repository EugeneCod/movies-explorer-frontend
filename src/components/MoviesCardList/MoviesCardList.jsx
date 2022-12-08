import { MoviesCard } from '../';
import fakeMovies from '../../utils/fakeMovies';

function MoviesCardList() {

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {fakeMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </ul>
      <button className="movies-card-list__button-more">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
