import { URL } from '../utils/constants';

/* -----------------Authorisation----------------- */

export const register =  async (name, email, password) => {
  const response = await fetch(`${URL.MAIN_API}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, }),
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(response);
}

export const login =  async (email, password) => {
  const response = await fetch(`${URL.MAIN_API}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, }),
    credentials: 'include',
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(json.message);
}

export const logout =  async () => {
  const response = await fetch(`${URL.MAIN_API}/signout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(json.message);
}


/* -----------------User----------------- */

export const getUserInfo =  async () => {
  const response = await fetch(`${URL.MAIN_API}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(json.message);
}

export const updateUserInfo =  async (name, email) => {
  const response = await fetch(`${URL.MAIN_API}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, }),
    credentials: 'include',
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(json.message);
}


/* -----------------Movies----------------- */

export const getSavedMovies =  async () => {
  const response = await fetch(`${URL.MAIN_API}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(json.message);
}

export const saveMovie =  async (movieData) => {
  const response = await fetch(`${URL.MAIN_API}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
    credentials: 'include',
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(json.message);
}

export const deleteMovie =  async (movieId) => {
  const response = await fetch(`${URL.MAIN_API}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(json.message);
}