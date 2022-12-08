import { useState } from 'react';
import { SearchForm, MoviesCardList, FilterCheckbox } from '../';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm className="movies__search-form"/>
        <FilterCheckbox className="movies__filter-checkbox" description="Короткометражки" />
        <MoviesCardList isLoading={isLoading} />
      </div>
    </section>
  );
}

export default Movies;
