const URL = " https://api.nomoreparties.co/beatfilm-movies";

const getRes = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

export const getMovies =() => {
    return fetch(`${URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
      }).then(getRes);
    }