const scrolling = (upSelector) => { //Функция принимает параметр upSelector, который предположительно содержит селектор элемента "вверх" на странице.
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    }); //Здесь устанавливается слушатель события прокрутки окна. Если прокрученная высота страницы (document.documentElement.scrollTop) превышает 1650 пикселей, то элемент "вверх" получает классы 'animated' и 'fadeIn', и удаляет класс 'fadeOut'. В противном случае он получает класс 'fadeOut' и удаляет класс 'fadeIn'. Это, вероятно, связано с анимацией прокрутки вверх.

    // Scrolling with raf

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });


    // Pure js scrolling

    const element = document.documentElement,
          body = document.body;//Эти переменные используются для определения высоты страницы и прокрутки.

    const calcScroll = () => { 
        upElem.addEventListener('click', function(event) {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop); //Создается переменная scrollTop, которая содержит значение прокрутки страницы в момент клика. Это значение округляется до целого числа.

            if (this.hash !== '') { //Проверяется, есть ли у элемента, по которому был клик, хэш (якорь) в свойстве hash. Если хэш не пустой, выполняются следующие действия.
                event.preventDefault();
                let hashElement = document.querySelector(this.hash), //Находится элемент на странице, соответствующий хэшу, указанному в атрибуте href элемента, по которому произошел клик.
                    hashElementTop = 0;//Инициализируется переменная hashElementTop, которая будет содержать суммарное смещение относительно верхнего края документа для элемента с указанным хэшем.

                while (hashElement.offsetParent) { //В цикле проходится вверх по иерархии родительских элементов до корневого элемента, прибавляя смещение относительно верхнего края документа к переменной hashElementTop.
                    hashElementTop += hashElement.offsetTop;
                    hashElement = hashElement.offsetParent;
                }

                hashElementTop = Math.round(hashElementTop); //Завершается цикл, и окончательное значение hashElementTop округляется до целого числа.
                smoothScroll(scrollTop, hashElementTop, this.hash); //Вызывается функция smoothScroll с передачей текущей прокрутки страницы (scrollTop), смещения целевого элемента (hashElementTop), и хэша для обновления адресной строки после плавной прокрутки.
            }
        });
    };//Эта функция устанавливает слушатель события клика на элемент "вверх". При клике она определяет текущую прокрутку страницы и выполняет плавную прокрутку к цели (определенной хэшем в адресной строке).

    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1, //Создаются переменные timeInterval (интервал времени между каждым шагом прокрутки), prevScrollTop (предыдущее значение прокрутки) и speed (скорость прокрутки).
            prevScrollTop,
            speed;

        if (to > from) {
            speed = 30;
        } else {
            speed = -30;
        } //Определяется направление прокрутки: если целевая точка (to) больше текущей прокрутки (from), устанавливается положительная скорость, иначе - отрицательная.
        
        let move = setInterval(function() { //Устанавливается интервальный таймер (setInterval), который будет выполняться каждый timeInterval миллисекунд
            let scrollTop = Math.round(body.scrollTop || element.scrollTop); //Получается текущее значение прокрутки страницы.

            if ( //Проверяется, достигнута ли целевая точка или прокрутка больше не происходит. Если условие выполнено, интервальный таймер очищается, и происходит замена адресной строки с использованием history.replaceState для обновления хэша в адресе.
                prevScrollTop === scrollTop ||
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move);//Очищается интервальный таймер, чтобы прекратить выполнение плавной прокрутки.
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash); //Заменяется состояние истории браузера, обновляя URL без якоря (hash), а затем добавляется новый хэш
            } else {
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = scrollTop;
            } //Если целевая точка еще не достигнута, выполняется следующий шаг плавной прокрутки. Прокручиваются body и element на значение speed, а также обновляется prevScrollTop для следующей итерации.
        }, timeInterval);
    }; //Эта функция выполняет сам процесс плавной прокрутки от точки from до точки to. Она использует интервальный таймер для пошагового изменения прокрутки.

    calcScroll();
};

export default scrolling;