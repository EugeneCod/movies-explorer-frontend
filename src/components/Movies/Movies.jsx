import { useState } from 'react';
import { SearchForm, MoviesCardList } from '../';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList isLoading={isLoading} />
    </section>
  );
}

export default Movies;
