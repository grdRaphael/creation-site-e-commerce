const buttons = document.querySelectorAll(".tabs__btn");
const pill = document.querySelector(".tabs__pill");
const track = document.querySelector(".tabs__track");

function movePill(btn) {
  const trackRect = track.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  const left = btnRect.left - trackRect.left;
  const width = btnRect.width;

  pill.style.width = width + "px";
  pill.style.transform = `translateX(${left}px)`;
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".is-active")?.classList.remove("is-active");
    btn.classList.add("is-active");
    movePill(btn);
  });
});

// Initialisation au chargement
window.addEventListener("load", () => {
  const active = document.querySelector(".is-active");
  if (active) movePill(active);
});