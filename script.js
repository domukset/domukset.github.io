document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const closeButton = document.getElementById("lightbox-close");
  const previousButton = document.getElementById("lightbox-previous");
  const nextButton = document.getElementById("lightbox-next");
  const photoLinks = Array.from(document.querySelectorAll(".photo-link"));

  if (
    !lightbox ||
    !lightboxImage ||
    !lightboxCaption ||
    !lightboxCounter ||
    !closeButton ||
    !previousButton ||
    !nextButton ||
    photoLinks.length === 0
  ) {
    return;
  }

  let activeGroup = [];
  let activeIndex = 0;
  let previouslyFocusedElement = null;

  function getCaption(link) {
    const figure = link.closest("figure");
    const caption = figure?.querySelector("figcaption");
    return caption?.textContent.trim() || "";
  }

  function getAccessibleDescription(link) {
    const image = link.querySelector("img");
    const caption = getCaption(link);

    if (image?.alt.trim()) {
      return image.alt.trim();
    }

    if (caption && caption !== "...") {
      return caption;
    }

    return "";
  }

  function getGroup(link) {
    const post = link.closest(".post");
    const linksInPost = post
      ? Array.from(post.querySelectorAll(".photo-link"))
      : [];

    return linksInPost.length > 0 ? linksInPost : photoLinks;
  }

  function updateLightbox() {
    const link = activeGroup[activeIndex];
    const image = link?.querySelector("img");

    if (!link || !image) {
      return;
    }

    lightboxImage.src = link.href;
    lightboxImage.alt = getAccessibleDescription(link);
    lightboxCaption.textContent = getCaption(link);
    lightboxCounter.textContent =
      activeGroup.length > 1
        ? `${activeIndex + 1} / ${activeGroup.length}`
        : "";

    const hasMultipleImages = activeGroup.length > 1;
    previousButton.hidden = !hasMultipleImages;
    nextButton.hidden = !hasMultipleImages;
  }

  function openLightbox(link) {
    activeGroup = getGroup(link);
    activeIndex = activeGroup.indexOf(link);
    previouslyFocusedElement = document.activeElement;

    updateLightbox();
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    lightboxCounter.textContent = "";
    document.body.classList.remove("lightbox-open");

    if (previouslyFocusedElement instanceof HTMLElement) {
      previouslyFocusedElement.focus();
    }
  }

  function showPreviousImage() {
    activeIndex =
      (activeIndex - 1 + activeGroup.length) % activeGroup.length;
    updateLightbox();
  }

  function showNextImage() {
    activeIndex = (activeIndex + 1) % activeGroup.length;
    updateLightbox();
  }

  function getFocusableControls() {
    return [closeButton, previousButton, nextButton].filter(
      (element) => !element.hidden
    );
  }

  photoLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(link);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", showPreviousImage);
  nextButton.addEventListener("click", showNextImage);

  lightboxImage.addEventListener("click", () => {
    if (activeGroup.length > 1) {
      showNextImage();
    }
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft" && activeGroup.length > 1) {
      event.preventDefault();
      showPreviousImage();
      return;
    }

    if (event.key === "ArrowRight" && activeGroup.length > 1) {
      event.preventDefault();
      showNextImage();
      return;
    }

    if (event.key === "Tab") {
      const controls = getFocusableControls();
      const firstControl = controls[0];
      const lastControl = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault();
        lastControl.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastControl
      ) {
        event.preventDefault();
        firstControl.focus();
      }
    }
  });
});
