/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
    
    // Calculator

    const result=document.querySelector('.calculating__result span');
    let sex='female',
        height,weight, age,
        ratio=1.375,
        activeSex=document.querySelector(`#${sex}`),
        activeRatio=document.querySelector('#small');
       

    function calcCall(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent='____';
        } else{
            if (sex=='male'){
                result.textContent=Math.round((88.36 + (13.4 *weight) + (4.8 *height) - (5.7 *age))*ratio);
            } else{
                result.textContent= Math.round((447.6 + (9.2 *weight) + (3.1 *height) - (4.3 *age))*ratio);
            }
        }
    }

    calcCall();

    function changeStaticInfo(parentSelector, activeClass){
        const elements=document.querySelectorAll(`${parentSelector} div`);
        elements.forEach(item=>{
            item.addEventListener('click',(e)=>{
                if (e.target.getAttribute('data-ratio')){
                    ratio=e.target.getAttribute('data-ratio');
                    e.target.classList.add(activeClass);
                    activeRatio.classList.remove(activeClass);
                    activeRatio=e.target;
                } else{
                    sex=e.target.getAttribute('id');
                    e.target.classList.add(activeClass);
                    activeSex.classList.remove(activeClass);
                    activeSex=e.target;
                }
                calcCall();
            });
        });

    }
    changeStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');
    changeStaticInfo('#gender','calculating__choose-item_active');

    changeDynomicInfo('height');
    changeDynomicInfo('weight');
    changeDynomicInfo('age');

    function changeDynomicInfo(selector){
        const input=document.querySelector(`#${selector}`);

        input.addEventListener('input',()=>{
            //height,weight, age,
            switch(selector){
                case 'height':
                    height=input.value;
                    break;
                case 'weight':
                    weight=input.value;
                    break;
                case 'age':
                    age=input.value;
                    break;
            }
            calcCall();
        });
    }
}
module.exports=calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
    //                                                       Используем классы для создание карточек меню
    async function getResource(url){
        const res=await fetch(url);
        if (!res.ok){
            throw new Error(`${url}, status:${res.status}`);
        }
        return await res.json();
    }
    // const getResource=async(url)=>{
    //     const res=await fetch(url);
    //     if (!res.ok){
    //         throw new Error(`${url}, status:${res.status}`);
    //     }
    //     return await res.json();
    // };
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes=classes;
            this.transfer = 430;
            this.changeToTG(); 
        }

        changeToTG() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');
             if (this.classes.length==0){element.classList.add('menu__item');} else {
                element.classList.add('menu__item'); 
                element.classList.add(this.classes); 
             }

            element.innerHTML = `                
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> тг/день</div>
                    </div>
                </div>
            `;
            
            this.parent.append(element);
        }
    }

    getResource('http://localhost:3000/menu')
    .then (data=>{
        data.forEach(({img,altimg,title,descr,price})=>{
            //item.forEach();
            new MenuCard(img,altimg,title,descr,price,'.menu .container').render();
        });
    });
}
module.exports=cards;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function forms(){
    //                                                         Форма обратной связи и отправка ///////////////////

    const forms=document.querySelectorAll('form'),
          messages={
              loading: 'img/spinner.svg',
              success: 'Дождался! скоро свяжемся, жди)',
              failure: 'Хрень какая-то.....'
          };


    forms.forEach(item=>{
        bindPostData(item);
    });
    
    const postData= async (url,data)=>{
        const res= await fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

        function bindPostData (form){
            form.addEventListener('submit',(e)=>{
            e.preventDefault();
           

            const loading=document.createElement('img');
            loading.src=messages.loading;
            loading.style.cssText=`
                display: block;
                margin: 0 auto;
            `;
            const formData=new FormData(form);
            form.insertAdjacentElement('afterend',loading);
    /////                                           create JSON ///////////////
            const json=JSON.stringify(Object.fromEntries(formData.entries()));
    ///                                              end creat JSON ////////////
            
            postData('http://localhost:3000/requests', json)
            .then(data=>{
                console.log(data);
                showStatusModal(messages.success); 
             })
            .catch(()=>{
                showStatusModal(messages.failure);
            }).finally(()=>{
                loading.remove();
                form.reset();
            });
        });
    }

    function showStatusModal(message){
        const modalWin=document.querySelector('.modal__dialog'),
              modalMessage=document.createElement('div'),
              modalInnerElements=modalWin.querySelector('.modal__content');
        modalInnerElements.classList.add('hide');
        modalMessage.classList.add('modal__dialog','modal__content', 'show');
        modalMessage.innerHTML=`
            <div>
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
            `;
            document.querySelector('.modal').append(modalMessage);
        openModal();
        
        setTimeout(clearStatus, 2500);

        function clearStatus(){
            modalInnerElements.classList.add('show');
            modalInnerElements.classList.remove('hide');
            modalMessage.remove();
            closeModal();
        }

    }
}
module.exports=forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
    //                                                              Modal ///////////////////////

    const modalTrigger = document.querySelector('.btn_dark'),
          modalTriggerWhite=document.querySelector('.btn_white'),
          modal = document.querySelector('.modal');

        modalTrigger.addEventListener('click', openModal);
        modalTriggerWhite.addEventListener('click',openModal);

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
 
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close')=='') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

   const modalTimerId = setTimeout(openModal, 50000);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}
module.exports=modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){
    ////                                                        slider ////////
    async function getResource(url){
        const res=await fetch(url);
        if (!res.ok){
            throw new Error(`${url}, status:${res.status}`);
        }
        return await res.json();
    }
    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }
    const btnPrev=document.querySelector('.offer__slider-prev'),
          btnNext=document.querySelector('.offer__slider-next'),
          btnPrevImg=document.createElement('img'),
          btnNextImg=document.createElement('img'),
          currentImg=document.querySelector('#current'),
          totalImg=document.querySelector('#total'),
          sliderWrapper=document.querySelector('.offer__slide'),
          slider=document.querySelector('.offer__slider'),
          container=document.createElement('div'),
          img=document.createElement('img'),
          width=window.getComputedStyle(sliderWrapper).width,
          indicators=document.createElement('ol');
          
    btnPrevImg.src='icons/left.svg';
    btnPrevImg.alt="prev";
    btnNextImg.src='icons/right.svg';
    btnNextImg.alt="next";

    btnPrev.innerHTML='';
    btnPrev.append(btnPrevImg);
    btnNext.innerHTML='';
    btnNext.append(btnNextImg);
    currentImg.textContent='01';
    totalImg.textContent='10';

    sliderWrapper.innerHTML='';
    sliderWrapper.append(container);
    sliderWrapper.style.overflow='hidden';

    container.style.display='flex';
    container.style.transition='0.5s all';

    slider.style.position='relative';
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
    

    let curImg=1, tImage,
        imgTotal=[], offset=0,
        activeIndicator, indData=[];
    getResource('http://localhost:3000/slider-img').then(data=>{
        tImage=data.length;
        totalImg.textContent=getZero(tImage);
        container.style.width=100*data.length+'%';
        data.forEach((item,i)=>{
            const dot=document.createElement('li');
            dot.classList.add('dot');
            dot.setAttribute('data-slide',i);
            indicators.append(dot);
            indData.push(dot);
            if (i==0) {               
                dot.style.opacity='1';
                activeIndicator=dot.getAttribute('data-slide');
            }
            imgTotal.push(item);
            container.innerHTML+=`
            <div class="offer__slide" style='width: ${width};'>
                <img src="${item.src}" alt="${item.altimg}">
            </div>
            `;
        });
    });
    indicators.addEventListener('click',(e)=>{
        
        if (e.target.getAttribute('data-slide')){
            indData[activeIndicator].style.opacity='0.5';
            activeIndicator=e.target.getAttribute('data-slide');
            indData[activeIndicator].style.opacity='1';

            offset=+width.slice(0, width.length-2)*activeIndicator;
            curImg=+activeIndicator+1;
            currentImg.textContent=getZero(curImg);

            container.style.transform=`translateX(-${offset}px)`;
        }
    });

    btnNext.addEventListener('click',()=>{
       if (offset== +width.replace(/\D/g,'')*(imgTotal.length-1)){
           offset=0;
           curImg=1;
       }else{
           offset+= +width.replace(/\D/g,'');
           curImg++;
       }
       renderSlider();
    });
    
    btnPrev.addEventListener('click',()=>{
        curImg--;
        if (curImg<1){
            offset=+width.replace(/\D/g,'')*(imgTotal.length-1);
            curImg=4;
        }else{
            offset-=+width.replace(/\D/g,'');            
        }
        renderSlider();
    });

    function renderSlider(){
        container.style.transform=`translateX(-${offset}px)`;
        currentImg.textContent=getZero(curImg);
        indData[activeIndicator].style.opacity='0.5';
        activeIndicator=curImg-1;
        indData[activeIndicator].style.opacity='1'; 
    }
}
module.exports=slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

    function tabs(){
         // Tabs
    
        let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', function(event) {
            const target = event.target;
            if(target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    }
module.exports = tabs;
   

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){
    // Timer
    const deadline = '2020-12-05';
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
module.exports=timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', function() {
    const calc=__webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          cards=__webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          form=__webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
          modal=__webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          slider=__webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          tabs=__webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer=__webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    tabs();
    cards();
    calc();
    form();
    modal();
    slider();   
    timer();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map