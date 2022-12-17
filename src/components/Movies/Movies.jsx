import { useState } from 'react';

import { MoviesCardList } from '../';
import { getMovies } from '../../utils/movies.Api';
// import fakeMovies from '../../utils/fakeMovies';
import { moviesData } from '../../utils/constants';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [displayMovies, setDisplayMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filter, setFilter] = useState({ shortMovies: false });

  function filterTheArrayByKeyString(array, keyString, isRusLang) {
    const { nameRu, nameEn } = moviesData;
    const objectField = isRusLang ? nameRu : nameEn;
    console.log(array);
    console.log(objectField);
    console.log(keyString);
    return array.filter((item) => item[objectField].toLowerCase().includes(keyString.toLowerCase()));
    
  }

  function filterTheArrayByDuration(array, duration) {
    return array.filter((item) => item.duration <= duration);
  }

  function checkRusLang(strForCheck) {
    const regex = /[а-яёА-ЯЁ]+/;
    return regex.test(strForCheck);
  }

  async function handleSearchFilms(searchText) {
    setIsLoading(true);
    if (!localStorage.getItem('initialMovies')) {
      try {
        const initialMovies = await getMovies();
        localStorage.setItem('initialMovies', JSON.stringify(initialMovies));
      } catch (err) {
        console.log(`При загрузке фильмов произошла ошибка: ${err}`);
      }
    }
    const initialMovies = JSON.parse(localStorage.getItem('initialMovies'));
    localStorage.setItem('filterShortFilms', filter.shortMovies);
    localStorage.setItem('searcText', searchText);
    const isRusLang = checkRusLang(searchText);
    const foundMovies = filterTheArrayByKeyString(initialMovies, searchText, isRusLang);
    console.log(foundMovies);
    const resultMovies =
      localStorage.getItem('filterShortFilms') === true
        ? filterTheArrayByDuration(foundMovies, moviesData.shortFilmDuration)
        : foundMovies;
    setFilteredMovies(resultMovies);
    setDisplayMovies(true);
    setIsLoading(false);
  }

  // Как только поиск произведён, текст запроса, найденные фильмы и состояние переключателя короткометражек
  // сохраняются в хранилище, а блок появляется.

  return (
    <main className="movies">
      <div className="movies__container">
        <MoviesCardList
          isLoading={isLoading}
          movies={filteredMovies}
          wasSaved={false}
          onSearch={handleSearchFilms}
          displayMovies={displayMovies}
          filter={filter}
          onToggleFilter={setFilter}
        />
      </div>
    </main>
  );
}

export default Movies;
