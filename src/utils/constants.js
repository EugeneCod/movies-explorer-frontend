export const URL = {
  MAIN_API: 'https://api.diplom.ekg.nomoredomains.club',
  MOVIES_API: 'https://api.nomoreparties.co',
}

export const SEARCH_FORM_ERROR_MESSAGES = {
  INPUT_IS_REQUIRED: 'Нужно ввести ключевое слово',
}

export const AUTH_ERROR_MESSAGES = {
  EMAIL_CONFLICT: 'Пользователь с таким email уже зарегистрирован',
  UNIDENTIFIED: 'В процессе авторизации произошла ошибка',
  INCORRECT_EMAIL_OR_PASSWORD: 'Неправильные почта или пароль',
}

export const MOVIES_DATA = {
  NAME_RU: 'nameRU',
  NAME_EN: 'nameEN',
  SHORT_MOVIE_DURATION: 40,
}

export const NOTIFICATIONS = {
  NOTHING_FOUND: 'Ничего не найдено',
  SERVER_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',

}

export const CONTENT_DISPLAY_SETTINGS = {
  MOBILE_WIDTH: 480,
  MAX_NUMBER_OF_CARDS: 7,
  MIN_NUMBER_OF_CARDS: 5,
}

export const ROUTES = {
  MAIN: '/',
  MOVIES: '/movies',
  SAVED_MOVIES: '/saved-movies',
  PROFILE: '/profile',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  UNASSIGNED: '*',
}

export const INFO_TOOLTIP_OPTIONS = {
  PROFILE_CHANGED: {
    TEXT: 'Данные профиля успешно обновлены!',
    IMAGE_NAME: 'approval'
  },
  EMAIL_CONFLICT: {
    TEXT: AUTH_ERROR_MESSAGES.EMAIL_CONFLICT,
    IMAGE_NAME: 'failure'
  },
  FAILURE: {
    TEXT: 'Что-то пошло не так! Попробуйте ещё раз.',
    IMAGE_NAME: 'failure'
  }
}

export const REGEX = {
  NAME: '[а-яА-Яa-zA-ZёË\\- ]{1,}',
  EMAIL: '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$',
}
