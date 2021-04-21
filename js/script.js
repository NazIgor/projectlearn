import calc from './modules/calc';
import cards from './modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', function() {


    tabs();
    cards();
    calc();
    form();
    modal();
    slider();   
    timer('2021-08-05');

});