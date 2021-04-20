window.addEventListener('DOMContentLoaded', function() {
    const calc=require('./modules/calc'),
          cards=require('./modules/cards'),
          form=require('./modules/form'),
          modal=require('./modules/modal'),
          slider=require('./modules/slider'),
          tabs=require('./modules/tabs'),
          timer=require('./modules/timer');

    tabs();
    cards();
    calc();
    form();
    modal();
    slider();   
    timer();

});