// Mobile navigation toggle for pages using this script.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal sections when they appear in the viewport.
const revealElements = document.querySelectorAll(".reveal-on-scroll");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

// Gallery filtering and image lightbox features.
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryCards = document.querySelectorAll(".gallery-card");
const galleryVideos = document.querySelectorAll(".gallery-video");

function pauseAllGalleryVideos() {
  galleryVideos.forEach((video) => {
    video.pause();
  });
}

if (filterButtons.length > 0 && galleryCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      galleryCards.forEach((card) => {
        const cardCategories = card.dataset.category || "";
        const matches = filter === "all" || cardCategories.includes(filter);
        card.classList.toggle("hidden", !matches);
      });

      // Bonus: pause all videos when switching category.
      pauseAllGalleryVideos();
    });
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const clickableImages = document.querySelectorAll(".gallery-image");

if (lightbox && lightboxImage && lightboxClose && clickableImages.length > 0) {
  clickableImages.forEach((image) => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

// Contact form validation for registration page.
const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const yearInput = document.getElementById("year");
  const programInputs = registrationForm.querySelectorAll('input[name="program"]');
  const termsInput = document.getElementById("terms");
  const successMessage = document.getElementById("successMessage");

  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const yearError = document.getElementById("yearError");
  const programError = document.getElementById("programError");
  const termsError = document.getElementById("termsError");

  function setError(element, errorElement, message) {
    if (element) {
      element.classList.add("input-error");
    }
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearError(element, errorElement) {
    if (element) {
      element.classList.remove("input-error");
    }
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  function validateEmail(emailValue) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  }

  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    if (successMessage) {
      successMessage.textContent = "";
    }

    const fullNameValue = fullNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const yearValue = yearInput.value.trim();
    const selectedProgram = registrationForm.querySelector('input[name="program"]:checked');

    if (fullNameValue === "") {
      setError(fullNameInput, fullNameError, "Please enter your full name.");
      isValid = false;
    } else {
      clearError(fullNameInput, fullNameError);
    }

    if (emailValue === "") {
      setError(emailInput, emailError, "Please enter your email address.");
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      setError(emailInput, emailError, "Please enter a valid email format.");
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    if (phoneValue === "") {
      setError(phoneInput, phoneError, "Please enter your phone number.");
      isValid = false;
    } else {
      clearError(phoneInput, phoneError);
    }

    if (yearValue === "") {
      setError(yearInput, yearError, "Please enter your year.");
      isValid = false;
    } else {
      clearError(yearInput, yearError);
    }

    if (!selectedProgram) {
      if (programError) {
        programError.textContent = "Please choose either O-Level or A-Level.";
      }
      isValid = false;
    } else if (programError) {
      programError.textContent = "";
    }

    if (!termsInput.checked) {
      if (termsError) {
        termsError.textContent = "You must accept the terms and conditions.";
      }
      isValid = false;
    } else if (termsError) {
      termsError.textContent = "";
    }

    if (!isValid) {
      return;
    }

    if (successMessage) {
      successMessage.textContent = "Registration submitted successfully!";
    }

    registrationForm.reset();
    [fullNameInput, emailInput, phoneInput, yearInput].forEach((input) => {
      input.classList.remove("input-error");
    });

    [fullNameError, emailError, phoneError, yearError, programError, termsError].forEach((errorElement) => {
      if (errorElement) {
        errorElement.textContent = "";
      }
    });
  });

  // Optional instant cleanup of error styles as user types.
  [fullNameInput, emailInput, phoneInput, yearInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("input-error");
    });
  });

  programInputs.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (programError) {
        programError.textContent = "";
      }
    });
  });

  termsInput.addEventListener("change", () => {
    if (termsError) {
      termsError.textContent = "";
    }
  });
}
