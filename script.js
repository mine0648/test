/*!
 * 相川動物園 - インタラクティブ JavaScript
 * 動物園サイト用の楽しく魅力的な機能
 * 
 * @author Claude Code
 * @version 2.0.0
 * @license MIT
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🦁 相川動物園のウェブサイトへようこそ！ 🦒');
    
    // ========================================
    // ナビゲーション機能
    // ========================================
    
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // スクロール時のナビゲーション効果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(46, 125, 50, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(46, 125, 50, 0.1)';
        }
    });
    
    // ハンバーガーメニューの機能（モバイル用）
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
                entry.target.classList.add('fade-in');
                
                // 統計数字のカウントアニメーション
                if (entry.target.classList.contains('stat')) {
                    animateNumbers(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // アニメーションを適用する要素を観察
    const animatedElements = document.querySelectorAll(`
        .animal-card, .experience-card, .event-card, .info-card,
        .welcome-text, .welcome-image, .stat, .access-card, .contact-card
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ========================================
    // 数字カウントアニメーション
    // ========================================
    
    function animateNumbers(element) {
        const numberElement = element.querySelector('h3');
        if (!numberElement) return;
        
        const text = numberElement.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        if (isNaN(number)) return;
        
        const suffix = text.replace(/[\d]/g, '');
        const duration = 2000;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // イージング関数（ease-out）
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(number * easeOut);
            
            numberElement.textContent = currentNumber + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // ========================================
    // 動物カード インタラクション
    // ========================================
    
    const animalCards = document.querySelectorAll('.animal-card');
    
    animalCards.forEach(card => {
        // ホバーエフェクト強化
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // 動物の鳴き声シミュレーション（サウンドエフェクト風）
            const animalName = this.querySelector('.animal-overlay h3').textContent;
            showAnimalFact(animalName);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            hideAnimalFact();
        });
        
        // クリックで詳細情報表示
        card.addEventListener('click', function() {
            const animalName = this.querySelector('.animal-overlay h3').textContent;
            showAnimalDetails(animalName, this);
        });
    });
    
    // 動物の豆知識表示
    function showAnimalFact(animalName) {
        const facts = {
            'ライオン': '🦁 ライオンは1日に20時間も寝ます！',
            'アジアゾウ': '🐘 ゾウは仲間の死を悼むことで知られています',
            'キリン': '🦒 キリンの舌は最大50cmまで伸びます！',
            'ペンギン': '🐧 ペンギンは時速40kmで泳げます',
            'パンダ': '🐼 パンダは1日に12-16時間食事をします',
            'ニホンザル': '🐵 サルは温泉に入る習性があります'
        };
        
        const fact = facts[animalName];
        if (fact) {
            showToast(fact);
        }
    }
    
    function hideAnimalFact() {
        // 必要に応じて豆知識を非表示
    }
    
    // ========================================
    // 動物詳細モーダル
    // ========================================
    
    function showAnimalDetails(animalName, cardElement) {
        const animalData = {
            'ライオン': {
                name: 'アフリカライオン',
                habitat: 'アフリカのサバンナ',
                diet: '肉食（主にシマウマ、ガゼルなど）',
                lifespan: '野生：10-14年、飼育下：20年以上',
                funFact: 'ライオンの鳴き声は8km先まで届きます！',
                image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            'アジアゾウ': {
                name: 'アジアゾウ',
                habitat: 'アジアの森林と草原',
                diet: '草食（草、果物、樹皮など）',
                lifespan: '野生：60-70年、飼育下：80年以上',
                funFact: 'ゾウは自分の名前を覚えて反応します！',
                image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            'キリン': {
                name: 'アミメキリン',
                habitat: 'アフリカのサバンナ',
                diet: '草食（主にアカシアの葉）',
                lifespan: '野生：20-25年、飼育下：28年',
                funFact: 'キリンの血圧は人間の3倍もあります！',
                image: 'https://images.unsplash.com/photo-1551961750-00d3d4d31f0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            }
        };
        
        const data = animalData[animalName];
        if (data) {
            createDetailModal(data);
        }
    }
    
    function createDetailModal(data) {
        // 既存のモーダルを削除
        const existingModal = document.querySelector('.animal-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'animal-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">×</button>
                    <div class="modal-image">
                        <img src="${data.image}" alt="${data.name}" loading="lazy">
                    </div>
                    <div class="modal-info">
                        <h2>${data.name}</h2>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <strong>🏠 生息地:</strong> ${data.habitat}
                            </div>
                            <div class="detail-item">
                                <strong>🍽️ 食事:</strong> ${data.diet}
                            </div>
                            <div class="detail-item">
                                <strong>⏰ 寿命:</strong> ${data.lifespan}
                            </div>
                        </div>
                        <div class="fun-fact">
                            <h3>🎉 面白い事実</h3>
                            <p>${data.funFact}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // モーダルスタイル
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
            backdrop-filter: blur(5px);
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            position: relative;
            background: white;
            border-radius: 20px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(46, 125, 50, 0.3);
            animation: slideInUp 0.3s ease-out;
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 30px;
            color: #666;
            cursor: pointer;
            z-index: 1;
            transition: all 0.3s ease;
        `;
        
        const modalImage = modal.querySelector('.modal-image');
        modalImage.style.cssText = `
            height: 250px;
            overflow: hidden;
            border-radius: 20px 20px 0 0;
        `;
        
        const img = modal.querySelector('.modal-image img');
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
        `;
        
        const modalInfo = modal.querySelector('.modal-info');
        modalInfo.style.cssText = `
            padding: 2rem;
        `;
        
        document.body.appendChild(modal);
        
        // イベントリスナー
        closeBtn.addEventListener('click', () => modal.remove());
        overlay.addEventListener('click', () => modal.remove());
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = '#2E7D32';
            closeBtn.style.transform = 'scale(1.1)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = '#666';
            closeBtn.style.transform = 'scale(1)';
        });
    }
    
    // ========================================
    // 体験プログラム予約システム
    // ========================================
    
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            const experienceName = this.querySelector('h3').textContent;
            const price = this.querySelector('.price').textContent;
            const time = this.querySelector('.time').textContent;
            
            showBookingModal(experienceName, price, time);
        });
        
        // ホバーエフェクト
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    function showBookingModal(experienceName, price, time) {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="booking-overlay">
                <div class="booking-content">
                    <h2>🎫 ${experienceName}の予約</h2>
                    <div class="booking-details">
                        <p><strong>体験名:</strong> ${experienceName}</p>
                        <p><strong>料金:</strong> ${price}</p>
                        <p><strong>時間:</strong> ${time}</p>
                    </div>
                    <form class="booking-form">
                        <div class="form-group">
                            <label>お名前:</label>
                            <input type="text" required placeholder="山田太郎">
                        </div>
                        <div class="form-group">
                            <label>人数:</label>
                            <select required>
                                <option value="">選択してください</option>
                                <option value="1">1名</option>
                                <option value="2">2名</option>
                                <option value="3">3名</option>
                                <option value="4">4名以上</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>希望日:</label>
                            <input type="date" required min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="btn-confirm">予約する</button>
                            <button type="button" class="btn-cancel">キャンセル</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // スタイリング
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
        
        const overlay = modal.querySelector('.booking-overlay');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        `;
        
        const content = modal.querySelector('.booking-content');
        content.style.cssText = `
            position: relative;
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(46, 125, 50, 0.3);
            animation: slideInUp 0.3s ease-out;
        `;
        
        document.body.appendChild(modal);
        
        // フォーム送信処理
        const form = modal.querySelector('.booking-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessMessage(experienceName);
            modal.remove();
        });
        
        // キャンセルボタン
        modal.querySelector('.btn-cancel').addEventListener('click', () => modal.remove());
        overlay.addEventListener('click', () => modal.remove());
    }
    
    function showSuccessMessage(experienceName) {
        showToast(`🎉 ${experienceName}の予約が完了しました！詳細はメールでお送りします。`, 5000);
    }
    
    // ========================================
    // トースト通知システム
    // ========================================
    
    function showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #2E7D32, #4CAF50);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 50px;
            box-shadow: 0 8px 30px rgba(46, 125, 50, 0.3);
            z-index: 10001;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            font-size: 0.9rem;
            line-height: 1.4;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    // ========================================
    // 天気ウィジェット
    // ========================================
    
    function initWeatherWidget() {
        const weather = {
            icon: '☀️',
            temp: '25°C',
            description: '晴れ - 動物園日和です！',
            humidity: '60%',
            wind: '微風'
        };
        
        const widget = document.createElement('div');
        widget.className = 'weather-widget';
        widget.innerHTML = `
            <div class="weather-content">
                <div class="weather-icon">${weather.icon}</div>
                <div class="weather-info">
                    <div class="weather-temp">${weather.temp}</div>
                    <div class="weather-desc">${weather.description}</div>
                </div>
            </div>
        `;
        
        widget.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            padding: 1rem;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(46, 125, 50, 0.1);
            z-index: 1000;
            display: none;
            min-width: 200px;
            animation: slideInLeft 0.3s ease-out;
        `;
        
        document.body.appendChild(widget);
        
        // スクロール時に表示/非表示
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight / 2) {
                widget.style.display = 'block';
            } else {
                widget.style.display = 'none';
            }
        });
    }
    
    // ========================================
    // 季節のイベント通知
    // ========================================
    
    function checkSeasonalEvents() {
        const now = new Date();
        const month = now.getMonth() + 1;
        
        let eventMessage = '';
        
        if (month >= 7 && month <= 8) {
            eventMessage = '🌻 夏の動物園祭り開催中！夜の動物園見学もお楽しみください。';
        } else if (month >= 9 && month <= 11) {
            eventMessage = '🍂 秋の動物フォトコンテスト開催中！美しい紅葉と動物たちの写真を撮影しよう。';
        } else if (month === 12) {
            eventMessage = '🎄 クリスマス特別イベント開催中！園内がクリスマス装飾で彩られています。';
        } else if (month >= 3 && month <= 5) {
            eventMessage = '🌸 春の動物園へようこそ！新緑の季節、動物たちも活発に動いています。';
        }
        
        if (eventMessage) {
            setTimeout(() => {
                showToast(eventMessage, 6000);
            }, 2000);
        }
    }
    
    // ========================================
    // イースターエッグ - 動物の足跡
    // ========================================
    
    let animalTrailMode = false;
    const animalEmojis = ['🐾', '🦁', '🐘', '🦒', '🐧', '🐼', '🐵', '🦓', '🦏', '🦘'];
    
    // Ctrl+Shift+Z で動物の足跡モード切り替え
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
            animalTrailMode = !animalTrailMode;
            showToast(animalTrailMode ? '🐾 動物の足跡モード ON!' : '動物の足跡モード OFF', 2000);
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (animalTrailMode) {
            createAnimalTrail(e.clientX, e.clientY);
        }
    });
    
    function createAnimalTrail(x, y) {
        const trail = document.createElement('span');
        const randomEmoji = animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
        trail.textContent = randomEmoji;
        
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 9999;
            animation: trailFade 3s ease-out forwards;
            transform: translateX(-50%) translateY(-50%);
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 3000);
    }
    
    // ========================================
    // CSS アニメーション定義
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
        
        @keyframes slideInLeft {
            from { 
                opacity: 0; 
                transform: translateX(-100%); 
            }
            to { 
                opacity: 1; 
                transform: translateX(0); 
            }
        }
        
        @keyframes trailFade {
            0% { 
                opacity: 1; 
                transform: translateX(-50%) translateY(-50%) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateX(-50%) translateY(-50%) scale(0.5) rotate(180deg); 
            }
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
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                box-shadow: 0 4px 20px rgba(46, 125, 50, 0.15);
                padding: 1rem 0;
            }
            
            .nav-menu.active .nav-item {
                margin: 0.5rem 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // ========================================
    // 初期化
    // ========================================
    
    // 天気ウィジェット初期化
    initWeatherWidget();
    
    // 季節イベント確認
    checkSeasonalEvents();
    
    // 画像の遅延読み込み
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ページ読み込み完了メッセージ
    console.log('🎉 相川動物園のウェブサイトが完全に読み込まれました！');
    console.log('💡 隠し機能: Ctrl+Shift+Z で動物の足跡モードを切り替えられます！');
    
    // ウェルカムメッセージ（初回訪問時のみ）
    if (!localStorage.getItem('aikawa-zoo-visited')) {
        setTimeout(() => {
            showToast('🦁 相川動物園へようこそ！動物たちがお待ちしています。', 4000);
            localStorage.setItem('aikawa-zoo-visited', 'true');
        }, 1000);
    }
});