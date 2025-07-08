/*!
 * 相川動物園 - Enhanced JavaScript
 * Interactive features for family-friendly zoo website
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
  const animatedElements = document.querySelectorAll('.animal-card, .experience-card, .event-card, .section-title, .section-subtitle');
  
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
  const cards = document.querySelectorAll('.animal-card, .experience-card, .event-card');
  
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

  // Zoo-specific features
  
  // Animal sound effects (optional feature)
  const animalCards = document.querySelectorAll('.animal-card');
  const animalSounds = {
    'ライオン': 'roar.mp3',
    'ゾウ': 'elephant.mp3',
    'キリン': 'giraffe.mp3'
  };
  
  animalCards.forEach(card => {
    card.addEventListener('click', function() {
      const animalName = this.querySelector('.animal-title').textContent;
      const soundFile = animalSounds[animalName];
      
      if (soundFile) {
        // Play animal sound (you would need to add actual audio files)
        console.log(`Playing sound: ${soundFile}`);
        // const audio = new Audio(`/sounds/${soundFile}`);
        // audio.play();
      }
    });
  });

  // Experience booking simulation
  const experienceCards = document.querySelectorAll('.experience-card');
  
  experienceCards.forEach(card => {
    card.addEventListener('click', function() {
      const experienceTitle = this.querySelector('.experience-title').textContent;
      
      // Create a simple booking modal simulation
      const modal = document.createElement('div');
      modal.className = 'booking-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <h3>${experienceTitle}の予約</h3>
          <p>この体験プログラムに参加したいですか？</p>
          <div class="modal-buttons">
            <button class="modal-btn confirm">予約する</button>
            <button class="modal-btn cancel">キャンセル</button>
          </div>
        </div>
      `;
      
      // Add modal styles
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      `;
      
      modal.querySelector('.modal-content').style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        width: 90%;
      `;
      
      modal.querySelector('.modal-buttons').style.cssText = `
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.5rem;
      `;
      
      modal.querySelectorAll('.modal-btn').forEach(btn => {
        btn.style.cssText = `
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        `;
      });
      
      modal.querySelector('.confirm').style.cssText += `
        background: #4CAF50;
        color: white;
      `;
      
      modal.querySelector('.cancel').style.cssText += `
        background: #f5f5f5;
        color: #333;
      `;
      
      document.body.appendChild(modal);
      
      // Add event listeners
      modal.querySelector('.confirm').addEventListener('click', () => {
        alert('予約が完了しました！詳細はメールでお送りします。');
        document.body.removeChild(modal);
      });
      
      modal.querySelector('.cancel').addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    });
  });

  // Weather integration (simulation)
  function displayWeather() {
    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';
    weatherInfo.innerHTML = `
      <div class="weather-widget">
        <span class="weather-icon">☀️</span>
        <span class="weather-temp">25°C</span>
        <span class="weather-desc">晴れ - 動物園日和です！</span>
      </div>
    `;
    
    weatherInfo.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: white;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      font-size: 0.9rem;
      display: none;
    `;
    
    document.body.appendChild(weatherInfo);
    
    // Show weather info when scrolling past hero
    window.addEventListener('scroll', () => {
      if (window.scrollY > hero.offsetHeight / 2) {
        weatherInfo.style.display = 'block';
      } else {
        weatherInfo.style.display = 'none';
      }
    });
  }
  
  // Enable weather widget
  displayWeather();

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

  // Analytics and performance tracking
  function trackPageView() {
    // Google Analytics or other tracking code would go here
    console.log('Zoo website page view tracked');
  }

  function trackUserInteraction(action, element) {
    // Track user interactions for analytics
    console.log(`Zoo user interaction: ${action} on ${element}`);
  }

  // Track clicks on important elements
  document.querySelectorAll('.cta-button, .contact-button, .animal-card, .experience-card').forEach(el => {
    el.addEventListener('click', function() {
      trackUserInteraction('click', this.className);
    });
  });

  trackPageView();

  // Progressive enhancement - Add features for modern browsers
  if (window.CSS && CSS.supports('backdrop-filter', 'blur(10px)')) {
    document.body.classList.add('supports-backdrop-filter');
  }

  if (window.CSS && CSS.supports('display', 'grid')) {
    document.body.classList.add('supports-grid');
  }

  // Fun easter egg - Animal emoji trail
  let isEasterEggActive = false;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'z' && e.ctrlKey) {
      isEasterEggActive = !isEasterEggActive;
      console.log('🐾 Animal trail mode:', isEasterEggActive ? 'ON' : 'OFF');
    }
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isEasterEggActive) {
      const animals = ['🦁', '🐘', '🦒', '🐼', '🐯', '🦓', '🦏', '🦛'];
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      
      const emoji = document.createElement('span');
      emoji.textContent = randomAnimal;
      emoji.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        animation: fadeOut 2s ease-out forwards;
      `;
      
      document.body.appendChild(emoji);
      
      setTimeout(() => {
        document.body.removeChild(emoji);
      }, 2000);
    }
  });

  // Add fadeOut animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-30px); }
    }
  `;
  document.head.appendChild(style);

  console.log('🦁 相川動物園のウェブサイトが正常に読み込まれました！🦒');
  console.log('💡 ヒント: Ctrl+Z で動物の足跡モードを切り替えられます！');
});