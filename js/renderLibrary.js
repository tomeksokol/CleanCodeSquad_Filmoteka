const BASE_URL = "https://api.themoviedb.org/3/";
const libraryContainer = document.querySelector(".library__container");
let movieId = [];

async function fetchFilms() {
  const page = 1;
  return fetch(
    `${BASE_URL}trending/movie/week?api_key=5d5fbc20666787ca7b4a0d9d71c08715`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

async function setFilms() {
  fetchFilms()
    .then((movie) => {
      renderMovies(movie);
    })
    .catch((err) => {
      console.log(err);
    });
}
setFilms();

async function fetchGenres() {
  return fetch(
    `${BASE_URL}genre/movie/list?api_key=5d5fbc20666787ca7b4a0d9d71c08715`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function setGenres() {
  fetchGenres().then((id) => {
    return (movieId = id.genres);
  });
}
setGenres();
function renderMovies(movie) {
  movie.results.forEach(
    ({ original_title, poster_path, release_date, genre_ids }) => {
      let movieGenre = movieId
        .filter((genre) => genre_ids.includes(genre.id))
        .map((genre) => genre.name)
        .join(", ");

      let relaseYear = release_date.substring(0, 4);
      libraryContainer.innerHTML += `<div class="movies-cart">
      <ul class="movies-list">
      <li class="movies-item">
      <div class="movies-poster">
      <img class="movies-image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}"/>
      </div>

  <div class="description">
    <h2 class="description-title">${original_title}</h2>
    <p class="description-container">
      <span class="description-info">${movieGenre} |
      ${relaseYear}</span>
    </p>
  </div>
</li>
</ul>
</div>`;
    }
  );
}
