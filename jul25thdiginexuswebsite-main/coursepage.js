document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  // Set up category tabs functionality
  showCard("all-card");
  setActiveButton("all");

  // Set up course carousel slider
  setupCoursesCarousel();

  // Initialize mobile navigation
  setupMobileNavigation();
});

// Add event listeners to category buttons
document.getElementById("all").addEventListener("click", function () {
  showCard("all-card")
  setActiveButton("all")
})

document.getElementById("data-science").addEventListener("click", function () {
  showCard("data-science-card")
  setActiveButton("data-science")
})

document.getElementById("generative-ai").addEventListener("click", function () {
  showCard("generative-ai-card")
  setActiveButton("generative-ai")
})

document.getElementById("analytics").addEventListener("click", function () {
  showCard("analytics-card")
  setActiveButton("analytics")
})

document.getElementById("programming").addEventListener("click", function () {
  showCard("programming-card")
  setActiveButton("programming")
})

function showCard(cardId) {
  // Hide all cards
  let cards = document.getElementsByClassName("cards")
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "none"
  }

  // Show the selected card
  document.getElementById(cardId).style.display = "flex"
}

function setActiveButton(buttonId) {
  // Remove active class from all buttons
  let buttons = document.getElementsByClassName("button")
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active")
  }

  // Add active class to the clicked button
  document.getElementById(buttonId).classList.add("active")
}

// Mobile navigation
function setupMobileNavigation() {
  const hamburger = document.querySelector('.navigation__hamburger');
  const menu = document.querySelector('.navigation__menu');

  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }
}

// Popular courses carousel functionality
function setupCoursesCarousel() {
  console.log("Setting up courses carousel");
  const carousel = document.querySelector('.carousel');
  if (!carousel) {
    console.error("Carousel not found");
    return;
  }

  const cards = carousel.querySelectorAll('.carousel-card-box');
  if (!cards.length) {
    console.error("No carousel cards found");
    return;
  }

  // Find the slider track
  const carouselBox = document.querySelector('.carousel-box');
  const sliderContainer = carouselBox.querySelector('.carousel-slider-container');
  const sliderTrack = sliderContainer ? sliderContainer.querySelector('.carousel-slider-track') : null;

  if (!sliderTrack) {
    console.error("Slider track not found");
    return;
  }

  let currentIndex = 0;
  const totalCards = cards.length;

  // Get visible card count based on screen width
  function getVisibleCardCount() {
    if (window.innerWidth <= 480) return 1;  // Mobile
    if (window.innerWidth <= 768) return 2;  // Tablet
    if (window.innerWidth <= 1024) return 3; // Small laptop
    return 4; // Desktop
  }

  const visibleCards = getVisibleCardCount();
  const maxIndex = Math.max(0, totalCards - visibleCards);

  // Handle click on the slider track for navigation
  sliderTrack.addEventListener("click", (e) => {
    const rect = sliderTrack.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    // Calculate the target index based on where the user clicked
    const targetIndex = Math.min(Math.floor(position * (maxIndex + 1)), maxIndex);
    currentIndex = targetIndex;
    updateCardVisibility();
  });

  // Update which cards are visible
  function updateCardVisibility() {
    // Calculate card width (including any gap or margin)
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth +
      parseInt(cardStyle.marginLeft || 0) +
      parseInt(cardStyle.marginRight || 0);

    // Apply transform to move the carousel
    const translateX = -currentIndex * cardWidth;
    carousel.style.transform = `translateX(${translateX}px)`;

    // Update slider position
    updateSliderPosition();
  }

  // Update slider position based on current index
  function updateSliderPosition() {
    // Calculate the position percentage for the slider
    const slidePercentage = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0;

    // Update CSS variable to move the indicator
    sliderTrack.style.setProperty('--active-position', `${slidePercentage}%`);

    // Set width based on number of visible slides
    const sectionWidth = 100 / (maxIndex + 1);
    sliderTrack.style.setProperty('--active-width', `${sectionWidth}%`);
  }

  // Set initial position
  updateCardVisibility();

  // Update on window resize
  window.addEventListener('resize', function () {
    const newVisibleCards = getVisibleCardCount();
    const newMaxIndex = Math.max(0, totalCards - newVisibleCards);

    // Adjust current index if needed
    if (currentIndex > newMaxIndex) {
      currentIndex = newMaxIndex;
    }

    updateCardVisibility();
  });

  // Optional: Auto-scroll functionality
  let autoScrollInterval;

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCardVisibility();
    }, 5000); // Change slide every 5 seconds
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Start auto-scroll initially
  startAutoScroll();

  // Pause on hover
  carouselBox.addEventListener("mouseenter", stopAutoScroll);
  carouselBox.addEventListener("mouseleave", startAutoScroll);
}

// explore dropdown
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.querySelector('.explore-dropdown');

  dropdown.addEventListener('click', function () {
    const dropdownContent = this.querySelector('.dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });

  // Optional: Close the dropdown if the user clicks outside of it
  document.addEventListener('click', function (event) {
    if (!explore - dropdown.contains(event.target)) {
      explore - dropdown.querySelector('.dropdown-content').style.display === 'none';
    }
  });
});


function dataScience() {
  showCard('data-science-card');
  setActiveButton('data-science');
}

function generative() {
  showCard('generative-ai-card');
  setActiveButton('generative-ai');
}

function analytics() {
  showCard('analytics-card');
  setActiveButton('analytics');
}

function programming() {
  showCard('programming-card');
  setActiveButton('programming');
}