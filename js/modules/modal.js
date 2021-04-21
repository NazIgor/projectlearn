function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector,modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
    if (modalTimerId){
        clearInterval(modalTimerId);
    }
}
export {closeModal};
export {openModal};

function modal(){
    //                                                              Modal ///////////////////////

    const modalTrigger = document.querySelector('.btn_dark'),
          modalTriggerWhite=document.querySelector('.btn_white'),
          modal = document.querySelector('.modal');

        modalTrigger.addEventListener('click', ()=>openModal('.modal'));
        modalTriggerWhite.addEventListener('click',()=>openModal('.modal'));



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close')=='') {
            closeModal('.modal');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal('.modal');
        }
    });

   const modalTimerId = setTimeout(()=>openModal('.modal',modalTimerId), 50000);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal('.modal');
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}
export default modal;