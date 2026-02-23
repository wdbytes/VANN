let index = 0;
const items = document.querySelectorAll(".unique-carousel-item");
const totalItems = items.length;

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
}

function prevSlide() {
  index--;
  if (index < 0) {
    index = totalItems - 1;
  }
  updateCarousel();
}

function updateCarousel() {
  const offset = -index * 100;
  document.getElementById("myUniqueCarouselInner").style.transform =
    `translateX(${offset}%)`;
}

setInterval(autoScroll, 3000); // Change slide every 3 seconds

// Nav Jump
$(".links a").click(function (event) {
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
