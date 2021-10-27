const BASE_URL = "https://api.themoviedb.org/3/";
const container = document.querySelector(".movie__container");
let movieId = [];

async function fetchFilms() {
  const page = 1;
  const response = await fetch(
    `${BASE_URL}trending/movie/week?api_key=5d5fbc20666787ca7b4a0d9d71c08715`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

function setFilms() {
  fetchFilms()
    .then((movie) => {
      renderMovies(movie);
      renderMovieCart(movie);
    })
    .catch((err) => {
      console.log(err);
    });
}
setFilms();

async function fetchGenres() {
  const response = await fetch(
    `${BASE_URL}genre/movie/list?api_key=5d5fbc20666787ca7b4a0d9d71c08715`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
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
      container.innerHTML += `<div class="movies-cart">
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
// /////////////////////
const modalContent = document.querySelector(".modal-txt");
function renderMovieCart(movie) {
  
  movie.results.forEach(
    ({
      original_title,
      poster_path,
      release_date,
      genre_ids,
      vote_average,
      overview,
    }) => {
      let movieGenre = movieId
        .filter((genre) => genre_ids.includes(genre.id))
        .map((genre) => genre.name)
        .join(", ");

      let relaseYear = release_date.substring(0, 4);

      let markup = `
      <div class="modal__cart"><div class="modal__poster"><p>${overview}</p><p>${vote_average}</p>
      <img class="modal__image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}"/>
      </div>
      <h1 class="modal__movie-name>${original_title}</h1>
      <p>${overview}</p>
      </div>`;
      modalContent.insertAdjacentHTML("beforeend", markup);
    }
  );
}
// function renderMovieCart(movie) {
//   const{poster_path, genres, vote_average, vote_count, popularity, original_title, overview} = movie;
  
//   const markup =`<div class="moddal__window">
//   <div class="moddal__grid">
//   <img class="moddal__poster" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="plakat" />
//   <div>
//   <h1 class="moddal__title">${original_title}</h1>
//   <div class="moddal__data"><p class="moddal__dataTitle moddal__data--1">Vote / Votes</p><div class="moddal__data"><p class="moddal__dataTxt moddal__voteA">${vote_average}</p>/<p class="moddal__dataTxt moddal__voteC">${vote_count}</p></div></div>
//   <div class="moddal__data"><p class="moddal__dataTitle moddal__data--2">Popularity</p><p class="moddal__dataTxt">${popularity}</p></div>
//   <div class="moddal__data"><p class="moddal__dataTitle moddal__data--3">Original Title</p><p class="moddal__dataTxt">${original_title}</p></div>
//   <div class="moddal__data"><p class="moddal__dataTitle moddal__data--4">Genre</p><p class="moddal__dataTxt">genres</p></div>
//   <h2 class="moddal__about">ABOUT</h2>
//   <h3 class="moddal__aboutTxt">${overview}</h3>
//   <div class="moddal__buttons"><button class="moddal__btn">add to Watched</button><button class="moddal__btn">add to queue</button></div>
//   </div></div></div>
//   `
// modalContent.insertAdjacentHTML("beforeend", markup);
// }

////////////////
export { renderMovies, setFilms };
