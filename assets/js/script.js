//CAROUSEL
const carousels = document.querySelectorAll(".unique-carousel");

carousels.forEach((carousel, carouselIndex) => {
  const inner = carousel.querySelector(".unique-carousel-inner");
  const items = carousel.querySelectorAll(".unique-carousel-item");
  if (!inner || items.length === 0) return;

  let index = 0;
  let autoScrollInterval;

  const updateCarousel = () => {
    inner.style.transform = `translateX(${-index * 100}%)`;
  };

  const setBackgrounds = () => {
    carousel.querySelectorAll(".carousel-image-panel").forEach((panel) => {
      const img = panel.querySelector("img");
      if (!img || !img.src) return;
      panel.style.setProperty("--carousel-bg", `url('${img.src}')`);
    });
  };

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      index = (index + 1) % items.length;
      updateCarousel();
    }, 7000);
  };

  const resetAutoScroll = () => {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  };

  carousel.querySelector(".unique-arrow-left")?.addEventListener("click", () => {
    index = index > 0 ? index - 1 : items.length - 1;
    updateCarousel();
    resetAutoScroll();
  });

  carousel.querySelector(".unique-arrow-right")?.addEventListener("click", () => {
    index = (index + 1) % items.length;
    updateCarousel();
    resetAutoScroll();
  });

  setBackgrounds();
  updateCarousel();

  // Offset the start time for each carousel
  const offset = carouselIndex * 3500; // 3.5 second offset per carousel
  setTimeout(() => {
    startAutoScroll();
  }, offset);
});

// Nav Jump
$("a[href^='#']").click(function (event) {
  event.preventDefault(); // Prevent default anchor click behavior

  let headerHeight = document.getElementById("header").offsetHeight; // Adjust header ID to lowercase

  let divId = $(this).attr("href"); // Get the href attribute

  $("html, body").animate(
    {
      scrollTop: $(divId).offset().top - headerHeight, // Scroll to the target section
    },
    500,
  ); // Optional duration for scrolling animation
});

//Fade-In
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in");

  const options = {
    root: null, // Use the viewport
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const headerEl = document.getElementById("header");

  function updateHeaderOnScroll() {
    if (!headerEl) return;

    if (window.scrollY > 0) {
      headerEl.classList.add("scrolled");
    } else {
      headerEl.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once the element is visible
      }
    });
  }, options);

  elements.forEach((element) => {
    observer.observe(element);
  });
});
