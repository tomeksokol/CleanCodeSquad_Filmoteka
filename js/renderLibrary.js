import loaderToggle from "./spinner.js";
const libraryContainer = document.querySelector(".library__container");
const watchedBtn = document.querySelector(".watched");
const queuedBtn = document.querySelector(".queue");

async function fetchMovie(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=5d5fbc20666787ca7b4a0d9d71c08715`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

function renderMovieItem(movie) {
  const { id, poster_path, genres, original_title, release_date } = movie;
  let relaseYear = movie.release_date.slice(0, 4);
  let gen = genres
    .map((genre) => genre.name)
    .slice(0, 3)
    .join(", ");

  let poster = "";
  if (poster_path) {
    poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
  } else {
    poster = "./images/poster-placeholder.png";
  }
  libraryContainer.innerHTML += `<div class="movies-cart">
      <ul class="movies-list">
      <li class="movies-item" data-id="${id}">
      <div class="movies-poster">
      <img class="movies-image" src=${poster} alt="${original_title}"/>
      <div class="middle">
      <div><img class="movies-preview" src="./images/eye.svg"/></div>
      </div>
      </div>

  <div class="description">
    <h2 class="description-title">${original_title}</h2>
    <p class="description-container">
      <span class="description-info"> ${gen} |
      ${relaseYear}</span>
    </p>
  </div>
</li>
</ul>
</div>`;
}

function renderMovieID(id) {
  loaderToggle();
  fetchMovie(id).then((movie) => {
    renderMovieItem(movie);
    loaderToggle();
  });
}

function getwatchedMovies() {
  libraryContainer.innerHTML = "";
  const savedWatchedMovies = localStorage.getItem("watchedMovieIDs");
  let watchedMovies = JSON.parse(savedWatchedMovies);
  //console.log(watchedMovies);
  watchedMovies.forEach(renderMovieID);
}

watchedBtn.addEventListener("click", getwatchedMovies);

const savedQueuedMovies = localStorage.getItem("queuedMovieIDs");
function getQueuedMovies() {
  libraryContainer.innerHTML = "";
  let queuedMovies = JSON.parse(savedQueuedMovies);
  //console.log(queuedMovies);
  queuedMovies.forEach(renderMovieID);
}

queuedBtn.addEventListener("click", getQueuedMovies);

//active buttons
watchedBtn.addEventListener("click", watchedActiv);
queuedBtn.addEventListener("click", queueActiv);

function watchedActiv() {
  watchedBtn.classList.add("activBtn");
  queuedBtn.classList.remove("activBtn");
}
function queueActiv() {
  watchedBtn.classList.remove("activBtn");
  queuedBtn.classList.add("activBtn");
}
