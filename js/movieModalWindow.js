import { renderMovies, setFilms } from "./renderMovies.js";

const galleryContainer = document.querySelector(".movie__container");

const modal = document.querySelector("#myModal");
const closeBtn = document.querySelector(".close");
const modalContent = document.querySelector(".modal-view");


//Event opening modal window
galleryContainer.addEventListener("click", selectMovieCart);

function selectMovieCart(event) {
  event.preventDefault();
  console.log(event.target.parentNode.parentNode);
  console.log(`Movie ID: ${event.target.parentNode.parentNode.dataset.id}`)
  modal.style.display = "block";
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