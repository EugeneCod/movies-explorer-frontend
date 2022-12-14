import { useState } from 'react';

import { MoviesCardList } from '../';
import fakeMovies from '../../utils/fakeMovies';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="movies">
      <div className="movies__container">
        <MoviesCardList isLoading={isLoading} movies={fakeMovies} wasSaved={false} />
      </div>
    </main>
  );
}

export default Movies;
