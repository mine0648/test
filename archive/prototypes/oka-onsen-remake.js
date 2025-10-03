// 岡温泉サイト - インタラクション＆アニメーション
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // アニメーション遅延を追加
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        });
    }, observerOptions);
    
    // 全ての .sd 要素を監視対象に追加
    document.querySelectorAll('.sd:not(.appear)').forEach((element, index) => {
        element.dataset.delay = index * 100; // 順次アニメーション
        observer.observe(element);
    });
    
    // カルーセル機能
    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(carousel => {
            const slides = carousel.querySelector('.carousel-slides');
            const prevButton = carousel.querySelector('.button:first-child');
            const nextButton = carousel.querySelector('.button:last-child');
            
            let currentIndex = 0;
            const slideWidth = 320; // スライド幅 + gap
            
            // 前のスライド
            prevButton.addEventListener('click', () => {
                const maxScroll = slides.scrollWidth - slides.clientWidth;
                const newScroll = Math.max(0, slides.scrollLeft - slideWidth);
                slides.scrollTo({
                    left: newScroll,
                    behavior: 'smooth'
                });
            });
            
            // 次のスライド  
            nextButton.addEventListener('click', () => {
                const maxScroll = slides.scrollWidth - slides.clientWidth;
                const newScroll = Math.min(maxScroll, slides.scrollLeft + slideWidth);
                slides.scrollTo({
                    left: newScroll,
                    behavior: 'smooth'
                });
            });
            
            // タッチ/マウスドラッグ対応
            let isDown = false;
            let startX;
            let scrollLeft;
            
            slides.addEventListener('mousedown', (e) => {
                isDown = true;
                slides.style.cursor = 'grabbing';
                startX = e.pageX - slides.offsetLeft;
                scrollLeft = slides.scrollLeft;
            });
            
            slides.addEventListener('mouseleave', () => {
                isDown = false;
                slides.style.cursor = 'grab';
            });
            
            slides.addEventListener('mouseup', () => {
                isDown = false;
                slides.style.cursor = 'grab';
            });
            
            slides.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slides.offsetLeft;
                const walk = (x - startX) * 2;
                slides.scrollLeft = scrollLeft - walk;
            });
            
            // タッチイベント
            slides.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - slides.offsetLeft;
                scrollLeft = slides.scrollLeft;
            });
            
            slides.addEventListener('touchmove', (e) => {
                const x = e.touches[0].pageX - slides.offsetLeft;
                const walk = (x - startX) * 2;
                slides.scrollLeft = scrollLeft - walk;
            });
        });
    }
    
    // パララックス効果
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-image');
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.3;
                element.style.transform = `translateY(calc(-50% + ${rate}px))`;
            });
        });
    }
    
    // スムーススクロール
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // メニューボタン機能（将来のモーダル用）
    function initMenu() {
        const menuButton = document.querySelector('.menu-button');
        
        menuButton.addEventListener('click', () => {
            // メニューモーダルを開く処理（今後実装）
            console.log('Menu clicked');
        });
    }
    
    // 背景のグラデーション動的変更
    function initDynamicBackground() {
        window.addEventListener('scroll', () => {
            const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            const hue1 = 30 + (scrollPercent * 20); // 30-50
            const hue2 = 25 + (scrollPercent * 15); // 25-40
            const hue3 = 20 + (scrollPercent * 10); // 20-30
            
            document.body.style.background = `linear-gradient(135deg, 
                hsl(${hue1}, 45%, 65%) 0%, 
                hsl(${hue2}, 40%, 60%) 50%, 
                hsl(${hue3}, 35%, 55%) 100%)`;
        });
    }
    
    // カードホバーエフェクト強化
    function initCardEffects() {
        const cards = document.querySelectorAll('.carousel-slide');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // セクション切り替え時のアニメーション
    function initSectionAnimations() {
        const sections = document.querySelectorAll('.section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elements = entry.target.querySelectorAll('.sd');
                    elements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('appear');
                        }, index * 150);
                    });
                }
            });
        }, {
            threshold: 0.3
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // 初期化
    function init() {
        // 初期状態で表示される要素
        setTimeout(() => {
            document.querySelectorAll('.hero-section .sd, .fixed .sd').forEach(element => {
                element.classList.add('appear');
            });
        }, 500);
        
        initCarousels();
        initParallax();
        initSmoothScroll();
        initMenu();
        initDynamicBackground();
        initCardEffects();
        initSectionAnimations();
        
        // ページロード時のフェードイン
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '1';
        }, 100);
    }
    
    init();
    
    // リサイズ対応
    window.addEventListener('resize', () => {
        // カルーセルの再計算など必要に応じて
    });
    
    // 開発用：キーボードショートカット
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' && e.ctrlKey) {
            // Ctrl+R で強制リロード（開発用）
            location.reload();
        }
    });
    
});

// パフォーマンス最適化
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

// スクロールイベントのデバウンス
const debouncedScrollHandler = debounce(() => {
    // 重い処理をここに
}, 16); // 60fps

window.addEventListener('scroll', debouncedScrollHandler);