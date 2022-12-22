import {moviesData, url} from './constants';

function generalFilter(moviesArray, searchText, filterShortMovies) {
  const isRusLang = checkRusLang(searchText);
  const foundMovies = filterTheArrayByKeyString(moviesArray, searchText, isRusLang);

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

function prepareMovieForSaving(data) {
  const result = {
    country: data.country,
    director: data.director,
    duration: data.duration,
    year: data.year,
    description: data.description,
    image: `${url.moviesApi}${data.image.url}`,
    trailerLink: data.trailerLink,
    thumbnail: `${url.moviesApi}${data.image.formats.thumbnail.url}`,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
    movieId: data.id,
  }
  return result;
}

export {generalFilter, prepareMovieForSaving}