// メニュー開閉
const menuBtn = document.querySelector('.js-modal-toggle');
const nav = document.querySelector('.g-header__nav');
if(menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}
// スクロール時のヘッダー影
window.addEventListener('scroll', () => {
  const header = document.querySelector('.g-header');
  if(window.scrollY > 10) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}); 