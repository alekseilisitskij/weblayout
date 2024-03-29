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


let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__list');
let menuLinks = document.querySelectorAll('.header__link');

burger.addEventListener('click', function() {
  burger.classList.toggle('burger--active');

  menu.classList.toggle('header__list--active');

  document.body.classList.toggle('stop-scroll');
});

menuLinks.forEach(function(el){
  el.addEventListener('click', function() {
    burger.classList.remove('burger--active');

    menu.classList.remove('header__list--active');

    document.body.classList.remove('stop-scroll');
  });
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

    // forms

document.addEventListener("DOMContentLoaded", function () {
  const validation = new JustValidate('.contacts__form');
  const selector = document.querySelector("input[type='tel']");
  const im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  validation
    .addField('.contacts__form-name', [{
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
    .addField('contacts__form-email', [{
        rule: 'required',
        errorMessage: 'Поле нужно заполнить',
      },
      {
        rule: 'email',
        errorMessage: 'Вы не корректно ввели email',
      }
    ])
    .addField('.contacts__form-textarea', [{
      rule: "function",
      validator: function (name, value) {
        const phone = selector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Не достаточное количество символов в строке',
    }]);
});
