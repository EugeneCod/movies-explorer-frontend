import {MOVIES_DATA, URL} from './constants';

function generalFilter(moviesArray, searchText, filterShortMovies) {
  const isRusLang = checkRusLang(searchText);
  const foundMovies = filterTheArrayByKeyString(moviesArray, searchText, isRusLang);
  const resultMovies =
    filterShortMovies === true
      ? filterTheArrayByDuration(foundMovies, MOVIES_DATA.SHORT_MOVIE_DURATION)
      : foundMovies;
  return resultMovies;
}

function filterTheArrayByKeyString(array, keyString, isRusLang) {
  const { NAME_RU, NAME_EN } = MOVIES_DATA;
  const objectField = isRusLang ? NAME_RU : NAME_EN;
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

function prepareMovieForSaving(data) {
  const result = {
    country: data.country,
    director: data.director,
    duration: data.duration,
    year: data.year,
    description: data.description,
    image: `${URL.MOVIES_API}${data.image.url}`,
    trailerLink: data.trailerLink,
    thumbnail: `${URL.MOVIES_API}${data.image.formats.thumbnail.url}`,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
    movieId: data.id,
  }
  return result;
}

function clearStorage() {
  localStorage.removeItem('preauthorization');
  localStorage.removeItem('initialMovies');
  localStorage.removeItem('resultMovies');
  localStorage.removeItem('searchText');
  localStorage.removeItem('filterShortMovies');
}

export {generalFilter, prepareMovieForSaving, clearStorage}