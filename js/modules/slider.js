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