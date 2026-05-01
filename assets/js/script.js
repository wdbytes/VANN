//CAROUSEL
let index = 0;
const items = document.querySelectorAll(".unique-carousel-item");
const totalItems = items.length;
let autoScrollInterval;

function autoScroll() {
  index++;
  if (index >= totalItems) {
    index = 0;
  }
  updateCarousel();
}

function nextSlide() {
  index++;
  if (index >= totalItems) {
    index = 0;
  }
  updateCarousel();
  clearInterval(autoScrollInterval); // Stop auto-scrolling
}

function prevSlide() {
  index--;
  if (index < 0) {
    index = totalItems - 1;
  }
  updateCarousel();
  clearInterval(autoScrollInterval); // Stop auto-scrolling
}

function updateCarousel() {
  const offset = -index * 100;
  document.getElementById("myUniqueCarouselInner").style.transform = `translateX(${offset}%)`;
}

// Set auto-scrolling interval
autoScrollInterval = setInterval(autoScroll, 7000); // Change slide every 3 seconds

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
