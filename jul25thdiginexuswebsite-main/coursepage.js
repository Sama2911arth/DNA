document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  showCard("all-card")
  setActiveButton("all")

  // Set up course carousel slider
  console.log("Setting up courses carousel");
  setupCoursesCarousel()

  // Initialize mobile navigation
  setupMobileNavigation()

  // Add debug logging for carousel buttons
  const leftBtn = document.getElementById('carouselPrevBtn');
  const rightBtn = document.getElementById('carouselNextBtn');
  console.log("Left button found:", !!leftBtn);
  console.log("Right button found:", !!rightBtn);

  if (leftBtn) {
    leftBtn.addEventListener('click', () => console.log("Left button direct click"));
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => console.log("Right button direct click"));
  }

  // Center testimonials if container width is greater than cards' combined width
  const container = document.getElementById('testimonialContainer');
  if (container) {
    console.log("Centering testimonials");
    const containerWidth = container.parentElement.offsetWidth;
    const cards = container.querySelectorAll('.testimonial-card');

    let totalWidth = 0;
    cards.forEach(card => {
      const style = window.getComputedStyle(card);
      const width = card.offsetWidth +
        parseInt(style.marginLeft || 0) +
        parseInt(style.marginRight || 0);
      totalWidth += width;
    });

    if (containerWidth > totalWidth) {
      container.style.justifyContent = 'center';
    }
  }
})

function setupMobileNavigation() {
  const hamburger = document.querySelector('.navigation__hamburger');
  const navMenu = document.querySelector('.navigation__menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
}

function showCard(cardId) {
  const cards = document.getElementsByClassName("cards")

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "none"
  }

  const cardToShow = document.getElementById(cardId)
  if (cardToShow) {
    cardToShow.style.display = "flex"
  }
}

function setActiveButton(buttonId) {
  const buttons = document.getElementsByClassName("button")

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active")
  }

  const buttonToActivate = document.getElementById(buttonId)
  if (buttonToActivate) {
    buttonToActivate.classList.add("active")
  }
}

// Add event listeners to buttons
const dataScience = document.getElementById("data-science")
if (dataScience) {
  dataScience.addEventListener("click", function () {
    showCard("data-science-card")
    setActiveButton("data-science")
  })
}

const generativeAi = document.getElementById("generative-ai")
if (generativeAi) {
  generativeAi.addEventListener("click", function () {
    showCard("generative-ai-card")
    setActiveButton("generative-ai")
  })
}

const analytics = document.getElementById("analytics")
if (analytics) {
  analytics.addEventListener("click", function () {
    showCard("analytics-card")
    setActiveButton("analytics")
  })
}

const programming = document.getElementById("programming")
if (programming) {
  programming.addEventListener("click", function () {
    showCard("programming-card")
    setActiveButton("programming")
  })
}

const all = document.getElementById("all")
if (all) {
  all.addEventListener("click", function () {
    showCard("all-card")
    setActiveButton("all")
  })
}

// Popular courses carousel functionality
function setupCoursesCarousel() {
  const carousel = document.querySelector('.carousel')
  if (!carousel) {
    console.log("Carousel not found");
    return;
  }

  const cards = carousel.querySelectorAll('.carousel-card-box')
  if (!cards.length) {
    console.log("No carousel cards found");
    return;
  }

  // Get arrow controls using their IDs
  const leftArrow = document.getElementById('carouselPrevBtn');
  const rightArrow = document.getElementById('carouselNextBtn');

  if (!leftArrow) console.log("Left arrow not found");
  if (!rightArrow) console.log("Right arrow not found");

  let currentIndex = 0;
  const totalCards = cards.length;
  const visibleCards = getVisibleCardCount();
  const maxIndex = Math.max(0, totalCards - visibleCards);

  // Set initial state
  updateCarousel();

  // Handle arrow clicks
  if (leftArrow) {
    leftArrow.addEventListener('click', function (e) {
      e.preventDefault();
      console.log("Left arrow clicked");
      currentIndex = Math.max(0, currentIndex - 1);
      updateCarousel();
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', function (e) {
      e.preventDefault();
      console.log("Right arrow clicked");
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateCarousel();
    });
  }

  // Determine how many cards are visible based on viewport width
  function getVisibleCardCount() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 480) return 1;
    if (viewportWidth <= 768) return 2;
    if (viewportWidth <= 1024) return 3;
    return 4;
  }

  // Update carousel on window resize
  window.addEventListener('resize', () => {
    const newVisibleCards = getVisibleCardCount();
    const newMaxIndex = Math.max(0, totalCards - newVisibleCards);
    currentIndex = Math.min(currentIndex, newMaxIndex);
    updateCarousel();
  });

  // Update carousel position and arrow visibility
  function updateCarousel() {
    // Calculate card width (including margins)
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth +
      parseInt(cardStyle.marginLeft || 0) +
      parseInt(cardStyle.marginRight || 0);

    // Update the transform to move to the current position
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Update arrow visibility based on position
    if (leftArrow) {
      leftArrow.style.opacity = currentIndex === 0 ? '0.5' : '1';
      leftArrow.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    }

    if (rightArrow) {
      rightArrow.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
      rightArrow.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }
  }
}

// Fixed dropdown code
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.querySelector('.explore-dropdown');
  if (dropdown) {
    dropdown.addEventListener('click', function () {
      const dropdownContent = this.querySelector('.dropdown-content');
      if (dropdownContent) {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      }
    });

    // Optional: Close the dropdown if the user clicks outside of it
    document.addEventListener('click', function (event) {
      if (dropdown && !dropdown.contains(event.target)) {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (dropdownContent) {
          dropdownContent.style.display = 'none';
        }
      }
    });
  }
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