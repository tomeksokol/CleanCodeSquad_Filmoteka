const arrFooterDev = [
  {
    name: "Tomasz Sokół",
    position: "Team leader, Scrum master",
    preview: "./images/......jpg",
  },
  {
    name: "Grzegorz Hamala",
    position: "Full-Stack developer",
    preview: "./images/......jpg",
  },
  {
    name: "Patrycja Nowakowska",
    position: "Full-Stack developer",
    preview: "./images/......jpg",
  },
  {
    name: "Sebastian Hanusiak",
    position: "Full-Stack developer",
    preview: "./images/......jpg",
  },
];

const itemFooterDev = document.querySelector(".footer-modal__list");
arrFooterDev.map(({ name, position, preview }) => {
  itemFooterDev.insertAdjacentHTML(
    "afterbegin",
    `<li class="footer-modal__item">
     <img class="footer-modal__images" src="${preview}" alt="${name}">
     <div class="footer-modal__desc">
     <h3>${name}</h3>
     <p>${position}</p>
     </div>
     </li>
  `
  );
});

(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    body: document.querySelector("body"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  // zamknięcie przez escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      refs.modal.classList.add("is-hidden");
      refs.body.classList.remove("footer-modal-open");
    }
  });

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
    refs.body.classList.toggle("footer-modal-open");
  }
})();

const body = document.querySelector("body");
const modal = document.querySelector("[data-modal]");
modal.addEventListener("click", clickOut);

function clickOut(e) {
  if (e.target.localName !== "img") {
    modal.classList.add("is-hidden");
    body.classList.remove("footer-modal-open");
  }
}
