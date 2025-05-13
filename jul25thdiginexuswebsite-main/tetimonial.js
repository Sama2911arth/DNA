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
  if (!container) {
    console.error("Testimonial container not found");
    return;
  }

  // Clear existing content to avoid duplication
  container.innerHTML = "";

  // Add all testimonials
  testimonials.forEach((testimonial) => {
    container.appendChild(createTestimonialCard(testimonial));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateTestimonials();

  // Set up slider functionality with a slight delay to ensure testimonial cards are rendered
  setTimeout(() => {
    initializeTestimonialSlider();
    centerTestimonialsIfNeeded();
  }, 200);
});

// Center testimonials if container width is greater than cards' combined width
function centerTestimonialsIfNeeded() {
  const container = document.getElementById('testimonialContainer');
  if (!container) return;

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

function initializeTestimonialSlider() {
  const container = document.getElementById("testimonialContainer");
  if (!container) {
    console.error("Testimonial container not found during slider initialization");
    return;
  }

  const testimonialCards = document.querySelectorAll(".testimonial-card");
  if (!testimonialCards.length) {
    console.error("No testimonial cards found");
    return;
  }

  // Get or create slider track
  const carouselDiv = document.getElementById("testimonialCarousel");
  if (!carouselDiv) {
    console.error("Testimonial carousel div not found");
    return;
  }

  // Find the slider container and track in the DOM
  let sliderContainer = carouselDiv.querySelector('.testimonial-slider-container');
  let sliderTrack = sliderContainer ? sliderContainer.querySelector('.testimonial-slider-track') : null;
  let sliderClickArea = sliderTrack ? sliderTrack.querySelector('.testimonial-slider-click-area') : null;

  // Clear existing dots if any
  if (sliderTrack) {
    // Keep the click area if it exists
    const clickArea = sliderTrack.querySelector('.testimonial-slider-click-area');
    sliderTrack.innerHTML = '';
    if (clickArea) sliderTrack.appendChild(clickArea);
  }

  let currentIndex = 0;
  const totalSlides = testimonialCards.length;

  // Handle click on the slider track for navigation
  if (sliderClickArea) {
    sliderClickArea.addEventListener("click", (e) => {
      const rect = sliderTrack.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const targetIndex = Math.min(Math.floor(position * totalSlides), totalSlides - 1);
      goToSlide(targetIndex);
    });
  } else if (sliderTrack) {
    // If click area doesn't exist, create one
    sliderClickArea = document.createElement("div");
    sliderClickArea.className = "testimonial-slider-click-area";
    sliderTrack.appendChild(sliderClickArea);

    sliderClickArea.addEventListener("click", (e) => {
      const rect = sliderTrack.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const targetIndex = Math.min(Math.floor(position * totalSlides), totalSlides - 1);
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

    // Update container position
    container.style.transform = `translateX(-${index * cardWidth}px)`;

    // Update slider position
    updateSliderTrackPosition(index);
  }

  function updateSliderTrackPosition(index) {
    if (sliderTrack) {
      // Calculate the position percentage for the slider
      const slidePercentage = totalSlides > 1 ? (index / (totalSlides - 1)) * 100 : 0;

      // Update CSS variable
      sliderTrack.style.setProperty('--active-position', `${slidePercentage}%`);

      // Update width based on number of slides
      const sectionWidth = 100 / totalSlides;
      sliderTrack.style.setProperty('--active-width', `${sectionWidth}%`);

      // For browsers that don't support CSS variables in pseudo-elements
      const styleTag = document.createElement('style');
      styleTag.textContent = `.testimonial-slider-track::before { 
        left: ${slidePercentage}%; 
        width: ${sectionWidth}%;
      }`;
      document.head.appendChild(styleTag);

      setTimeout(() => {
        document.head.removeChild(styleTag);
      }, 500);
    }
  }

  // Initialize to first slide
  goToSlide(0);

  // Add touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  container.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - go to next slide
      const nextIndex = (currentIndex + 1) % totalSlides;
      goToSlide(nextIndex);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - go to previous slide
      const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      goToSlide(prevIndex);
    }
  }

  // Optional: Auto-scroll functionality
  let autoScrollInterval;

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalSlides;
      goToSlide(nextIndex);
    }, 5000); // Change slide every 5 seconds
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Start auto-scroll initially
  startAutoScroll();

  // Pause on hover
  carouselDiv.addEventListener("mouseenter", stopAutoScroll);
  carouselDiv.addEventListener("mouseleave", startAutoScroll);
}










