const header = document.querySelector(".header .container")
header.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./src/images/img/header-mobile.png')";

function myFunction(mob) {
  if (mob.matches) { // If media query matches
    header.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./src/images/img/header-tab.png')";
  } else {
    header.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./src/images/img/header-desk.png')";
  }
}

var mob = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
myFunction(mob) // Call listener function at run time
mob.addListener(myFunction) // Attach listener function on state changes