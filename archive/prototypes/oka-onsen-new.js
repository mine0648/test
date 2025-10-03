// 岡温泉サイト用JavaScript
// のぼせる湯宿のデザインパターンを踏襲しつつ、岡温泉用にカスタマイズ

(function() {
    'use strict';

    // サイトデータ（のぼせる湯宿のデータ構造を参考）
    const siteData = {
        project: {
            name: "岡温泉",
            type: "web",
            description: "静寂と癒しに包まれた岡温泉。山深い自然に囲まれ、古き良き湯治文化を受け継ぐ秘湯の温泉地です。"
        },
        colors: {
            primary: "#d45506",
            secondary: "#333333",
            background: "#ffffff",
            text: "#333333"
        },
        fonts: [
            { family: "A1ゴシック R JIS2004", vendor: "typesquare" },
            { family: "A1ゴシック M JIS2004", vendor: "typesquare" },
            { family: "A1ゴシック B JIS2004", vendor: "typesquare" },
            { family: "A1ゴシック L JIS2004", vendor: "typesquare" },
            { family: "Montserrat", vendor: "google" }
        ],
        sections: [
            { id: "hero", name: "ヒーロー" },
            { id: "visit", name: "訪れる" },
            { id: "live", name: "暮らす" },
            { id: "work", name: "営む" },
            { id: "about", name: "岡温泉について" },
            { id: "contact", name: "お問い合わせ" }
        ]
    };

    // DOM要素の取得
    const elements = {
        container: document.querySelector('.container'),
        verticalNav: document.querySelector('[data-s="nav-container"]'),
        header: document.querySelector('[data-s="header"]'),
        footer: document.querySelector('[data-s="footer"]'),
        instagramIcon: document.querySelector('[data-s="instagram"]'),
        menuButton: document.querySelector('[data-s="footer-text"]'),
        heroSection: document.querySelector('[data-s="hero"]'),
        contentCards: document.querySelectorAll('.content-card')
    };

    // アニメーション設定
    const animationSettings = {
        verticalNav: { delay: 1200, duration: 400 },
        header: { delay: 400, duration: 1000 },
        footer: { delay: 0, duration: 800 },
        heroContent: { delay: 600, duration: 1200 },
        cards: { delay: 200, duration: 600, stagger: 150 }
    };

    // 初期化関数
    function init() {
        setupAnimations();
        setupInteractions();
        setupResponsive();
        setupTypography();
        initializeScrollAnimations();
        
        console.log('岡温泉サイトが初期化されました');
    }

    // アニメーションの設定
    function setupAnimations() {
        // 要素にappearクラスを追加してアニメーション準備
        if (elements.verticalNav) {
            elements.verticalNav.classList.add('appear');
            setTimeout(() => {
                elements.verticalNav.classList.add('appear-active');
            }, animationSettings.verticalNav.delay);
        }

        if (elements.header) {
            elements.header.classList.add('appear');
            setTimeout(() => {
                elements.header.classList.add('appear-active');
            }, animationSettings.header.delay);
        }

        // カードのスタガードアニメーション
        elements.contentCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, animationSettings.cards.delay + (index * animationSettings.cards.stagger));
        });
    }

    // インタラクションの設定
    function setupInteractions() {
        // Instagramアイコンのクリックイベント
        if (elements.instagramIcon) {
            elements.instagramIcon.addEventListener('click', handleInstagramClick);
            elements.instagramIcon.addEventListener('mouseenter', handleIconHover);
            elements.instagramIcon.addEventListener('mouseleave', handleIconLeave);
        }

        // メニューボタンのクリックイベント
        if (elements.menuButton) {
            elements.menuButton.addEventListener('click', handleMenuClick);
        }

        // カードのホバー効果
        elements.contentCards.forEach(card => {
            card.addEventListener('mouseenter', handleCardHover);
            card.addEventListener('mouseleave', handleCardLeave);
        });

        // スクロールイベント
        window.addEventListener('scroll', handleScroll);
        
        // リサイズイベント
        window.addEventListener('resize', debounce(handleResize, 250));
    }

    // レスポンシブ対応
    function setupResponsive() {
        const breakpoints = {
            mobile: 540,
            tablet: 840
        };

        function updateLayout() {
            const width = window.innerWidth;
            const isMobile = width <= breakpoints.mobile;
            const isTablet = width <= breakpoints.tablet && width > breakpoints.mobile;
            
            document.documentElement.classList.toggle('mobile', isMobile);
            document.documentElement.classList.toggle('tablet', isTablet);
            
            // レスポンシブ固有の処理
            if (isMobile) {
                updateMobileLayout();
            } else if (isTablet) {
                updateTabletLayout();
            } else {
                updateDesktopLayout();
            }
        }

        updateLayout();
        window.addEventListener('resize', debounce(updateLayout, 250));
    }

    // タイポグラフィの設定
    function setupTypography() {
        // 日本語フォントの動的読み込み確認
        const checkFonts = () => {
            const testElement = document.createElement('div');
            testElement.style.fontFamily = 'A1ゴシック R JIS2004';
            testElement.style.position = 'absolute';
            testElement.style.visibility = 'hidden';
            testElement.textContent = 'テスト';
            document.body.appendChild(testElement);
            
            setTimeout(() => {
                document.body.removeChild(testElement);
            }, 100);
        };

        checkFonts();
    }

    // スクロールアニメーション
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // 監視対象要素を追加
        const animateElements = document.querySelectorAll('.about-description, .contact-content, .section-title');
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // イベントハンドラー
    function handleInstagramClick(e) {
        e.preventDefault();
        // Instagram風のモーダル表示やリンク処理
        showNotification('Instagramページへのリンク機能は準備中です', 'info');
    }

    function handleIconHover(e) {
        e.target.style.transform = 'scale(1.1) rotate(5deg)';
    }

    function handleIconLeave(e) {
        e.target.style.transform = 'scale(1) rotate(0deg)';
    }

    function handleMenuClick(e) {
        e.preventDefault();
        // メニューモーダルの表示
        showModal('menu');
    }

    function handleCardHover(e) {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
    }

    function handleCardLeave(e) {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // パララックス効果
        if (elements.heroSection) {
            const parallaxSpeed = 0.5;
            elements.heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }

        // ヘッダーの透明度調整
        if (elements.header) {
            const opacity = Math.min(scrollY / 100, 0.95);
            elements.header.style.background = `rgba(255, 255, 255, ${opacity})`;
        }
    }

    function handleResize() {
        // リサイズ時の処理
        updateResponsiveElements();
    }

    // レスポンシブレイアウト更新関数
    function updateMobileLayout() {
        // モバイル固有の処理
        document.documentElement.style.setProperty('--mobile-spacing', '10px');
    }

    function updateTabletLayout() {
        // タブレット固有の処理
        document.documentElement.style.setProperty('--tablet-spacing', '15px');
    }

    function updateDesktopLayout() {
        // デスクトップ固有の処理
        document.documentElement.style.setProperty('--desktop-spacing', '30px');
    }

    function updateResponsiveElements() {
        // レスポンシブ要素の更新
        const width = window.innerWidth;
        
        elements.contentCards.forEach(card => {
            if (width <= 540) {
                card.style.marginBottom = '1rem';
            } else {
                card.style.marginBottom = '0';
            }
        });
    }

    // ユーティリティ関数
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

    function showModal(type) {
        // モーダル表示機能（簡易版）
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${type === 'menu' ? 'メニュー' : '情報'}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${type === 'menu' ? getMenuContent() : ''}
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            max-height: 70vh;
            overflow-y: auto;
        `;
        
        document.body.appendChild(modal);
        
        // 閉じるボタンのイベント
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    function getMenuContent() {
        return `
            <nav class="modal-nav">
                <ul>
                    <li><a href="#hero">トップ</a></li>
                    <li><a href="#visit">訪れる</a></li>
                    <li><a href="#live">暮らす</a></li>
                    <li><a href="#work">営む</a></li>
                    <li><a href="#about">岡温泉について</a></li>
                    <li><a href="#contact">お問い合わせ</a></li>
                </ul>
            </nav>
        `;
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'info' ? '#2196F3' : '#4CAF50'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // アニメーションCSS の追加
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .modal-nav ul {
                list-style: none;
                padding: 0;
            }
            
            .modal-nav li {
                margin: 1rem 0;
            }
            
            .modal-nav a {
                color: var(--primary-color, #d45506);
                text-decoration: none;
                font-size: 1.1rem;
                padding: 0.5rem 0;
                display: block;
                border-bottom: 1px solid #eee;
                transition: color 0.3s ease;
            }
            
            .modal-nav a:hover {
                color: var(--secondary-color, #333);
            }
        `;
        document.head.appendChild(style);
    }

    // サイト統計情報（のぼせる湯宿風）
    const siteStats = {
        visits: 0,
        pageViews: 0,
        lastVisit: null,
        init() {
            this.visits = parseInt(localStorage.getItem('oka-onsen-visits') || '0') + 1;
            this.pageViews = parseInt(localStorage.getItem('oka-onsen-pageviews') || '0') + 1;
            this.lastVisit = new Date().toISOString();
            
            localStorage.setItem('oka-onsen-visits', this.visits.toString());
            localStorage.setItem('oka-onsen-pageviews', this.pageViews.toString());
            localStorage.setItem('oka-onsen-last-visit', this.lastVisit);
        }
    };

    // DOMContentLoaded時の初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            addAnimationStyles();
            siteStats.init();
        });
    } else {
        init();
        addAnimationStyles();
        siteStats.init();
    }

    // グローバル関数として公開（デバッグ用）
    window.OkaOnsen = {
        siteData,
        elements,
        showModal,
        showNotification,
        stats: siteStats
    };

})();