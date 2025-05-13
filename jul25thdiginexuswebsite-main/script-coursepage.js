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
});

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
