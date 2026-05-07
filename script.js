const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const yearTarget = document.querySelector("[data-year]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const section = carousel.closest(".hair-gallery");
  const track = carousel.querySelector("[data-carousel-track]");
  const prevButton = section?.querySelector("[data-carousel-prev]");
  const nextButton = section?.querySelector("[data-carousel-next]");

  if (!track || !prevButton || !nextButton) {
    return;
  }

  const scrollSlide = (direction) => {
    const slide = track.querySelector(".gallery-slide");
    if (!slide) {
      return;
    }

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const amount = slide.getBoundingClientRect().width + gap;
    track.scrollBy({
      left: amount * direction,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  };

  prevButton.addEventListener("click", () => scrollSlide(-1));
  nextButton.addEventListener("click", () => scrollSlide(1));
});
