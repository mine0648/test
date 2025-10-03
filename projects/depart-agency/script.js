/*!
 * DEPART Design Agency - Enhanced JavaScript
 * Interactive features for modern portfolio website
 * 
 * @author Claude Code
 * @version 1.0.0
 * @license MIT
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Header scroll effect
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for scroll animations
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

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.work-card, .service-card, .blog-card, .section-title, .section-subtitle');
  
  animatedElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
      const parallaxSpeed = scrolled * 0.5;
      hero.style.transform = `translateY(${parallaxSpeed}px)`;
    }
  });

  // Dynamic typing effect for hero title
  const heroTitle = document.querySelector('.hero-title');
  const titleText = heroTitle.textContent;
  
  function typeWriter() {
    heroTitle.textContent = '';
    let i = 0;
    
    function type() {
      if (i < titleText.length) {
        heroTitle.textContent += titleText.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    
    setTimeout(type, 1000);
  }

  // Uncomment to enable typing effect
  // typeWriter();

  // Card hover effects
  const cards = document.querySelectorAll('.work-card, .service-card, .blog-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Loading states
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.remove('loading');
    });
    
    if (img.complete) {
      img.classList.remove('loading');
    } else {
      img.classList.add('loading');
    }
  });

  // Contact form enhancement (if form exists)
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      button.textContent = '送信中...';
      button.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        button.textContent = '送信完了！';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 2000);
      }, 1500);
    });
  }

  // Mobile menu toggle (for future mobile menu implementation)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Theme toggle (optional feature)
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  // Performance optimization - Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Cursor trail effect (optional enhancement)
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 100);
    });

    // Cursor hover effects
    document.querySelectorAll('a, button, .work-card, .service-card, .blog-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
      });
    });
  }

  // Analytics and performance tracking
  function trackPageView() {
    // Google Analytics or other tracking code would go here
    console.log('Page view tracked');
  }

  function trackUserInteraction(action, element) {
    // Track user interactions for analytics
    console.log(`User interaction: ${action} on ${element}`);
  }

  // Track clicks on important elements
  document.querySelectorAll('.cta-button, .contact-button, .work-card').forEach(el => {
    el.addEventListener('click', function() {
      trackUserInteraction('click', this.className);
    });
  });

  trackPageView();

  // Service Worker registration for PWA features
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  // Progressive enhancement - Add features for modern browsers
  if (window.CSS && CSS.supports('backdrop-filter', 'blur(10px)')) {
    document.body.classList.add('supports-backdrop-filter');
  }

  if (window.CSS && CSS.supports('display', 'grid')) {
    document.body.classList.add('supports-grid');
  }

  console.log('DEPART website loaded successfully! 🚀');
});