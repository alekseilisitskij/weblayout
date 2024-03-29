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

document.querySelectorAll(".dropdown__simplebar").forEach(dropdown => {
  new SimpleBar(dropdown, {
  /* чтобы изначально ползунок был виден */
  autoHide: false,
  /* с помощью этого значения вы можете управлять высотой ползунка*/
  scrollbarMaxSize: 25,
});
})


const btns = document.querySelectorAll(".header__menu");
const dropdowns = document.querySelectorAll(".dropdown");
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";

btns.forEach(item => {
  item.addEventListener("click", function() {
    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns)
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);
  })
});

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

const swiper = new Swiper('.hero__swiper', {
  // Цикличность
  autoplay: true,
  autoplaySpeed: 2000,
  loop: true,
  a11y: {
      paginationBulletMessage: 'Тут название слайда {{index}}',
  }
});


const element = document.querySelector(".js-choice")

const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: ""
});


document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery__right .test-pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".test-next",
      prevEl: ".test-prev"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        slidesPerGroup:2,
        spaceBetween: 34
      },

      1620: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }

    // on: {
    //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
    //   beforeResize: function () {
    //     this.slides.forEach((el) => {
    //       el.style.marginTop = "";
    //     });
    //   }
    // }
  });
});


// Это один из возможных вариантов использования. Ссылка на github плагина https://github.com/michu2k/Accordion

// ВАЖНО!!! Этот пример аккордеона работает с версией плагина  3.1.1. Вот она: https://unpkg.com/accordion-js@3.1.1/dist/accordion.min.js

(() => {
  new Accordion(".js-accordion-container", {
    openOnInit: [0]
  });
})();


// Табы
const params = {
  tabsClass: "js-tab-btn",
  wrap: "js-tabs-wrap",
  content: "js-tab-content",
  active: "active"
};

function setTabs(params) {
  const tabBtns = document.querySelectorAll(`.${params.tabsClass}`);

  function onTabClick(e) {
    e.preventDefault();
    const path = this.dataset.path;
    const wrap = this.closest(`.${params.wrap}`);
    const currentContent = wrap.querySelector(`.${params.content}[data-target="${path}"]`);
    const contents = wrap.querySelectorAll(`.${params.content}`);

    contents.forEach((el) => {
      el.classList.remove(params.active);
    });

    currentContent.classList.add(params.active);

    tabBtns.forEach((el) => {
      el.classList.remove(params.active);
    });

    this.classList.add(params.active);
  }

  tabBtns.forEach(function (el) {
    el.addEventListener("click", onTabClick);
  });
}

setTabs(params);

// События
const swipe = new Swiper('.event-swiper', {
  slidesPerView:3,
  spaceBetween: 50,
  navigation: {
    nextEl: '.event-button-next',
    prevEl: '.event-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  breakpoints: {
    320: {
      slidesPerView: 1
    },

    767: {
      slidesPerView: 2,
      spaceBetween: 38
    },

    1023: {
      slidesPerView: 3,
      spaceBetween: 27
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 50
    }

}
});

tippy('[data-tippy-content]');

const swip = new Swiper('.project__swiper', {
  slidesPerView: 3,
  spaceBetween: 50,
  navigation: {
    nextEl: '.project-button-next',
    prevEl: '.project-button-prev',
  },
  breakpoints: {

    320: {
      slidesPerView: 1
    },

    576: {
      slidesPerView: 1,
    },

    767: {
      slidesPerView: 2,
      spaceBetween: 27
    },

    1200: {
      slidesPerView: 2,
      spaceBetween: 50
    },

    1600: {
      slidesPerView: 3,
      spaceBetween: 50
    }

}
});

document.addEventListener("DOMContentLoaded", function () {
  const validation = new JustValidate('.form');
  const selector = document.querySelector("input[type='tel']");
  const im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  validation
    .addField('.name', [{
        rule: 'minLength',
        value: 3,
        errorMessage: "Не достаточное количество символов"
      },
      {
        rule: 'maxLength',
        value: 5,
        errorMessage: "Вы ввели больше чем положено"
      }
    ])

    .addField('.tel', [{
      rule: "function",
      validator: function (name, value) {
        const phone = selector.inputmask.unmaskedvalue();
        return phone.length === 10
      },
      errorMessage: 'Недопустимый формат',
    }]);
});

// map
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var geolocationControl = new ymaps.control.GeolocationControl({
          options: {
              float: 'none',
              position: {
                top: '360px',
                right: '30px'
            }
          }
      })
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.76005446645666,37.61420121268361],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 17,
            controls: [geolocationControl]
        });
      // Создание геообъекта с типом точка (метка).
      var myGeoObject = new ymaps.GeoObject({
          geometry: {
              type: "Point", // тип геометрии - точка
              // coordinates: [48.872185, 2.35] // координаты точки
          }
      });

      var myPlacemark = new ymaps.Placemark([55.76005446645666,37.61420121268361], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/Ellipse.png',
        iconImageSize: [20, 20],
        iconImageOffset: [-3, -42]
    });

      // Размещение геообъекта на карте.
      myMap.controls.add('zoomControl', {
        size: 'medium',
        float: 'none',
        position: {
            bottom: '350px',
            right: '30px'
        }
    });
      myMap.geoObjects.add(myGeoObject);
      myMap.geoObjects.add(myPlacemark);
      myMap.controls.remove('searchControl');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('typeSelector');
      myMap.behaviors.disable('scrollZoom');
    }
