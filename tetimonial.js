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
        image: "./images/aiden.jpeg",
        rating: 5,
        text: "Digital Nexus AI is an excellent place to gain technology skills. My trainer was outstanding, and I learned extensively about Python, Data Science, Machine Learning, Neural Networks, and more. The best part of the experience was the hands-on projects and the internship. They provided great support in career guidance, offering valuable advice on acing interviews at multinational companies. I secured a fantastic job in a pharma-based MNC in data science and data engineering.",
    },
    {
        name: "Shridhar Purandare",
        title: "Developer",
        image: "./images/Shridhar Purandare1.jpg",
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