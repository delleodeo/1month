// App State
let isLoggedIn = false;
let userName = "";
let currentSection = "landing";
let currentPhotoIndex = 0;
let isTyping = false;
let typingIndex = 0;

// App Data
const welcomeText = "Happy 1st Monthsary, My Love! 💕";

const memories = [
  {
    id: 1,
    type: "received",
    message:
      "Tanda mo pa una nating nag usap? yung tinutulak kita kay lawrence december 23 ata or 24 yun e, sabi mo nun bakit hindi nalang ako? tas binura yung message.😄",
    time: "Week 1",
  },
  {
    id: 2,
    type: "sent",
    message: "Lagi ka na nakiki music sakin panay tabi.",
    time: "Week 1",
  },
  {
    id: 3,
    type: "received",
    message: "lagi ng hinahawakan kamay ko.",
    time: "Week 2",
  },
  {
    id: 4,
    type: "sent",
    message: "Tapos yun lagi na tayong nag uusap",
    time: "Week 2",
  },
  {
    id: 4,
    type: "sent",
    message: "Alam ko naman nun may gusto ka sakin diba baby?",
    time: "Week 2",
  },
  {
    id: 4,
    type: "sent",
    message: "Halata naman e baby hahaha",
    time: "Week 2",
  },
  {
    id: 5,
    type: "received",
    message: "Kaso nahihiya kalang umamin",
    time: "Week 3",
  },
  {
    id: 6,
    type: "sent",
    message: "Kaya yun parehas naman tayong umamin",
    time: "Week 3",
  },
  {
    id: 7,
    type: "received",
    message:
      "Tapos nung kinakausap na lagi namang badtrip galit lagi kahit hindi naman inaano.",
    time: "Week 4",
  },
  {
    id: 7,
    type: "received",
    message:
      "Kahit na ganon ka kinausap pa rin kita alam ko kasi gustong gusto moko nun e hehehe",
    time: "Week 4",
  },
  {
    id: 7,
    type: "received",
    message:
      "Tapos lagi nag babasa ng past chat namin ni rosa at ash sabay magseselos e tapos naman na yun.",
    time: "Week 4",
  },
  {
    id: 7,
    type: "sent",
    message: "Lagi ng nag seselos.",
    time: "Week 7",
  },
  {
    id: 8,
    type: "sent",
    message: "After a month...",
    time: "Week 7",
  },
  {
    id: 8,
    type: "sent",
    message: "Tuloy pa rin pag uusap natin",
    time: "Week 7",
  },
  {
    id: 8,
    type: "sent",
    message:
      "Kahit lagi mokong inaaway hehehe, kasi nakikipag kita pa rin ako sa ex ko nun diba baby? hehehe",
    time: "Week 7",
  },
  {
    id: 8,
    type: "sent",
    message:
      "Kahit na ganon tuloy pa rin ktan g kinausap kasi love na love na kita nun baby",
    time: "Week 7",
  },
  {
    id: 8,
    type: "received",
    message:
      "Basta dito na tayo hindi pa naman kita niligawan nun pero sabi mo tayo na May 12 2025, kaya i love you so much baby, mahal na mahal kita sobra kahit na lagi mokong inaaway",
    time: "Week 7",
  },
  {
    id: 5,
    type: "received",
    message:
      "I love our late night conversations about everything and nothing 🌙",
    time: "Week 10",
  },
  {
    id: 6,
    type: "sent",
    message: "You're the best part of every day ❤️",
    time: "Week 13",
  },
  {
    id: 7,
    type: "received",
    message: "Thank you for being so patient and caring with me baby 🥰",
    time: "Week 14",
  },
  {
    id: 8,
    type: "sent",
    message: "Here's to many more beautiful memories together! 💕",
    time: "Week 15",
  },
];

const photos = [
      {
    id: 1,
    url: "./images/1.jpeg",
    caption: "Holding Hands",
    date: "Week 1",
  },
  {
    id: 1,
    url: "./images/10.jpeg",
    caption: "Our Selfie",
    date: "Week 1",
  },
  {
    id: 2,
    url: "./images/12.jpeg",
    caption: "Swimming together 🌟",
    date: "Week 2",
  },
  {
    id: 3,
    url: "./images/4.jpeg",
    caption: "Our romantic swimming haha 💕",
    date: "Week 3",
  },
  {
    id: 4,
    url: "./images/2.jpeg",
    caption: "Selfie ulit💖",
    date: "Week 4",
  },
  {
    id: 4,
    url: "./images/3.jpeg",
    caption: "Selfie ulit💖",
    date: "Week 4",
  },
  {
    id: 4,
    url: "./images/5.jpeg",
    caption: "Kiki Sabay sa uso💖",
    date: "Week 4",
  },
  {
    id: 4,
    url: "./images/6.jpeg",
    caption: "Pogi ko dine",
    date: "Week 4",
  },
  {
    id: 4,
    url: "./images/7.jpeg",
    caption: "Sweet ko no",
    date: "Week 4",
  },
  {
    id: 4,
    url: "./images/8.jpeg",
    caption: "Tangkad mo",
    date: "Week 4",
  },
];

// DOM Elements
const loginScreen = document.getElementById("loginScreen");
const mainApp = document.getElementById("mainApp");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const welcomeUser = document.getElementById("welcomeUser");
const logoutBtn = document.getElementById("logoutBtn");
const typedText = document.getElementById("typedText");
const musicBtn = document.getElementById("musicBtn");
const volumeControl = document.getElementById("volumeControl");
const backgroundMusic = document.getElementById("backgroundMusic");
const volumeSlider = document.getElementById("volumeSlider");
const revealBtn = document.getElementById("revealBtn");
const messageReveal = document.getElementById("messageReveal");
const messageContent = document.getElementById("messageContent");
const chatMessages = document.getElementById("chatMessages");
const photoCarousel = document.getElementById("photoCarousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  createFloatingHearts();
  populateMemories();
  populatePhotos();
}

function setupEventListeners() {
  // Login form
  loginForm.addEventListener("submit", handleLogin);

  // Logout button
  logoutBtn.addEventListener("click", handleLogout);

  // Navigation
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("click", () => {
      const section = card.getAttribute("data-section");
      showSection(section);
    });
  });

  // Back buttons
  document.querySelectorAll(".back-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const backTo = btn.getAttribute("data-back");
      showSection(backTo);
    });
  });

  // Music controls
  musicBtn.addEventListener("click", toggleMusic);
  volumeSlider.addEventListener("input", handleVolumeChange);

  // Message reveal
  revealBtn.addEventListener("click", revealMessage);

  // Photo carousel
  prevBtn.addEventListener("click", () => changePhoto(-1));
  nextBtn.addEventListener("click", () => changePhoto(1));

  // Touch events for mobile carousel
  let startX = 0;
  let endX = 0;

  photoCarousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  photoCarousel.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const difference = startX - endX;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        changePhoto(1); // Swipe left, next photo
      } else {
        changePhoto(-1); // Swipe right, previous photo
      }
    }
  }
}

// Login/Logout
function handleLogin(e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");

  if (nameInput.value.trim() === "") {
    showError("Please enter your name");
    return;
  }

  if (!passwordInput.value.toLowerCase().includes("love")) {
    showError('Hint: The password contains the word "love" 💕');
    return;
  }

  userName = nameInput.value.trim();
  isLoggedIn = true;

  loginScreen.classList.remove("active");
  mainApp.classList.add("active");

  welcomeUser.textContent = `Welcome, ${userName}!`;

  startTypingAnimation();
}

function handleLogout() {
  isLoggedIn = false;
  userName = "";
  currentSection = "landing";

  typedText.textContent = "";
  typingIndex = 0;

  loginScreen.classList.add("active");
  mainApp.classList.remove("active");

  document.getElementById("name").value = "";
  document.getElementById("password").value = "";
  loginError.classList.remove("show");

  pauseMusic();
}

function showError(message) {
  loginError.textContent = message;
  loginError.classList.add("show");
}

// Section Navigation
function showSection(section) {
  currentSection = section;

  document.querySelectorAll(".content-section").forEach((elem) => {
    elem.classList.remove("active");
  });

  document.getElementById(section + "Page").classList.add("active");

  if (section === "landing" && isLoggedIn && typingIndex === 0) {
    startTypingAnimation();
  }
}

// Typing Animation
function startTypingAnimation() {
  if (isTyping) return;

  isTyping = true;
  typingIndex = 0;
  typedText.textContent = "";

  typeNextCharacter();
}

function typeNextCharacter() {
  if (typingIndex < welcomeText.length) {
    typedText.textContent += welcomeText[typingIndex];
    typingIndex++;
    setTimeout(typeNextCharacter, 100);
  } else {
    isTyping = false;
  }
}

// Floating Hearts
function createFloatingHearts() {
  const heartsContainer = document.getElementById("floatingHearts");

  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";

    // Random properties
    const left = Math.random() * 100;
    const animationDuration = 3 + Math.random() * 4;
    const delay = Math.random() * 5;
    const size = 12 + Math.random() * 8;

    heart.style.left = `${left}%`;
    heart.style.animation = `floatUp ${animationDuration}s infinite linear`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    // Create SVG heart
    heart.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
        `;

    heartsContainer.appendChild(heart);
  }
}

// Background Music
function toggleMusic() {
  if (backgroundMusic.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function playMusic() {
  backgroundMusic
    .play()
    .then(() => {
      musicBtn.classList.add("playing");
      volumeControl.classList.remove("hidden");
    })
    .catch((error) => {
      console.log("Audio playback failed:", error);
    });
}

function pauseMusic() {
  backgroundMusic.pause();
  musicBtn.classList.remove("playing");
  volumeControl.classList.add("hidden");
}

function handleVolumeChange() {
  backgroundMusic.volume = volumeSlider.value;
}

// Personal Message
function revealMessage() {
  messageReveal.classList.add("hidden");
  messageContent.classList.remove("hidden");
}

// Memory Chat
function populateMemories() {
  chatMessages.innerHTML = "";

  memories.forEach((memory, index) => {
    const messageElement = document.createElement("div");
    messageElement.className = `chat-message ${memory.type}`;
    messageElement.style.animationDelay = `${index * 0.1}s`;

    messageElement.innerHTML = `
            <div class="message-bubble ${memory.type}">
                <p class="message-text">${memory.message}</p>
                <p class="message-time">${memory.time}</p>
            </div>
        `;

    chatMessages.appendChild(messageElement);
  });
}

// Photo Gallery
function populatePhotos() {
  photoCarousel.innerHTML = "";

  photos.forEach((photo, index) => {
    const slide = document.createElement("div");
    slide.className = `carousel-slide ${index === 0 ? "active" : ""}`;
    slide.setAttribute("data-index", index);

    slide.innerHTML = `
            <div class="photo-container">
                <img src="${photo.url}" alt="${photo.caption}" class="photo">
                <div class="photo-overlay"></div>
            </div>
            <div class="photo-info">
                <p class="photo-caption">${photo.caption}</p>
                <p class="photo-date">${photo.date}</p>
            </div>
        `;

    photoCarousel.appendChild(slide);
  });
}

function changePhoto(direction) {
  const slides = photoCarousel.querySelectorAll(".carousel-slide");

  slides[currentPhotoIndex].classList.remove("active");

  currentPhotoIndex =
    (currentPhotoIndex + direction + slides.length) % slides.length;

  slides[currentPhotoIndex].classList.add("active");
}
