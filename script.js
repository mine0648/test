/*
 * Sungrove Corporation (サングローブ株式会社)
 * Interactive JavaScript for Professional Web Experience
 * 
 * @version 1.0.0
 * @license MIT
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌱 Sungrove Corporation website loaded successfully');
    
    // ========================================
    // Smooth Header Scroll Effect
    // ========================================
    
    const header = document.querySelector('.g-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Add background blur effect when scrolling
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(123, 182, 70, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = scrollY;
    });
    
    // ========================================
    // Mobile Navigation
    // ========================================
    
    const mobileMenuBtn = document.querySelector('.g-header__menu');
    const nav = document.querySelector('.g-header__nav');
    const navLinks = document.querySelectorAll('.g-header__nav-link');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ========================================
    // Smooth Scrolling Navigation
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
    
    // ========================================
    // Active Navigation Link Highlighting
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
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
    
    // ========================================
    // Intersection Observer for Animations
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animate counters in hero section
                if (entry.target.classList.contains('p-top-visual__stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .c-section-header,
        .p-top-voice__item,
        .p-top-information__news-item,
        .p-top-information__media-item,
        .p-top-service__item,
        .p-top-results__item,
        .p-top-visual__stat-number
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ========================================
    // Counter Animation
    // ========================================
    
    function animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        if (!isNaN(number)) {
            const duration = 2000;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentNumber = Math.floor(number * easeOut);
                
                element.textContent = currentNumber + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
    }
    
    // ========================================
    // Service Cards Interaction
    // ========================================
    
    const serviceCards = document.querySelectorAll('.p-top-service__item');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click interaction for mobile
        card.addEventListener('click', function() {
            showServiceModal(this);
        });
    });
    
    // ========================================
    // Service Modal System
    // ========================================
    
    function showServiceModal(serviceCard) {
        const title = serviceCard.querySelector('.p-top-service__title').textContent;
        const description = serviceCard.querySelector('.p-top-service__description').textContent;
        const features = Array.from(serviceCard.querySelectorAll('.p-top-service__feature'))
            .map(feature => feature.textContent);
        
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" aria-label="閉じる">&times;</button>
                    <div class="modal-header">
                        <h3>${title}</h3>
                    </div>
                    <div class="modal-body">
                        <p>${description}</p>
                        <div class="modal-features">
                            <h4>主な機能・特徴</h4>
                            <ul>
                                ${features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-cta">
                            <a href="#contact" class="c-btn c-btn--primary">
                                詳しく相談する
                                <span class="c-btn__arrow">→</span>
                            </a>
                        </div>
                    </div>
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
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.3s ease-out;
        `;
        
        const overlay = modal.querySelector('.modal-overlay');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            position: relative;
            background: white;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(123, 182, 70, 0.3);
            animation: modalSlideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        function closeModal() {
            modal.style.animation = 'modalFadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        }
        
        // ESC key to close
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    // ========================================
    // Portfolio Image Hover Effects
    // ========================================
    
    const portfolioItems = document.querySelectorAll('.p-top-results__item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.p-top-results__image img');
            image.style.transform = 'scale(1.1)';
            image.style.filter = 'brightness(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.p-top-results__image img');
            image.style.transform = 'scale(1)';
            image.style.filter = 'brightness(1)';
        });
    });
    
    // ========================================
    // Parallax Effects for Hero Section
    // ========================================
    
    const heroBackground = document.querySelector('.p-top-visual__wave-animation');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // ========================================
    // Button Ripple Effect
    // ========================================
    
    const buttons = document.querySelectorAll('.c-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ========================================
    // Lazy Loading for Images
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.remove('loading');
                    img.style.filter = 'none';
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img').forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }
    
    // ========================================
    // Contact Form Enhancement (if exists)
    // ========================================
    
    const contactButtons = document.querySelectorAll('a[href="#contact"], a[href="#contact-form"]');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showContactModal();
        });
    });
    
    function showContactModal() {
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" aria-label="閉じる">&times;</button>
                    <div class="modal-header">
                        <h3>お問い合わせ</h3>
                        <p>お客様のビジネス課題について、お気軽にご相談ください。</p>
                    </div>
                    <div class="modal-body">
                        <form class="contact-form">
                            <div class="form-group">
                                <label for="name">お名前 <span class="required">*</span></label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">メールアドレス <span class="required">*</span></label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="company">会社名</label>
                                <input type="text" id="company" name="company">
                            </div>
                            <div class="form-group">
                                <label for="service">ご興味のあるサービス</label>
                                <select id="service" name="service">
                                    <option value="">選択してください</option>
                                    <option value="web">Web制作・CMS</option>
                                    <option value="ec">EC構築</option>
                                    <option value="marketing">デジタルマーケティング</option>
                                    <option value="video">動画制作</option>
                                    <option value="other">その他</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="message">お問い合わせ内容 <span class="required">*</span></label>
                                <textarea id="message" name="message" rows="5" required></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="c-btn c-btn--primary c-btn--large">
                                    送信する
                                    <span class="c-btn__arrow">→</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Form submission
        const form = modal.querySelector('.contact-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessMessage();
            closeContactModal();
        });
        
        // Close functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', closeContactModal);
        overlay.addEventListener('click', closeContactModal);
        
        function closeContactModal() {
            modal.style.animation = 'modalFadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    function showSuccessMessage() {
        showNotification('お問い合わせを受け付けました。2営業日以内にご回答いたします。', 'success');
    }
    
    // ========================================
    // Notification System
    // ========================================
    
    function showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#7bb646' : type === 'error' ? '#ef4444' : '#0693e3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
            font-size: 0.9rem;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-hide
        const autoHide = setTimeout(() => {
            hideNotification();
        }, duration);
        
        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoHide);
            hideNotification();
        });
        
        function hideNotification() {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }
    
    // ========================================
    // Page Performance Monitoring
    // ========================================
    
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`🚀 Page loaded in ${Math.round(loadTime)}ms`);
        
        // Track navigation timing
        if (performance.getEntriesByType) {
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries.length > 0) {
                const nav = navEntries[0];
                console.log(`📊 Navigation timing:`, {
                    DNS: Math.round(nav.domainLookupEnd - nav.domainLookupStart),
                    TCP: Math.round(nav.connectEnd - nav.connectStart),
                    Request: Math.round(nav.responseStart - nav.requestStart),
                    Response: Math.round(nav.responseEnd - nav.responseStart),
                    DOM: Math.round(nav.domContentLoadedEventEnd - nav.responseEnd)
                });
            }
        }
    });
    
    // ========================================
    // CSS Animations
    // ========================================
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes modalSlideIn {
            from { 
                opacity: 0; 
                transform: translateY(30px) scale(0.9); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }
        
        @keyframes slideInRight {
            from { 
                opacity: 0; 
                transform: translateX(100%); 
            }
            to { 
                opacity: 1; 
                transform: translateX(0); 
            }
        }
        
        @keyframes slideOutRight {
            from { 
                opacity: 1; 
                transform: translateX(0); 
            }
            to { 
                opacity: 0; 
                transform: translateX(100%); 
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .g-header__nav.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border-top: 1px solid var(--color-gray-200);
            padding: 2rem 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }
        
        .g-header__nav.active .g-header__nav-list {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
        }
        
        .g-header__nav.active .g-header__nav-link {
            padding: 1rem;
            text-align: center;
            border-radius: 8px;
            background: rgba(123, 182, 70, 0.05);
        }
        
        .modal-header {
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #e9ecef;
        }
        
        .modal-header h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #212529;
            margin-bottom: 0.5rem;
        }
        
        .modal-header p {
            color: #6c757d;
            margin: 0;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #6c757d;
            cursor: pointer;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .modal-close:hover {
            background: #f8f9fa;
            color: #212529;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #212529;
        }
        
        .required {
            color: #dc3545;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #7bb646;
            box-shadow: 0 0 0 3px rgba(123, 182, 70, 0.1);
        }
        
        .form-actions {
            text-align: center;
            margin-top: 2rem;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-icon {
            font-weight: bold;
            font-size: 1.1rem;
        }
        
        .notification-message {
            flex: 1;
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            .g-header__nav.active {
                padding: 1rem;
            }
            
            .modal-content {
                margin: 1rem;
                max-height: calc(100vh - 2rem);
            }
            
            .modal-header,
            .modal-body {
                padding: 1.5rem;
            }
            
            .notification {
                right: 1rem;
                left: 1rem;
                max-width: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // ========================================
    // Initialize Features
    // ========================================
    
    // Add loading class to images initially
    document.querySelectorAll('img').forEach(img => {
        img.style.filter = 'blur(2px)';
        img.style.transition = 'filter 0.3s ease';
    });
    
    // Show welcome message for first-time visitors
    if (!localStorage.getItem('sungrove-visited')) {
        setTimeout(() => {
            showNotification('🌱 サングローブ株式会社へようこそ！最先端の集客支援をご提案いたします。', 'success', 4000);
            localStorage.setItem('sungrove-visited', 'true');
        }, 2000);
    }
    
    console.log('✅ All Sungrove interactive features initialized successfully');
});