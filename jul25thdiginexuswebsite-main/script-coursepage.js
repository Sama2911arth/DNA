// Course Content Accordion
const intros = document.getElementsByClassName("course-content-intro")
const details = document.getElementsByClassName("course-content-details")

let i

for (i = 0; i < intros.length; i++) {
  intros[i].addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("show")
  })
}

// Course Instructor Slider

const slidesContainer = document.getElementById("instructors")
const slide = document.querySelector(".instructor-slide")
const prevButton = document.getElementById("slide-arrow-prev")
const nextButton = document.getElementById("slide-arrow-next")

if (slidesContainer && slide && prevButton && nextButton) {
  nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth
    slidesContainer.scrollLeft += slideWidth
  })

  prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth
    slidesContainer.scrollLeft -= slideWidth
  })
}

const courses = [
  {
    id: 1,
    title: "Data Science Essentials",
    instructor: "Prof. Johnson",
    rating: 4.8,
    lessons: 50,
    duration: "36h 30m",
    price: 19999,
    image: "images/dataScience.svg",
    category: "data-science",
  },
  {
    id: 2,
    title: "Big Data Insights",
    instructor: "Sarah Smith",
    rating: 4.7,
    lessons: 40,
    duration: "28h 15m",
    price: 19999,
    image: "images/Big-data.svg",
    category: "analytics",
  },
  {
    id: 3,
    title: "Data Visualization Technique",
    instructor: "John Doe",
    rating: 4.9,
    lessons: 45,
    duration: "32h 45m",
    price: 19999,
    image: "images/Data-visi.svg",
    category: "data-science",
  },
  // Add more course objects here
]

// function createCourseCard(course) {
//     return `
//         <div class="course-card">
//             <img src="${course.image}" alt="${course.title}" class="course-card__image">
//             <div class="course-card__content">
//                 <h3 class="course-card__title">${course.title}</h3>
//                 <p class="course-card__instructor">by ${course.instructor}</p>
//                 <div class="course-card__rating">★★★★★ ${course.rating}</div>
//                 <div class="course-card__meta">
//                     <span>${course.lessons} lessons</span>
//                     <span>${course.duration}</span>
//                 </div>
//                 <div class="course-card__price">₹ ${course.price}</div>
//             </div>
//         </div>
//     `;
// }

// function renderCourses(category = 'all') {
//     const courseGrid = document.getElementById('courseGrid');
//     courseGrid.innerHTML = '';

//     const filteredCourses = category === 'all' ? courses : courses.filter(course => course.category === category);

//     filteredCourses.forEach(course => {
//         courseGrid.innerHTML += createCourseCard(course);
//     });
// }
function createCourseCard(course) {
  return `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}" class="course-card__image">
            <div class="course-card__content">
                <div>
                    <h3 class="course-card__title">${course.title}</h3>
                    <p class="course-card__instructor">by ${course.instructor}</p>
                    <div class="course-card__rating">★★★★★ ${course.rating}</div>
                </div>
                <div>
                    <div class="course-card__meta">
                        <span><i class="fas fa-book"></i> ${course.lessons} lessons</span>
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                    </div>
                    <div class="course-card__price">₹ ${course.price}</div>
                </div>
            </div>
        </div>
    `
}

function renderCourses(category = "all") {
  const courseGrid = document.getElementById("courseGrid")
  if (!courseGrid) return;

  courseGrid.innerHTML = ""

  const filteredCourses =
    category === "all"
      ? courses
      : courses.filter((course) => course.category === category)

  if (filteredCourses.length === 0) {
    courseGrid.innerHTML =
      '<div class="course-explorer__empty-message">Coming soon...</div>'
  } else {
    filteredCourses.forEach((course) => {
      courseGrid.innerHTML += createCourseCard(course)
    })
  }
}

function initializeCourseExplorer() {
  renderCourses()

  const categoryButtons = document.querySelectorAll(
    ".course-explorer__category-btn"
  )
  if (categoryButtons.length > 0) {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        categoryButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
        renderCourses(button.dataset.category)
      })
    })
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setupMobileNavigation();
  initializeCourseExplorer();
  setupCoursesCarousel();

  // Set up category tabs functionality
  if (document.getElementById("all")) {
    showCard("all-card");
    setActiveButton("all");

    // Add event listeners to category buttons
    document.getElementById("all").addEventListener("click", function () {
      showCard("all-card");
      setActiveButton("all");
    });

    document.getElementById("data-science").addEventListener("click", function () {
      showCard("data-science-card");
      setActiveButton("data-science");
    });

    document.getElementById("generative-ai").addEventListener("click", function () {
      showCard("generative-ai-card");
      setActiveButton("generative-ai");
    });

    document.getElementById("analytics").addEventListener("click", function () {
      showCard("analytics-card");
      setActiveButton("analytics");
    });

    document.getElementById("programming").addEventListener("click", function () {
      showCard("programming-card");
      setActiveButton("programming");
    });
  }
});

function showCard(cardId) {
  // Hide all cards
  let cards = document.getElementsByClassName("cards");
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  // Show the selected card
  document.getElementById(cardId).style.display = "flex";
}

function setActiveButton(buttonId) {
  // Remove active class from all buttons
  let buttons = document.getElementsByClassName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  // Add active class to the clicked button
  document.getElementById(buttonId).classList.add("active");
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

function setupMobileNavigation() {
  const hamburger = document.querySelector('.navigation__hamburger');
  const menu = document.querySelector('.navigation__nav-container');
  const body = document.body;

  if (hamburger && menu) {
    // Remove existing listeners to avoid duplicates
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);

    newHamburger.addEventListener('click', () => {
      newHamburger.classList.toggle('active');
      menu.classList.toggle('active');
      body.classList.toggle('menu-open');

      // Set aria-expanded attribute for accessibility
      const isExpanded = menu.classList.contains('active');
      newHamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.navigation') && menu.classList.contains('active')) {
        newHamburger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('menu-open');
        newHamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.navigation__nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        newHamburger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('menu-open');
        newHamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Update on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        newHamburger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('menu-open');
        newHamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Fix for explore dropdown functionality
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.querySelector('.explore-dropdown');

  if (dropdown) {
    dropdown.addEventListener('click', function () {
      const dropdownContent = this.querySelector('.dropdown-content');
      if (dropdownContent) {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      }
    });

    // Close the dropdown if the user clicks outside of it
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

// Helper functions for category buttons
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
