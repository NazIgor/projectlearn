import {postData} from '../services/services';
import {closeModal} from './modal';
import {openModal} from './modal';

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
        openModal('.modal');
        
        setTimeout(clearStatus, 2500);

        function clearStatus(){
            modalInnerElements.classList.add('show');
            modalInnerElements.classList.remove('hide');
            modalMessage.remove();
            closeModal('.modal');
        }

    }
}
export default forms;