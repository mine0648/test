// メニュー開閉
const trigger = document.getElementById('trigger');
const nav = document.getElementById('main-nav');
if(trigger && nav) {
  trigger.addEventListener('click', () => {
    nav.classList.toggle('hide');
  });
}
// 年表開閉
const chronicleToggle = document.getElementById('chronicle-toggle');
const chronicleDetail = document.getElementById('chronicle_detail');
if(chronicleToggle && chronicleDetail) {
  chronicleToggle.addEventListener('click', () => {
    if(chronicleDetail.style.display === 'none' || chronicleDetail.style.display === '') {
      chronicleDetail.style.display = 'block';
      chronicleToggle.querySelector('.open').style.display = 'none';
      chronicleToggle.querySelector('.close').style.display = 'inline';
    } else {
      chronicleDetail.style.display = 'none';
      chronicleToggle.querySelector('.open').style.display = 'inline';
      chronicleToggle.querySelector('.close').style.display = 'none';
    }
  });
}
// ラインアップカテゴリ切替（ダミー）
const lineupCats = document.querySelectorAll('#lineup_category li');
if(lineupCats.length) {
  lineupCats.forEach(cat => {
    cat.addEventListener('click', () => {
      lineupCats.forEach(c => c.classList.remove('current'));
      cat.classList.add('current');
      // 本家は商品リスト切替、ここでは見た目のみ
    });
  });
}
// スクロール時のヘッダー影
window.addEventListener('scroll', () => {
  const header = document.querySelector('.sticky');
  if(window.scrollY > 10) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}); 