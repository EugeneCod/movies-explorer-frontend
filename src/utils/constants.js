export const url = {
  mainApi: 'http://localhost:3001',
  moviesApi: 'https://api.nomoreparties.co/beatfilm-movies',
  serverApi: 'https://api.nomoreparties.co/',
  testMainApi: 'http://localhost:3001',
  // 'https://api.diplom.ekg.nomoredomains.club'
}

export const searchFormErrorMessages = {
  inputIsRequired: 'Нужно ввести ключевое слово',
}

export const authErrorMessages = {
  emailConflict: 'Пользователь с таким email уже зарегистрирован',
  unidentified: 'В процессе авторизации произошла ошибка',
}

export const moviesData = {
  nameRu: 'nameRU',
  nameEn: 'nameEN',
  shortFilmDuration: 40,
}

export const notifications = {
  nothingFound: 'Ничего не найдено',
  serverError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',

}

export const contentDisplaySettings = {
  mobileWidth: 480,
  maxNumberOfCards: 7,
  minNumberOfCards: 5,
}

export const routes = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signup: '/signup',
  signin: '/signin',
  unassigned: '*',
}

export const infoTooltpOptions = {
  profileСhanged: {
    text: 'Данные профиля успешно обновлены!',
    imageName: 'approval'
  },
  failure: {
    text: 'Что-то пошло не так! Попробуйте ещё раз.',
    imageName: 'failure'
  }
}
