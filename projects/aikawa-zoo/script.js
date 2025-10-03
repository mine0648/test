// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      // Close mobile menu if open
      if (mainNav) mainNav.classList.remove('active');
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');

      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
  } else {
    header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
  }

  lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards for fade-in effect
document.querySelectorAll('.about-card, .animal-card, .experience-card, .event-card, .guide-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Counter Animation for Stats
const animateCounter = (element, target, duration) => {
  let current = 0;
  const increment = target / (duration / 16); // 60fps

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const number = entry.target.querySelector('.stat-number');
      if (number) {
        const text = number.textContent;
        const value = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/\d/g, '');

        animateCounter({
          textContent: ''
        }, value, 2000);

        // Update with suffix
        let currentValue = 0;
        const increment = value / 120;
        const interval = setInterval(() => {
          currentValue += increment;
          if (currentValue >= value) {
            number.innerHTML = value + '<span>' + suffix + '</span>';
            clearInterval(interval);
          } else {
            number.innerHTML = Math.floor(currentValue) + '<span>' + suffix + '</span>';
          }
        }, 16);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(stat => {
  statsObserver.observe(stat);
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
  let current = '';
  const headerHeight = header.offsetHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionHeight = section.offsetHeight;

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Log page load
console.log('🦁 相川動物園サイトへようこそ！');
console.log('このサイトはワイヤーフレームを重視して作成されました。');
