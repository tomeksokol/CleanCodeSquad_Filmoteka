import { renderMovies, setFilms } from "./renderMovies";

const galleryContainer = document.querySelector(".movie__container");
const movieCard2 = document.querySelector(".movies-cart")
const movieCards = galleryContainer.childNodes;
console.log(movieCards);
const modal = document.querySelector("#myModal");
const closeBtn = document.querySelector(".close");
const modalContent = document.querySelector(".modal-txt");

galleryContainer.addEventListener("click", selectedCart);

function selectedCart(evt) {
  if (evt.target.childNodes === "movies-cart") {
    console.log("jest");
  }
  const selectedMovie = evt.target.dataset.movie;
  console.log(selectedMovie);
  modal.style.display = "block";
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  console.log("cart clicked");
}

// galleryContainer.childNodes.forEach(gallery => {
//   gallery.addEventListener("click", () => {
//     console.log("clicked");
//   })
// }
// );
  
//   {
//   console.log("clicked");
//   // movieCard.addEventListener("click", selectMovieCart);
//   // console.log(`movie card ne ${movieCard} clicked`);
// })


//Event opening modal window
// galleryContainer.addEventListener("click", selectMovieCart);

function selectMovieCart(event) {
  event.preventDefault();

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




// moviesCard.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }

  // galleryContainer.addEventListener("click", selectMovie);

  // function selectMovie(event) {
  //   event.preventDefault();
  // // Get the modal

  // // Get the <span> element that closes the modal

  // // When the user clicks on the button, open the modal

  // }

  // console.log("movie container clicked");
  // if (event.target.nodeName === moviesCard) {
  //   console.log("movies cart clicked");
  // }
  // const instance = basicLightbox.create(
  //   document.querySelector('template')
  // )

  // instance.show();

  // modalWindow.innerHTML += `<p> to jest test okna modalnego </p>`;
  // console.log("okno modalne");
  // const selectedMovie = event.target;
  // console.log(selectedMovie);

  //   const instance = basicLightbox.create(`
  //     <div class="modal">
  //         <p>
  //             Your first lightbox with just a few lines of code.
  //             Yes, it's really that simple.
  //         </p>
  //     </div>
  // `)

  // instance.show()
// };
