import {moviesData} from './constants';

function generalFilter() {
  const initialMovies = JSON.parse(localStorage.getItem('initialMovies')) || [];
  const searchText = localStorage.getItem('searchText') || '';
  const filterShortMovies = JSON.parse(localStorage.getItem('filterShortMovies')) || false;

  const isRusLang = checkRusLang(searchText);
  const foundMovies = filterTheArrayByKeyString(initialMovies, searchText, isRusLang);

  const resultMovies =
    filterShortMovies === true
      ? filterTheArrayByDuration(foundMovies, moviesData.shortFilmDuration)
      : foundMovies;
  return resultMovies;
}

function filterTheArrayByKeyString(array, keyString, isRusLang) {
  const { nameRu, nameEn } = moviesData;
  const objectField = isRusLang ? nameRu : nameEn;
  return array.filter((item) =>
    item[objectField].toLowerCase().includes(keyString.toLowerCase()),
  );
}

function filterTheArrayByDuration(array, duration) {
  return array.filter((item) => item.duration <= duration);
}

function checkRusLang(strForCheck) {
  const regex = /[а-яёА-ЯЁ]+/;
  return regex.test(strForCheck);
}

export {generalFilter}