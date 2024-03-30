const timer = (id, deadline) => {
    const getTimeRemaining = (endTime) => {
        const t = Date.parse(endTime) - Date.parse(new Date()),
              seconds = Math.floor((t/1000) % 60),
              minutes = Math.floor((t/1000/60) % 60),
              hours = Math.floor((t/(1000 * 60 * 60)) % 24),
              days = Math.floor((t/(1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endtime) => {
        
        const addZero = (num) => {
            if(num <= 9) {
                return '0' + num;
            } else {
                return num;
            }
        }
        
        const timer = document.querySelector(selector),
              seconds = timer.querySelector('#seconds'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              days = timer.querySelector('#days'),
              timeInterval = setInterval(updateClock, 1000);
              
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = addZero(t.days);
            minutes.textContent = addZero(t.minutes);
            hours.textContent  = addZero(t.hours);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0) {
                days.textContent = '00';
                minutes.textContent = '00';
                hours.textContent  = '00';
                seconds.textContent = '00';

            clearInterval(timeInterval);
            }
        }
    };

    setClock(id, deadline)
}

export default timer;