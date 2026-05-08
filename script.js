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

const trackAnalyticsEvent = (eventName, eventCategory, eventLabel) => {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    event_category: eventCategory,
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

  const clickable = event.target.closest("a[href], button");

  if (!clickable) {
    return;
  }

  const href = clickable.getAttribute("href") || "";
  const normalizedHref = href.toLowerCase();
  const text = clickable.textContent.trim();
  const normalizedText = text.toLowerCase();
  const eventLabel = href || text;
  const isReviewsSectionLink = normalizedHref === "#reviews" ||
    normalizedHref.endsWith("#reviews");
  const isReviewClick = !isReviewsSectionLink && (
    normalizedHref.includes("/review") ||
    normalizedHref.includes("g.page/r") ||
    normalizedText.includes("leave a review") ||
    normalizedText.includes("google review") ||
    normalizedText.includes("review")
  );
  const isFacebookClick = normalizedHref.includes("facebook.com") ||
    normalizedHref.includes("fb.com") ||
    normalizedHref.includes("m.facebook.com");
  const isDirectionsClick = !isReviewClick && (
    normalizedHref.includes("google.com/maps") ||
    normalizedHref.includes("maps.google.com") ||
    normalizedHref.includes("maps.app.goo.gl") ||
    normalizedHref.includes("goo.gl/maps") ||
    (
      normalizedHref.includes("g.page") &&
      (
        normalizedText.includes("directions") ||
        normalizedText.includes("map") ||
        normalizedText.includes("location") ||
        normalizedText.includes("find us")
      )
    ) ||
    normalizedText.includes("directions") ||
    normalizedText.includes("map") ||
    normalizedText.includes("location") ||
    normalizedText.includes("find us") ||
    normalizedText.includes("lethbridge, alberta")
  );

  if (normalizedHref.startsWith("tel:")) {
    trackLeadEvent("phone_click", "Phone click");
  }

  if (normalizedHref.startsWith("mailto:")) {
    trackLeadEvent("email_click", "Email click");
  }

  if (isFacebookClick) {
    trackAnalyticsEvent("facebook_click", "social", eventLabel);
  }

  if (isReviewClick && !isFacebookClick) {
    trackAnalyticsEvent("review_click", "engagement", eventLabel);
  }

  if (isDirectionsClick && !isFacebookClick) {
    trackAnalyticsEvent("directions_click", "lead", eventLabel);
  }

  if (
    clickable.matches(".button, .nav-cta, .header-call") &&
    (
      normalizedHref.startsWith("tel:") ||
      normalizedHref.startsWith("mailto:") ||
      normalizedHref.includes("#contact") ||
      normalizedText.includes("book") ||
      normalizedText.includes("appointment") ||
      normalizedText.includes("contact") ||
      normalizedText.includes("call") ||
      normalizedText.includes("email")
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
