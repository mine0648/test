/*
 * サムネAI - YouTubeサムネイル生成ツール
 * Interactive JavaScript for modern thumbnail generation website
 * 
 * @version 1.0.0
 * @license MIT
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ サムネAI ウェブサイトが読み込まれました！');
    
    // ========================================
    // ナビゲーション機能
    // ========================================
    
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ハンバーガーメニュー（モバイル）
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューを閉じる
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // ナビゲーションのアクティブリンク更新
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
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
    // カテゴリフィルター機能
    // ========================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const exampleCards = document.querySelectorAll('.example-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブボタンの更新
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterCategory = this.getAttribute('data-category');
            
            // カードのフィルタリング
            exampleCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ========================================
    // スクロールアニメーション
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素
    const animatedElements = document.querySelectorAll(`
        .hero-content,
        .highlight-card,
        .example-card,
        .feature-card,
        .step-card,
        .pricing-card,
        .section-header
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ========================================
    // インタラクティブ要素
    // ========================================
    
    // ボタンのクリックエフェクト
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .plan-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // リップル効果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
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
    // 使い方セクションのインタラクション
    // ========================================
    
    const stepCards = document.querySelectorAll('.step-card');
    const styleOptions = document.querySelectorAll('.style-option');
    
    // ステップカードのホバー効果
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // スタイルオプションの選択
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            styleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // 選択フィードバック
            showToast(`${this.textContent} スタイルが選択されました！`);
        });
    });
    
    // ========================================
    // フローティング要素
    // ========================================
    
    // パーティクルアニメーション
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #8b5cf6, #3b82f6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: float 8s infinite ease-in-out;
            left: ${Math.random() * 100}vw;
            top: 100vh;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }
    
    // 定期的にパーティクルを生成
    setInterval(createFloatingParticle, 2000);
    
    // ========================================
    // 料金カードのインタラクション
    // ========================================
    
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // ========================================
    // モーダル機能
    // ========================================
    
    function createModal(title, content, actionText = 'OK') {
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <h3>${title}</h3>
                    <p>${content}</p>
                    <div class="modal-actions">
                        <button class="btn-primary modal-ok">${actionText}</button>
                        <button class="btn-secondary modal-cancel">キャンセル</button>
                    </div>
                </div>
            </div>
        `;
        
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
            animation: fadeIn 0.3s ease-out;
        `;
        
        const overlay = modal.querySelector('.modal-overlay');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        `;
        
        const content_el = modal.querySelector('.modal-content');
        content_el.style.cssText = `
            position: relative;
            background: var(--slate-900);
            color: var(--slate-100);
            padding: 2rem;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
            animation: slideInUp 0.3s ease-out;
            text-align: center;
        `;
        
        document.body.appendChild(modal);
        
        // イベントリスナー
        modal.querySelector('.modal-ok').addEventListener('click', () => modal.remove());
        modal.querySelector('.modal-cancel').addEventListener('click', () => modal.remove());
        overlay.addEventListener('click', () => modal.remove());
        
        return modal;
    }
    
    // プランボタンのクリックイベント
    document.querySelectorAll('.plan-button').forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.pricing-card').querySelector('h3').textContent;
            createModal(
                `${planName}プランを選択`,
                `${planName}プランにご登録いただきありがとうございます！\n詳細な登録手順をメールでお送りします。`,
                '確認'
            );
        });
    });
    
    // ========================================
    // トースト通知システム
    // ========================================
    
    function showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #8b5cf6, #3b82f6);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 50px;
            box-shadow: 0 8px 30px rgba(139, 92, 246, 0.3);
            z-index: 10001;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            font-size: 0.9rem;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    // ========================================
    // キーボードショートカット
    // ========================================
    
    document.addEventListener('keydown', function(e) {
        // Alt + G でジェネレーター開始
        if (e.altKey && e.key === 'g') {
            e.preventDefault();
            showToast('🎨 サムネイル生成機能は開発中です！');
        }
        
        // Alt + P で価格表示
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // ========================================
    // パフォーマンス最適化
    // ========================================
    
    // 画像の遅延読み込み
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========================================
    // CSS アニメーション追加
    // ========================================
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from { 
                opacity: 0; 
                transform: translateY(30px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
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
        
        @keyframes float {
            0% { 
                transform: translateY(0) rotate(0deg); 
                opacity: 1; 
            }
            50% { 
                transform: translateY(-50vh) rotate(180deg); 
                opacity: 0.8; 
            }
            100% { 
                transform: translateY(-100vh) rotate(360deg); 
                opacity: 0; 
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding: 1rem 0;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            
            .nav-menu.active .nav-item {
                margin: 0.5rem 0;
            }
            
            .nav-menu.active .nav-link {
                padding: 0.75rem 1.5rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // ========================================
    // 初期化完了
    // ========================================
    
    // ウェルカムメッセージ
    setTimeout(() => {
        if (!localStorage.getItem('thumbnailai-visited')) {
            showToast('✨ サムネAIへようこそ！高品質なサムネイルを簡単に作成できます。', 4000);
            localStorage.setItem('thumbnailai-visited', 'true');
        }
    }, 1000);
    
    console.log('🎉 サムネAI のJavaScriptが完全に読み込まれました！');
    console.log('💡 ショートカット: Alt+G でジェネレーター、Alt+P で価格表示');
});