async function getResource(url){
    const res=await fetch(url);
    if (!res.ok){
        throw new Error(`${url}, status:${res.status}`);
    }
    return await res.json();
}


function cards(){
    //                                                       Используем классы для создание карточек меню


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
export default cards;