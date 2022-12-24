import { URL } from './constants';

export const getMovies = async () => {
  const response = await fetch(`${URL.MOVIES_API}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return response.ok ? json : Promise.reject(json.message);
};
