const testimonials = [
  {
    name: "Anand Joshi",
    title: "Team lead in MNC",
    image: "./images/Anand Joshi.jpg",
    rating: 5,
    text: "As an IT professional with 12 years of experience, I decided to pursue a career shift. The Data Science course at Digital Nexus AI has been transformative. The comprehensive curriculum, hands-on projects, and expert guidance seamlessly introduced me to the world of data science. Taught by top industry experts in a clear and accessible manner, this course is truly a game-changer.",
  },
  {
    name: "Nikhil Karnam",
    title: "Engineering Student",
    image: "./images/Nikil Karnam.jpg",
    rating: 5,
    text: "I'm an engineering student. The Data Science course at Digital Nexus AI transformed my learning experience. I went from being a novice to being able to write AI and ML programs confidently. The curriculum, hands-on projects, and supportive instructors made all the difference. I highly recommend this course to any student looking to excel in AI and machine learning.",
  },
  {
    name: "Nachiket Kulkarni",
    title: "Developer",
    image:
      "./images/dontKnowTheName.jpg",
    rating: 5,
    text: "Digital Nexus AI is an excellent place to gain technology skills. My trainer was outstanding, and I learned extensively about Python, Data Science, Machine Learning, Neural Networks, and more. The best part of the experience was the hands-on projects and the internship. They provided great support in career guidance, offering valuable advice on acing interviews at multinational companies. I secured a fantastic job in a pharma-based MNC in data science and data engineering.",
  },
  {
    name: "Shridhar Purandare",
    title: "Developer",
    image:
      "./images/Shridhar Purandare1.jpg",
    rating: 5,
    text: "Praveen Kumar sir guided me in Python, ML, and AI with hands-on coding and practical examples which led me to get my first job in an MNC like TCS. The comprehensive curriculum and career support were instrumental in my success. I highly recommend this course to anyone looking to transform their career.",
  },
];

function createTestimonialCard(testimonial) {
  const card = document.createElement("div");
  card.className = "testimonial-card";

  card.innerHTML = `
          <img loading="lazy" src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
          <h2 class="testimonial-name">${testimonial.name}</h2>
          <p class="testimonial-title">${testimonial.title}</p>
          <div class="testimonial-rating">${"★".repeat(testimonial.rating)}</div>
          <p class="testimonial-text">${testimonial.text}</p>
      `;

  return card;
}

function populateTestimonials() {
  const container = document.getElementById("testimonialContainer");
  if (!container) return;

  // Clear existing content first
  container.innerHTML = "";

  // Add all testimonials
  testimonials.forEach((testimonial) => {
    container.appendChild(createTestimonialCard(testimonial));
  });
}

// Standalone function to initialize testimonial slider when coursepage.js is not loaded
function initTestimonialSlider() {
  const container = document.getElementById("testimonialContainer");
  if (!container) return;

  const testimonialCards = container.querySelectorAll(".testimonial-card");
  if (!testimonialCards.length) return;

  const carouselDiv = document.getElementById("testimonialCarousel");
  if (!carouselDiv) return;

  // Check if slider container already exists
  let sliderContainer = document.querySelector('.testimonial-slider-container');
  let sliderTrack = document.querySelector('.testimonial-slider-track');
  let sliderClickArea = document.querySelector('.testimonial-slider-click-area');

  // If slider elements don't exist, create them
  if (!sliderContainer) {
    sliderContainer = document.createElement("div");
    sliderContainer.className = "testimonial-slider-container";

    sliderTrack = document.createElement("div");
    sliderTrack.className = "testimonial-slider-track";
    sliderContainer.appendChild(sliderTrack);

    sliderClickArea = document.createElement("div");
    sliderClickArea.className = "testimonial-slider-click-area";
    sliderTrack.appendChild(sliderClickArea);

    // Add slider after testimonial container
    carouselDiv.appendChild(sliderContainer);
  }

  // Remove any existing arrow buttons if they exist
  const prevButton = document.getElementById("prevTestimonialButton");
  const nextButton = document.getElementById("nextTestimonialButton");

  if (prevButton) prevButton.remove();
  if (nextButton) nextButton.remove();

  let currentIndex = 0;

  // Handle click on the slider bar
  if (sliderClickArea) {
    // Remove existing event listeners by cloning and replacing
    const newSliderClickArea = sliderClickArea.cloneNode(true);
    sliderClickArea.parentNode.replaceChild(newSliderClickArea, sliderClickArea);
    sliderClickArea = newSliderClickArea;

    sliderClickArea.addEventListener("click", (e) => {
      const rect = sliderClickArea.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const targetIndex = Math.min(Math.floor(position * testimonials.length), testimonials.length - 1);
      goToSlide(targetIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;

    // Calculate card width (including margins)
    const cardStyle = window.getComputedStyle(testimonialCards[0]);
    const cardWidth = testimonialCards[0].offsetWidth +
      parseInt(cardStyle.marginLeft || 0) +
      parseInt(cardStyle.marginRight || 0);

    // Update the transform to move to the selected slide
    container.style.transform = `translateX(-${index * cardWidth}px)`;

    // Update the slider position
    if (sliderTrack) {
      // Calculate the position percentage for the slider thumb
      const slidePercentage = testimonials.length > 1 ? (index / (testimonials.length - 1)) * 100 : 0;
      sliderTrack.style.setProperty('--active-position', `${slidePercentage}%`);
    }
  }

  // Initialize to first slide
  goToSlide(0);

  // Add touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  // Remove existing listeners by cloning and replacing
  const newContainer = container.cloneNode(true);
  container.parentNode.replaceChild(newContainer, container);

  newContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  newContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - go to next slide
      const nextIndex = (currentIndex + 1) % testimonials.length;
      goToSlide(nextIndex);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - go to previous slide
      const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      goToSlide(prevIndex);
    }
  }
}

// Initialize testimonials on page load
document.addEventListener("DOMContentLoaded", () => {
  populateTestimonials();

  // Always initialize the testimonial slider with sliding bar functionality
  setTimeout(() => {
    initTestimonialSlider();
  }, 500); // Small delay to ensure DOM is fully ready
});










