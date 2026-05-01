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
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const phoneInput = document.getElementById("phone");
  const yearInput = document.getElementById("year");
  const programInputs = registrationForm.querySelectorAll('input[name="program"]');
  const termsInput = document.getElementById("terms");
  const successMessage = document.getElementById("successMessage");

  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");
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
    const subjectValue = subjectInput ? subjectInput.value.trim() : "";
    const messageValue = messageInput ? messageInput.value.trim() : "";
    const phoneValue = phoneInput ? phoneInput.value.trim() : "";
    const yearValue = yearInput ? yearInput.value.trim() : "";
    const selectedProgram =
      programInputs.length > 0 ? registrationForm.querySelector('input[name="program"]:checked') : null;

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

    if (subjectInput && subjectValue === "") {
      setError(subjectInput, subjectError, "Please enter a subject.");
      isValid = false;
    } else if (subjectInput) {
      clearError(subjectInput, subjectError);
    }

    if (messageInput && messageValue === "") {
      setError(messageInput, messageError, "Please enter your message.");
      isValid = false;
    } else if (messageInput) {
      clearError(messageInput, messageError);
    }

    if (phoneInput && phoneValue === "") {
      setError(phoneInput, phoneError, "Please enter your phone number.");
      isValid = false;
    } else if (phoneInput) {
      clearError(phoneInput, phoneError);
    }

    if (yearInput && yearValue === "") {
      setError(yearInput, yearError, "Please enter your year.");
      isValid = false;
    } else if (yearInput) {
      clearError(yearInput, yearError);
    }

    if (programInputs.length > 0 && !selectedProgram) {
      if (programError) {
        programError.textContent = "Please choose either O-Level or A-Level.";
      }
      isValid = false;
    } else if (programInputs.length > 0 && programError) {
      programError.textContent = "";
    }

    if (termsInput && !termsInput.checked) {
      if (termsError) {
        termsError.textContent = "You must accept the terms and conditions.";
      }
      isValid = false;
    } else if (termsInput && termsError) {
      termsError.textContent = "";
    }

    if (!isValid) {
      return;
    }

    if (successMessage) {
      successMessage.textContent = "Registration submitted successfully!";
    }

    registrationForm.reset();
    [fullNameInput, emailInput, subjectInput, messageInput, phoneInput, yearInput].forEach((input) => {
      if (input) {
        input.classList.remove("input-error");
      }
    });

    [fullNameError, emailError, subjectError, messageError, phoneError, yearError, programError, termsError].forEach((errorElement) => {
      if (errorElement) {
        errorElement.textContent = "";
      }
    });
  });

  // Optional instant cleanup of error styles as user types.
  [fullNameInput, emailInput, subjectInput, messageInput, phoneInput, yearInput].forEach((input) => {
    if (input) {
      input.addEventListener("input", () => {
        input.classList.remove("input-error");
      });
    }
  });

  if (programInputs.length > 0) {
    programInputs.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (programError) {
          programError.textContent = "";
        }
      });
    });
  }

  if (termsInput) {
    termsInput.addEventListener("change", () => {
      if (termsError) {
        termsError.textContent = "";
      }
    });
  }
}

// Reels page features: likes, comments, localStorage, and single-video playback.
const reelCards = document.querySelectorAll(".reel-card");

if (reelCards.length > 0) {
  const reelsStorageKey = "kcbReelsData";

  function loadReelsData() {
    try {
      return JSON.parse(localStorage.getItem(reelsStorageKey)) || {};
    } catch (error) {
      return {};
    }
  }

  function saveReelsData(data) {
    localStorage.setItem(reelsStorageKey, JSON.stringify(data));
  }

  const reelsData = loadReelsData();

  function ensureReelData(reelId) {
    if (!reelsData[reelId]) {
      reelsData[reelId] = {
        likes: 0,
        liked: false,
        comments: [],
      };
    }
  }

  function renderLikes(reelId, likeButton, likeCountElement) {
    const { likes, liked } = reelsData[reelId];
    likeCountElement.textContent = `${likes} ${likes === 1 ? "like" : "likes"}`;
    likeButton.classList.toggle("liked", liked);
  }

  function renderComments(reelId, commentsListElement) {
    commentsListElement.innerHTML = "";
    reelsData[reelId].comments.forEach((comment) => {
      const commentItem = document.createElement("li");
      commentItem.textContent = comment;
      commentsListElement.appendChild(commentItem);
    });
  }

  reelCards.forEach((card) => {
    const reelId = card.dataset.reelId;
    ensureReelData(reelId);

    const likeButton = card.querySelector(".like-btn");
    const likeCountElement = card.querySelector(".like-count");
    const commentInput = card.querySelector(".comment-input");
    const commentButton = card.querySelector(".comment-btn");
    const commentsListElement = card.querySelector(".comments-list");

    renderLikes(reelId, likeButton, likeCountElement);
    renderComments(reelId, commentsListElement);

    likeButton.addEventListener("click", () => {
      reelsData[reelId].liked = !reelsData[reelId].liked;
      reelsData[reelId].likes += reelsData[reelId].liked ? 1 : -1;

      if (reelsData[reelId].likes < 0) {
        reelsData[reelId].likes = 0;
      }

      renderLikes(reelId, likeButton, likeCountElement);
      saveReelsData(reelsData);
    });

    commentButton.addEventListener("click", () => {
      const commentText = commentInput.value.trim();
      if (commentText === "") {
        return;
      }

      reelsData[reelId].comments.push(commentText);
      renderComments(reelId, commentsListElement);
      saveReelsData(reelsData);
      commentInput.value = "";
    });
  });

  // Pause other videos when one video starts playing.
  const reelVideos = document.querySelectorAll(".reel-video");
  reelVideos.forEach((video) => {
    video.addEventListener("play", () => {
      reelVideos.forEach((otherVideo) => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });
}

// About page facilities slider (shows up to three cards).
const facilitiesGrid = document.getElementById("facilitiesGrid");
const facilitiesPrev = document.getElementById("facilitiesPrev");
const facilitiesNext = document.getElementById("facilitiesNext");
const facilitiesStatus = document.getElementById("facilitiesStatus");

if (facilitiesGrid && facilitiesPrev && facilitiesNext && facilitiesStatus) {
  const facilityCards = Array.from(facilitiesGrid.querySelectorAll(".facility-card"));
  let startIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 620) {
      return 1;
    }
    if (window.innerWidth <= 980) {
      return 2;
    }
    return 3;
  }

  function renderFacilities() {
    const visibleCount = getVisibleCount();
    const maxStart = Math.max(0, facilityCards.length - visibleCount);
    startIndex = Math.min(startIndex, maxStart);

    facilityCards.forEach((card, index) => {
      const isVisible = index >= startIndex && index < startIndex + visibleCount;
      card.classList.toggle("facility-hidden", !isVisible);
    });

    facilitiesPrev.disabled = startIndex === 0;
    facilitiesNext.disabled = startIndex >= maxStart;

    const from = facilityCards.length === 0 ? 0 : startIndex + 1;
    const to = Math.min(startIndex + visibleCount, facilityCards.length);
    facilitiesStatus.textContent = `${from}-${to} of ${facilityCards.length}`;
  }

  facilitiesPrev.addEventListener("click", () => {
    const visibleCount = getVisibleCount();
    startIndex = Math.max(0, startIndex - visibleCount);
    renderFacilities();
  });

  facilitiesNext.addEventListener("click", () => {
    const visibleCount = getVisibleCount();
    const maxStart = Math.max(0, facilityCards.length - visibleCount);
    startIndex = Math.min(maxStart, startIndex + visibleCount);
    renderFacilities();
  });

  window.addEventListener("resize", renderFacilities);
  renderFacilities();
}

// About page developers slider (shows three cards on desktop).
const developersGrid = document.getElementById("developersGrid");
const developersPrev = document.getElementById("developersPrev");
const developersNext = document.getElementById("developersNext");
const developersStatus = document.getElementById("developersStatus");

if (developersGrid && developersPrev && developersNext && developersStatus) {
  const developerCards = Array.from(developersGrid.querySelectorAll(".developer-card"));
  let startIndex = 0;

  function getDeveloperVisibleCount() {
    if (window.innerWidth <= 620) {
      return 1;
    }
    if (window.innerWidth <= 900) {
      return 2;
    }
    return 3;
  }

  function renderDevelopers() {
    const visibleCount = getDeveloperVisibleCount();
    const maxStart = Math.max(0, developerCards.length - visibleCount);
    startIndex = Math.min(startIndex, maxStart);

    developerCards.forEach((card, index) => {
      const isVisible = index >= startIndex && index < startIndex + visibleCount;
      card.classList.toggle("developer-hidden", !isVisible);
    });

    developersPrev.disabled = startIndex === 0;
    developersNext.disabled = startIndex >= maxStart;

    const from = developerCards.length === 0 ? 0 : startIndex + 1;
    const to = Math.min(startIndex + visibleCount, developerCards.length);
    developersStatus.textContent = `${from}-${to} of ${developerCards.length}`;
  }

  developersPrev.addEventListener("click", () => {
    const visibleCount = getDeveloperVisibleCount();
    startIndex = Math.max(0, startIndex - visibleCount);
    renderDevelopers();
  });

  developersNext.addEventListener("click", () => {
    const visibleCount = getDeveloperVisibleCount();
    const maxStart = Math.max(0, developerCards.length - visibleCount);
    startIndex = Math.min(maxStart, startIndex + visibleCount);
    renderDevelopers();
  });

  window.addEventListener("resize", renderDevelopers);
  renderDevelopers();
}
