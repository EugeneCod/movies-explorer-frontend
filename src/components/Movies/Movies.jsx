import { useState } from 'react';

import { MoviesCardList } from '../';
import fakeMovies from '../../utils/fakeMovies';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="movies">
      <div className="movies__container">
        <MoviesCardList isLoading={isLoading} movies={fakeMovies} wasSaved={false} />
      </div>
    </section>
  );
}

export default Movies;
