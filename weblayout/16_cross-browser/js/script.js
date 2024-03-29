let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = document.querySelectorAll('.nav__link');

burger.addEventListener('click', function() {
  burger.classList.toggle('burger--active');

  menu.classList.toggle('header__nav--active');

  document.body.classList.toggle('stop-scroll');
});

menuLinks.forEach(function(el){
  el.addEventListener('click', function() {
    burger.classList.remove('burger--active');

    menu.classList.remove('header__nav--active');

    document.body.classList.remove('stop-scroll');
  });
});

// Табы
let tabsBtn = document.querySelectorAll('.work__btn');
let tabsItem = document.querySelectorAll('.work__block');

tabsBtn.forEach(function(element) {
 element.addEventListener('click', function(e) {
  const path = e.currentTarget.dataset.path;

  tabsBtn.forEach(function(btn){
    btn.classList.remove('work__btn--active');
    });
    e.currentTarget.classList.add('work__btn--active');

  tabsItem.forEach(function(element) { element.classList.remove('work__block--active');});
  document.querySelector(`[data-target="${path}"]`).classList.add('work__block--active');
 });
});

//слайдер

const swiper = new Swiper('.swiper-container', {
  // Цикличность
  loop: true,
  // Пагинация
  pagination: {
      el: '.swiper-pagination',
      clickable: true
  },
  a11y: {
      prevSlideMessage: 'Предыдущиый слайд',
      nextSlideMessage: 'Следующий слайд',
      lastSlideMessage: 'Это последний слайд',
      firstSlideMessage: 'Это первый слайд',
      paginationBulletMessage: 'Слайд номер {{index}}',
  }
});

new Accordion('.accordion-container');


function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener('click', function(evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener('click', function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close-search", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});
