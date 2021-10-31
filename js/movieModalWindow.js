import { renderMovies, setFilms } from "./renderMovies.js";

const galleryContainer = document.querySelector(".movie__container");
const modal = document.querySelector("#myModal");
const closeBtn = document.querySelector(".close");
const modalContent = document.querySelector(".modal-view");

//Event opening modal window
galleryContainer.addEventListener("click", selectMovieCart);

function selectMovieCart(event) {
  event.preventDefault();
  modalContent.innerHTML = "";
  console.log(event.target.parentNode.parentNode);
  console.log(`Movie ID: ${event.target.parentNode.parentNode.dataset.id}`);
  modal.style.display = "block";

  function fetchMoiveId() {
    let id = `${event.target.parentNode.parentNode.dataset.id}`;
    console.log(id);
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5d5fbc20666787ca7b4a0d9d71c08715`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  function setMovieCard() {
    fetchMoiveId()
      .then((id) => {
        renderMovieCart(id);
      })
      .catch((err) => console.log(err));
  }

  setMovieCard();

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// function closing modal window when user click outside the modal
window.addEventListener("click", (ev) => {
  if (ev.target === modal) {
    modal.style.display = "none";
  }
});

function renderMovieCart(id) {
  const {
    poster_path,
    genres,
    vote_average,
    vote_count,
    popularity,
    original_title,
    overview,
  } = id;
  let gen = genres
    .map((genre) => genre.name)
    .slice(0, 3)
    .join(", ");
  modalContent.innerHTML = `<div class="modal__cartContainer">
  <div class="modal__movie-content">
  <div class="modal__poster">
  <img class="modal__images" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Poster of: ${original_title}"/>
  </div>
  <div class="modal__description">
  <h2 class="modal__header">${original_title}</h2>
  <div class="modal__scoring">
  <div class="modal__category">
  <ul class="modal__list">
  <li class="modal__list-item">Vote / Votes</li>
  <li class="modal__list-item">Popularity</li>
  <li class="modal__list-item">Orginal Title</li>
  <li class="modal__list-item">Genre</li>
  </ul>
  </div>
  <div class="modal__text">
  <ul class="modal__list-text">
  <li class="modal__list-text-item"><span class="vote-average">${vote_average}</span> / ${vote_count}</li>
  <li class="modal__list-text-item">${popularity.toFixed(1)}</li>
  <li class="modal__list-text-item title__accent">${original_title}</li>
  <li class="modal__list-text-item">${gen}</li>
  </ul>
  </div>
  </div>
  <h4 class="modal__about">About</h4>
  <p class="modal__overview">${overview}</p>
  </div>
  </div>
  <div class="modal__buttons-container">
  <button class="modal__buttons btn-watched btn-modal-margin" type="submit" data-id="${id.id}">Add to watched</button>
  <button class="modal__buttons btn-queue" type="submit" data-id="${id.id}">Add to queue</button>
  </div>
  </div>`;
  const modalButtonWatched = document.querySelector(".btn-watched");
  const modalButtonQueue = document.querySelector(".btn-queue");
  console.log("This is button watched ID: " + modalButtonWatched.dataset.id);
  console.log("This is button queue ID: " + modalButtonQueue.dataset.id);
}


export { renderMovieCart };
