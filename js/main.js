// ===================================
// MOBILE MENU
// ===================================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Open menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
  });
}

// Close menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
}

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
const animatedElements = document.querySelectorAll(
  '.section__title, .hero__text, .hero__image, .about__text, .skill-card, .project-card, .contact__content'
);

animatedElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===================================
// SWIPER INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const portfolioSwiper = new Swiper('.portfolio__swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },
  });
});

// ===================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.style.color = '');
      if (navLink) {
        navLink.style.color = 'var(--color-accent)';
      }
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// PARALLAX EFFECT ON HERO IMAGE
// ===================================
const heroImage = document.querySelector('.hero__image-wrapper');

if (heroImage) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    heroImage.style.transform = `translateY(${rate}px)`;
  });
}

// ===================================
// TYPING EFFECT (OPTIONAL ENHANCEMENT)
// ===================================
const heroSubtitle = document.querySelector('.hero__subtitle');
const roles = ['Fronted Разработчик'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    heroSubtitle.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500;
  }

  setTimeout(typeRole, typingSpeed);
}

// Start typing effect
if (heroSubtitle) {
  setTimeout(typeRole, 1000);
}
