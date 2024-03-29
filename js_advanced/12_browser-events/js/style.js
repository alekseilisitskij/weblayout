const scrollToTopButton = document.querySelector('.scroll-button');


window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
}, { passive: true });


scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
