import { renderMovies, setFilms } from './renderMovies.js';

const BASE_URL = "https://api.themoviedb.org/3/";
const container = document.querySelector(".movie__container");
const input = document.querySelector('input[name="searchQuery"]');
const form = document.querySelector("#search-form");
const searchResult = document.querySelector(".search__result");

searchResult.style.display = "none";

async function fetchSearchFilms(title) {
  const response = await fetch(
    `${BASE_URL}search/movie?api_key=5d5fbc20666787ca7b4a0d9d71c08715&query=${title}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}
function searchFilms() {
  fetchSearchFilms(input.value)
    .then((movie) => {
      if (movie.results.length === 0) {
        searchResult.style.display = "block";
      }
      renderMovies(movie);
    })
    .catch((err) => {
      console.log(err);
    });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form === "") {
    container.innerHTML = "";
    setFilms();
    searchResult.style.display = "none";
  } else {
    container.innerHTML = "";
    searchFilms();
    searchResult.style.display = "none";
  }
});
