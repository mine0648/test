// 岡温泉サイト - のぼせる湯宿風完全再現版JavaScript

(function() {
    'use strict';

    // 初期化
    function init() {
        console.log('岡温泉サイト（のぼせる湯宿風）初期化開始');
        
        setupAnimations();
        setupInteractions();
        
        console.log('岡温泉サイト初期化完了');
    }

    // アニメーション設定
    function setupAnimations() {
        // 左ナビの段階的表示
        const navChars = document.querySelectorAll('.vertical-char');
        navChars.forEach((char, index) => {
            char.style.opacity = '0';
            char.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                char.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                char.style.opacity = '1';
                char.style.transform = 'translateY(0)';
            }, 1200 + (index * 100));
        });

        // ヘッダーテキストのアニメーション
        const headerText = document.querySelector('.header-text');
        if (headerText) {
            headerText.style.opacity = '0';
            setTimeout(() => {
                headerText.style.transition = 'opacity 1000ms cubic-bezier(.4,.4,0,1)';
                headerText.style.opacity = '1';
            }, 400);
        }

        // メイン背景エリアのフェードイン
        const mainBg = document.querySelector('.main-background');
        if (mainBg) {
            mainBg.style.opacity = '0';
            mainBg.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                mainBg.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
                mainBg.style.opacity = '1';
                mainBg.style.transform = 'scale(1)';
            }, 800);
        }
    }

    // インタラクション設定
    function setupInteractions() {
        // Instagramアイコンのクリック
        const instagramIcon = document.querySelector('.instagram-icon');
        if (instagramIcon) {
            instagramIcon.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('Instagramページへリンクします', 'info');
            });
            
            instagramIcon.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'scale(1.15) rotate(10deg)';
                e.target.style.color = '#ff6b35';
            });
            
            instagramIcon.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.color = '#d45506';
            });
        }

        // メニューボタンのクリック
        const menuButton = document.querySelector('.footer-text');
        if (menuButton) {
            menuButton.addEventListener('click', (e) => {
                e.preventDefault();
                showMenu();
            });
        }
    }

    // メニュー表示
    function showMenu() {
        const menuModal = document.createElement('div');
        menuModal.className = 'menu-modal';
        menuModal.innerHTML = `
            <div class="menu-overlay"></div>
            <div class="menu-content">
                <div class="menu-header">
                    <h3>岡温泉</h3>
                    <button class="menu-close">&times;</button>
                </div>
                <nav class="menu-nav">
                    <ul>
                        <li><a href="#top">トップ</a></li>
                        <li><a href="#visit">訪れる</a></li>
                        <li><a href="#about">岡温泉について</a></li>
                        <li><a href="#contact">お問い合わせ</a></li>
                    </ul>
                </nav>
            </div>
        `;
        
        Object.assign(menuModal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        document.body.appendChild(menuModal);
        
        // 閉じるボタンのイベント
        menuModal.querySelector('.menu-close').addEventListener('click', () => {
            document.body.removeChild(menuModal);
        });
        
        menuModal.querySelector('.menu-overlay').addEventListener('click', () => {
            document.body.removeChild(menuModal);
        });
    }

    // 通知表示
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#d45506',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '4px',
            zIndex: '1001',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // 初期化実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // CSS追加
    const styles = document.createElement('style');
    styles.textContent = `
        .menu-modal .menu-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
        }
        
        .menu-modal .menu-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 400px;
            width: 90%;
            position: relative;
            z-index: 1;
        }
        
        .menu-modal .menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 1rem;
        }
        
        .menu-modal .menu-header h3 {
            color: #d45506;
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .menu-modal .menu-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
        }
        
        .menu-modal .menu-nav ul {
            list-style: none;
            padding: 0;
        }
        
        .menu-modal .menu-nav li {
            margin: 1rem 0;
        }
        
        .menu-modal .menu-nav a {
            color: #333;
            text-decoration: none;
            font-size: 1.1rem;
            display: block;
            padding: 0.5rem 0;
            transition: color 0.3s ease;
        }
        
        .menu-modal .menu-nav a:hover {
            color: #d45506;
        }
    `;
    
    document.head.appendChild(styles);

})();
document.addEventListener('DOMContentLoaded', function() {
    
    // 初期化とパフォーマンス最適化
    let isScrolling = false;
    let ticking = false;
    
    // Intersection Observer の詳細設定
    const observerOptions = {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
        rootMargin: '0px 0px -10% 0px'
    };
    
    const appearObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                // 段階的な遅延アニメーション
                const element = entry.target;
                const delay = parseInt(element.dataset.delay) || 0;
                
                setTimeout(() => {
                    element.classList.add('appear');
                    element.style.transitionDelay = `${delay}ms`;
                }, delay);
                
                // 一度表示されたら監視を停止（パフォーマンス向上）
                appearObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // 要素の遅延設定とObserver登録
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.sd:not(.appear)');
        elements.forEach((element, index) => {
            // セクション内での順序を考慮した遅延
            const sectionElements = Array.from(element.closest('.section')?.querySelectorAll('.sd') || []);
            const sectionIndex = sectionElements.indexOf(element);
            
            element.dataset.delay = sectionIndex * 120; // 120ms間隔
            appearObserver.observe(element);
        });
    }
    
    // カルーセル機能の強化版
    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach((carousel, carouselIndex) => {
            const slides = carousel.querySelector('.carousel-slides');
            const prevButton = carousel.querySelector('[data-direction="prev"]');
            const nextButton = carousel.querySelector('[data-direction="next"]');
            const slideElements = carousel.querySelectorAll('.carousel-slide');
            
            if (!slides || !prevButton || !nextButton) return;
            
            let currentIndex = 0;
            const slideWidth = 345; // スライド幅 + gap
            const totalSlides = slideElements.length;
            
            // スライドのスムーズな移動
            function scrollToSlide(index) {
                const maxIndex = Math.max(0, totalSlides - Math.floor(slides.clientWidth / slideWidth));
                const targetIndex = Math.max(0, Math.min(index, maxIndex));
                
                slides.scrollTo({
                    left: targetIndex * slideWidth,
                    behavior: 'smooth'
                });
                
                currentIndex = targetIndex;
                updateButtonStates();
            }
            
            // ボタンの状態更新
            function updateButtonStates() {
                const maxScroll = slides.scrollWidth - slides.clientWidth;
                prevButton.style.opacity = slides.scrollLeft <= 0 ? '0.5' : '1';
                nextButton.style.opacity = slides.scrollLeft >= maxScroll ? '0.5' : '1';
            }
            
            // 前のスライド
            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSlide(currentIndex - 1);
            });
            
            // 次のスライド
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSlide(currentIndex + 1);
            });
            
            // スクロール位置の監視
            slides.addEventListener('scroll', debounce(updateButtonStates, 100));
            
            // マウスドラッグ機能
            let isMouseDown = false;
            let startX = 0;
            let scrollLeft = 0;
            
            slides.addEventListener('mousedown', (e) => {
                isMouseDown = true;
                slides.style.cursor = 'grabbing';
                slides.style.userSelect = 'none';
                startX = e.pageX - slides.offsetLeft;
                scrollLeft = slides.scrollLeft;
            });
            
            slides.addEventListener('mouseleave', () => {
                isMouseDown = false;
                slides.style.cursor = 'grab';
                slides.style.userSelect = '';
            });
            
            slides.addEventListener('mouseup', () => {
                isMouseDown = false;
                slides.style.cursor = 'grab';
                slides.style.userSelect = '';
            });
            
            slides.addEventListener('mousemove', (e) => {
                if (!isMouseDown) return;
                e.preventDefault();
                const x = e.pageX - slides.offsetLeft;
                const walk = (x - startX) * 1.5;
                slides.scrollLeft = scrollLeft - walk;
            });
            
            // タッチ機能
            let startTouchX = 0;
            let startScrollLeft = 0;
            
            slides.addEventListener('touchstart', (e) => {
                startTouchX = e.touches[0].clientX;
                startScrollLeft = slides.scrollLeft;
            }, { passive: true });
            
            slides.addEventListener('touchmove', (e) => {
                if (e.touches.length > 1) return;
                const touchX = e.touches[0].clientX;
                const diff = startTouchX - touchX;
                slides.scrollLeft = startScrollLeft + diff;
            }, { passive: true });
            
            // ホイールスクロール対応
            slides.addEventListener('wheel', (e) => {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    // 横スクロール
                    e.preventDefault();
                    slides.scrollLeft += e.deltaX;
                } else if (e.deltaY !== 0 && (e.ctrlKey || e.metaKey)) {
                    // Ctrl/Cmd+ホイールで横スクロール
                    e.preventDefault();
                    slides.scrollLeft += e.deltaY;
                }
            }, { passive: false });
            
            // 初期状態設定
            updateButtonStates();
            
            // キーボードアクセシビリティ
            carousel.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    scrollToSlide(currentIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    scrollToSlide(currentIndex + 1);
                }
            });
        });
    }
    
    // パララックス効果の精密実装
    function initPreciseParallax() {
        const heroImage = document.querySelector('.hero-image');
        const heroTitle = document.querySelector('.hero-title');
        
        if (!heroImage || !heroTitle) return;
        
        function updateParallax() {
            if (isScrolling) return;
            
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const scrollPercent = Math.min(scrolled / windowHeight, 1);
            
            // ヒーロー画像のパララックス
            const imageOffset = scrolled * 0.3;
            heroImage.style.transform = `translateY(calc(-50% + ${imageOffset}px))`;
            
            // タイトルの軽いパララックス
            const titleOffset = scrolled * 0.1;
            heroTitle.style.transform = `translateY(calc(-50% - ${titleOffset}px))`;
            
            // 背景の動的変更
            const hueShift = Math.floor(scrollPercent * 15);
            document.body.style.background = `rgb(${215 - hueShift}, ${181 - hueShift * 0.5}, ${140 - hueShift * 0.3})`;
            
            requestAnimationFrame(updateParallax);
        }
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(() => {
                    updateParallax();
                    isScrolling = false;
                });
            }
        }, { passive: true });
    }
    
    // スムーススクロール
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 60;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // カードのインタラクション強化
    function initCardInteractions() {
        const cards = document.querySelectorAll('.carousel-slide');
        
        cards.forEach(card => {
            // マウスエンター
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'translateY(-12px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
                
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                }
            });
            
            // マウスリーブ
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
                
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
            
            // アクセシビリティ：フォーカス時
            card.addEventListener('focus', () => {
                card.style.outline = '2px solid rgb(212, 85, 6)';
                card.style.outlineOffset = '4px';
            });
            
            card.addEventListener('blur', () => {
                card.style.outline = '';
                card.style.outlineOffset = '';
            });
        });
    }
    
    // メニューボタンの機能
    function initMenuButton() {
        const menuButton = document.querySelector('.menu-button');
        
        if (menuButton) {
            menuButton.addEventListener('click', () => {
                // 将来のモーダル実装用
                console.log('Menu button clicked - Future modal implementation');
                
                // 簡単なフィードバック
                menuButton.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    menuButton.style.transform = '';
                }, 150);
            });
        }
    }
    
    // レスポンシブ対応の強化
    function handleResize() {
        const viewportWidth = window.innerWidth;
        
        // モバイル判定
        if (viewportWidth <= 768) {
            document.body.classList.add('mobile');
            document.body.classList.remove('desktop');
        } else {
            document.body.classList.add('desktop');
            document.body.classList.remove('mobile');
        }
        
        // カルーセルの再計算
        initCarousels();
    }
    
    // パフォーマンス監視
    function initPerformanceMonitoring() {
        // FPS監視（開発用）
        let fps = 0;
        let lastTime = performance.now();
        let frameCount = 0;
        
        function calculateFPS() {
            const now = performance.now();
            frameCount++;
            
            if (now - lastTime >= 1000) {
                fps = Math.round((frameCount * 1000) / (now - lastTime));
                frameCount = 0;
                lastTime = now;
                
                // デバッグ用（本番では削除）
                if (window.location.hash === '#debug') {
                    console.log(`FPS: ${fps}`);
                }
            }
            
            requestAnimationFrame(calculateFPS);
        }
        
        requestAnimationFrame(calculateFPS);
    }
    
    // ユーティリティ関数：デバウンス
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ユーティリティ関数：スロットル
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // 初期化関数
    function init() {
        console.log('岡温泉サイト初期化開始...');
        
        // 段階的初期化（パフォーマンス重視）
        setTimeout(() => {
            initScrollAnimations();
            console.log('✓ スクロールアニメーション初期化完了');
        }, 100);
        
        setTimeout(() => {
            initCarousels();
            console.log('✓ カルーセル初期化完了');
        }, 200);
        
        setTimeout(() => {
            initPreciseParallax();
            console.log('✓ パララックス効果初期化完了');
        }, 300);
        
        setTimeout(() => {
            initSmoothScroll();
            initCardInteractions();
            initMenuButton();
            console.log('✓ インタラクション初期化完了');
        }, 400);
        
        // 即座に実行
        handleResize();
        initPerformanceMonitoring();
        
        // 初期表示要素（ヒーロー、サイドバーなど）
        const immediateElements = document.querySelectorAll('.hero-section .sd, .fixed .sd');
        immediateElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('appear');
            }, 300 + (index * 100));
        });
        
        // ページロード完了フェードイン
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 1.2s ease';
            document.body.style.opacity = '1';
        }, 200);
        
        console.log('🎉 岡温泉サイト初期化完了！');
    }
    
    // イベントリスナー
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // 開発者向けショートカット
    document.addEventListener('keydown', (e) => {
        // Ctrl+Shift+D でデバッグ情報表示
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            console.log('=== 岡温泉サイト デバッグ情報 ===');
            console.log('ViewPort:', window.innerWidth, 'x', window.innerHeight);
            console.log('スクロール位置:', window.pageYOffset);
            console.log('表示済み要素:', document.querySelectorAll('.sd.appear').length);
        }
    });
    
    // 初期化実行
    init();
    
    // ページ離脱前のクリーンアップ
    window.addEventListener('beforeunload', () => {
        appearObserver.disconnect();
    });
});

// 外部から呼び出せるAPI
window.OkaOnsenSite = {
    version: '2.0.0',
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    refreshAnimations: function() {
        const elements = document.querySelectorAll('.sd');
        elements.forEach(el => el.classList.remove('appear'));
        setTimeout(() => initScrollAnimations(), 100);
    }
};