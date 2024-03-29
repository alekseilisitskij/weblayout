// selector
const element = document.querySelector('select');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
	shouldSort: false,
	position: 'bottom'
});

// map
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [48.872185, 2.354224],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 17
        });
      // Создание геообъекта с типом точка (метка).
      var myGeoObject = new ymaps.GeoObject({
          geometry: {
              type: "Point", // тип геометрии - точка
              // coordinates: [48.872185, 2.35] // координаты точки
          }
      });

      var myPlacemark = new ymaps.Placemark([48.872185, 2.354224], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/subtract.png',
        iconImageSize: [30, 42],
        iconImageOffset: [-3, -42]
    });

      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myGeoObject);
      myMap.geoObjects.add(myPlacemark);
    }

    // scroll

new SimpleBar(document.getElementById('customScroll'), {
  autoHide: false,
  scrollbarMinSize: 25,
  scrollbarMaxSize: 75
});

// forms

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
    .addField('.mail', [{
        rule: 'required',
        errorMessage: 'Поле нужно заполнить',
      },
      {
        rule: 'email',
        errorMessage: 'Вы не корректно ввели email',
      }
    ])
    .addField('.tel', [{
      rule: "function",
      validator: function (name, value) {
        const phone = selector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Не достаточное количество символов в строке',
    }]);
});

tippy('[data-tippy-content]');









