// ===================== SHARED SCRIPT =====================
// Include with: <script src="script.js"></script>

// ----- CAROUSEL -----
let carouselState = { currentSlide: 0, totalSlides: 0 };

function initCarousel(totalSlides) {
  carouselState = { currentSlide: 0, totalSlides: totalSlides };
  const container = document.getElementById('carousel-indicators');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
    indicator.onclick = () => goToSlide(i);
    container.appendChild(indicator);
  }
}

function changeSlide(direction) {
  carouselState.currentSlide += direction;
  if (carouselState.currentSlide < 0) {
    carouselState.currentSlide = carouselState.totalSlides - 1;
  } else if (carouselState.currentSlide >= carouselState.totalSlides) {
    carouselState.currentSlide = 0;
  }
  updateCarousel();
}

function goToSlide(slideIndex) {
  carouselState.currentSlide = slideIndex;
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById('carousel-track');
  const indicators = document.getElementById('carousel-indicators').children;
  track.style.transform = `translateX(-${carouselState.currentSlide * 100}%)`;
  for (let i = 0; i < indicators.length; i++) {
    indicators[i].className = 'carousel-indicator' + (i === carouselState.currentSlide ? ' active' : '');
  }
}

// ----- MOBILE MENU -----
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  navLinks.classList.toggle('active');
  menuBtn.classList.toggle('active');
}

function closeMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  navLinks.classList.remove('active');
  menuBtn.classList.remove('active');
}

// ----- SMOOTH SCROLL -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ----- CURSOR GRADIENT BORDER -----
document.addEventListener('DOMContentLoaded', () => {
  if (typeof carouselTotalSlides !== 'undefined' && carouselTotalSlides > 0) {
    initCarousel(carouselTotalSlides);
  }
  document.querySelectorAll('.gemini-border, .card, .contact-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleRad = Math.atan2(y - centerY, x - centerX);
      const angleDeg = angleRad * (180 / Math.PI) + 90;
      card.style.setProperty('--gradient-angle', `${angleDeg}deg`);
    });
  });
});