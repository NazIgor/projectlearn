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