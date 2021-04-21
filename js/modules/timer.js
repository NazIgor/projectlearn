function timer(deadline){
    // Timer

    const endDate = new Date(Date.parse(deadline)),
          month=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
          promoDescription=document.querySelector('.promotion__descr');
    
    month.forEach((item,i)=>{
    if (endDate.getMonth()==i){
        promoDescription.innerHTML=`
        <div class="promotion__descr">
            Мы ценим каждого клиента и предлагаем вам стать одним из них на очень выгодных условиях. 
            Каждому, кто закажет доставку питание на неделю, будет предоставлена скидка в размере <span>20%!</span>
            <br><br>
            Акция закончится ${endDate.getUTCDate()} ${item} в 00:00
         </div>
        `;
    }
    });
    

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}
export default timer;