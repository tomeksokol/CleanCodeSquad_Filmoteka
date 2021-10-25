const BASE_URL = "https://api.themoviedb.org/3/";
const container = document.querySelector(".movie__container");
const input = document.querySelector('input[name="searchQuery"]');
const searchResult = document.querySelector(".search__result");
import { renderMovies, setFilms } from "./renderMovies";
searchResult.style.display = "none";

async function fetchSearchFilms(title) {
  return fetch(
    `${BASE_URL}search/movie?api_key=5d5fbc20666787ca7b4a0d9d71c08715&query=${title}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
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
input.addEventListener("input", (e) => {
  e.preventDefault();
  if (input.value === "") {
    container.innerHTML = "";
    setFilms();
    searchResult.style.display = "none";
  } else {
    container.innerHTML = "";
    searchFilms();
    searchResult.style.display = "none";
  }
});
