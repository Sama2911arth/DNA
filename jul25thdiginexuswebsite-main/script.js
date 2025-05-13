document.addEventListener('DOMContentLoaded', () => {
  // --- Hamburger Menu ---
  const hamburger = document.querySelector('.navigation__hamburger');
  const menu = document.querySelector('.navigation__menu');
  const body = document.body;

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.navigation') && menu.classList.contains('active')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });

    const navLinks = document.querySelectorAll('.navigation__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.classList.remove('no-scroll');
      }
    });
  }

  // --- Collapsible Sections ---
  var coll = document.getElementsByClassName("collapsible");
  var activeIndex = 0;

  function closeAllCollapsibles(exceptIndex) {
    for (var i = 0; i < coll.length; i++) {
      if (i !== exceptIndex) {
        coll[i].classList.remove("active");
        coll[i].nextElementSibling.style.display = "none";
      }
    }
  }

  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = this.nextElementSibling;

      if (this.classList.contains("active")) {
        this.classList.remove("active");
        content.style.display = "none";
      } else {
        closeAllCollapsibles(Array.prototype.indexOf.call(coll, this));
        this.classList.add("active");
        content.style.display = "block";
      }
    });
  }

  // --- Card Switching ---
  if (document.getElementById("data-science-card")) {
    showCard("data-science-card");

    if (document.getElementById("data-science")) {
      setActiveButton("data-science");

      document.getElementById("data-science").addEventListener("click", function () {
        showCard("data-science-card");
        setActiveButton("data-science");
      });
    }

    if (document.getElementById("generative-ai")) {
      document.getElementById("generative-ai").addEventListener("click", function () {
        showCard("generative-ai-card");
        setActiveButton("generative-ai");
      });
    }

    if (document.getElementById("analytics")) {
      document.getElementById("analytics").addEventListener("click", function () {
        showCard("analytics-card");
        setActiveButton("analytics");
      });
    }

    if (document.getElementById("programming")) {
      document.getElementById("programming").addEventListener("click", function () {
        showCard("programming-card");
        setActiveButton("programming");
      });
    }
  }

  function showCard(cardId) {
    const cardElement = document.getElementById(cardId);
    if (!cardElement) return;

    let cards = document.getElementsByClassName("cards");
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
    }
    cardElement.style.display = "flex";
  }

  function setActiveButton(buttonId) {
    const buttonElement = document.getElementById(buttonId);
    if (!buttonElement) return;

    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    buttonElement.classList.add("active");
  }

  // --- Showcase Carousel ---
  const showcaseItems = document.querySelectorAll(".showcase-item");
  const showcaseDots = document.querySelectorAll(".showcase-dot");
  let showcaseIndex = 1;

  function updateShowcasePositions() {
    const containerWidth = document.querySelector(".showcase-container").offsetWidth;
    const itemWidth = containerWidth * 0.3;

    showcaseItems.forEach((item, index) => {
      const offset = (index - showcaseIndex + showcaseItems.length) % showcaseItems.length;
      let x, scale, zIndex, opacity, boxShadow;

      if (offset === 0) {
        x = containerWidth / 2 - itemWidth / 2;
        scale = 1;
        zIndex = 3;
        opacity = 1;
      } else if (offset === 1 || offset === -2) {
        x = containerWidth - itemWidth * 1.1;
        scale = 0.8;
        zIndex = 2;
        opacity = 0.7;
      } else {
        x = itemWidth * 0.1;
        scale = 0.8;
        zIndex = 2;
        opacity = 0.7;
        boxShadow = "none";
      }

      item.style.transform = `translateX(${x}px) scale(${scale})`;
      item.style.zIndex = zIndex;
      item.style.opacity = opacity;
      item.style.boxShadow = boxShadow;
      item.classList.toggle('active', offset === 0);
    });

    updateShowcaseDots();
  }

  function updateShowcaseDots() {
    showcaseDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === showcaseIndex);
    });
  }

  function rotateShowcaseItems(direction) {
    showcaseIndex = (showcaseIndex + direction + showcaseItems.length) % showcaseItems.length;
    updateShowcasePositions();
  }

  showcaseItems.forEach((item) => {
    item.addEventListener("click", () => {
      const itemIndex = Array.from(showcaseItems).indexOf(item);
      const direction = (itemIndex - showcaseIndex + showcaseItems.length) % showcaseItems.length <= 1 ? 1 : -1;
      rotateShowcaseItems(direction);
    });
  });

  showcaseDots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      showcaseIndex = dotIndex;
      updateShowcasePositions();
    });
  });

  window.addEventListener("resize", updateShowcasePositions);
  updateShowcasePositions();
});

// --- Form Submission Handler (outside DOMContentLoaded in case form loads later) ---
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);
  const jsonData = {};

  data.forEach((value, key) => {
    jsonData[key] = value;
  });

  fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => {
      if (response.status === 200) {
        alert("Success");
        form.reset();
      } else {
        alert("Failed to submit");
      }
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      alert("Failed to submit");
    });
}
