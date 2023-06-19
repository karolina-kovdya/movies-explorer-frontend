const BASE_URL = "https://api.karolina.movie.nomoredomains.monster";

const getRes = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
  }).then(getRes)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(getRes);
};

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(getRes);
};

export const getUserInfo = () => {
  const jwt = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  }).then(getRes);
};

export const editProfile = (name, email) => {
  const jwt = localStorage.getItem("jwt")
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify( {name: name, email: email} ),
  }).then(getRes);
}

export const saveMovie = (movie) => {
  const jwt = localStorage.getItem("jwt")
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    }),
  }).then(getRes);
};

export const getMovies = () => {
  const jwt = localStorage.getItem("jwt")
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(getRes);
};

export const deleteMovie = (id) => {
  const jwt = localStorage.getItem("jwt")
    return fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    }).then(getRes);
}


