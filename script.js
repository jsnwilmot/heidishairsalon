const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const yearTarget = document.querySelector("[data-year]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const trackLeadEvent = (eventName, eventLabel) => {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    event_category: "lead",
    event_label: eventLabel
  });
};

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

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest("a[href]");

  if (!link) {
    return;
  }

  const href = link.getAttribute("href") || "";
  const normalizedHref = href.toLowerCase();
  const linkText = link.textContent.trim().toLowerCase();

  if (normalizedHref.startsWith("tel:")) {
    trackLeadEvent("phone_click", "Phone click");
  }

  if (normalizedHref.startsWith("mailto:")) {
    trackLeadEvent("email_click", "Email click");
  }

  if (
    normalizedHref.includes("google.com/maps") ||
    normalizedHref.includes("maps.google.") ||
    normalizedHref.includes("maps.app.goo.gl") ||
    normalizedHref.includes("goo.gl/maps") ||
    linkText.includes("directions")
  ) {
    trackLeadEvent("directions_click", "Directions click");
  }

  if (
    link.matches(".button, .nav-cta, .header-call") &&
    (
      normalizedHref.startsWith("tel:") ||
      normalizedHref.startsWith("mailto:") ||
      normalizedHref.includes("#contact") ||
      linkText.includes("book") ||
      linkText.includes("appointment") ||
      linkText.includes("contact") ||
      linkText.includes("call") ||
      linkText.includes("email")
    )
  ) {
    trackLeadEvent("booking_click", "Booking click");
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target;

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const isContactForm = Boolean(form.closest("#contact")) ||
    form.matches("[data-contact-form], .contact-form") ||
    (form.getAttribute("name") || "").toLowerCase().includes("contact") ||
    (form.getAttribute("id") || "").toLowerCase().includes("contact");

  if (!isContactForm || event.defaultPrevented || !form.checkValidity()) {
    return;
  }

  trackLeadEvent("contact_form_submit", "Contact form submit");
});
