import { renderMovies, setFilms } from "./renderMovies.js";
import loaderToggle from "./spinner.js";
import { addToLocalStorage } from "./addToLocalStorage.js";

const galleryContainer = document.querySelector(".movie__container");
// console.log(galleryContainer);
const modal = document.querySelector("#myModal");
const closeBtn = document.querySelector(".close");
const modalContent = document.querySelector(".modal-view");

//Event opening modal window
galleryContainer.addEventListener("click", selectMovieCart);

function selectMovieCart(event) {
  event.preventDefault();
  //function that disable modal window if you click in the gallerryContainer but not for movie cart
  if (event.target.nodeName === "DIV") {
    modal.style.display = "none";
    // console.log("You have to click movie cart");
  } else {
    // modalContent.innerHTML = "";
    // console.log(event.target.parentNode.parentNode);
    // console.log(`Movie ID: ${event.target.parentNode.parentNode.dataset.id}`);
    modal.style.display = "block";

    async function fetchMoiveId() {
      let id = `${event.target.parentNode.parentNode.dataset.id}`;
      // console.log(id);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=5d5fbc20666787ca7b4a0d9d71c08715`
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    }

    function setMovieCard() {
      loaderToggle();
      fetchMoiveId()
        .then((id) => {
          renderMovieCart(id);
          loaderToggle();
        })
        .catch((err) => console.log(err));
    }

    setMovieCard();

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      modalContent.innerHTML = "";
    });
  }
}

// function closing modal window when user click outside the modal
window.addEventListener("click", (ev) => {
  if (ev.target === modal) {
    modal.style.display = "none";
    modalContent.innerHTML = "";
  }
});

window.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape") {
    modal.style.display = "none";
    modalContent.innerHTML = "";
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

    let poster = "";
    if (poster_path) {
      poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
    } else {
      poster = "./images/poster-placeholder.png";
    }
  modalContent.innerHTML = `<div class="modal__cartContainer">
  <div class="modal__movie-content">
  <div class="modal__poster">
  <img class="modal__images" src=${poster} alt="Poster of: ${original_title}"/>
  </div>
  <div class="modal__description">
  <h2 class="modal__header">${original_title}</h2>
  <div class="modal__scoring">
  <ul class="modal__list">
  <li class="modal__list-item">Vote / Votes<span class="modal__category-value"><span class="vote-average">${vote_average}</span> / ${vote_count}</span></li>
  <li class="modal__list-item">Popularity<span class="modal__category-value">${popularity.toFixed(
    1
  )}</span></li>
  <li class="modal__list-item">Orginal Title<span class="modal__category-value">${original_title}</span></li>
  <li class="modal__list-item">Genre<span class="modal__category-value">${gen}</span></li>
  </ul>
  </div>
  <h4 class="modal__about">About</h4>
  <p class="modal__overview">${overview}</p>
  <div class="modal__buttons-container">
  <button class="modal__buttons btn-watched btn-modal-margin" type="submit" data-id="${
    id.id
  }">Add to watched</button>
  <button class="modal__buttons btn-queue" type="submit" data-id="${
    id.id
  }">Add to queue</button>
  </div>
  </div>
  </div>
  </div>`;
  const modalButtonWatched = document.querySelector(".btn-watched");
  const modalButtonQueue = document.querySelector(".btn-queue");

  modalButtonWatched.addEventListener("click", function () {
    addToLocalStorage("watchedMovieIDs", modalButtonWatched.dataset.id);
  });

  modalButtonQueue.addEventListener("click", function () {
    addToLocalStorage("queuedMovieIDs", modalButtonQueue.dataset.id);
  });

  
}

export { renderMovieCart };
