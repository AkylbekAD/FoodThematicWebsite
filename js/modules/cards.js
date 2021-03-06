import { getResource } from '../services/services';

function cards() {
  class MenuItem {
    //конструктор меню табов
    constructor(src, alt, title, descr, price, parent, ...classes) {
      this.src = src;
      this.title = title;
      this.alt = alt;
      this.descr = descr;
      this.price = price;
      this.transfer = 27;
      this.classes = classes;
      this.changeToRuble();
      this.parent = document.querySelector(parent);
      this.renderMenuItem();
    }

    changeToRuble() {
      //конвертация $ в рубли
      this.price = this.price * this.transfer;
    }

    renderMenuItem() {
      //рендер табов на страницу
      const NewMenuItem = document.createElement('div');
      if (this.classes.indexOf('menu__item') == -1) {
        //проверка и подставка класса 'menu__item'
        this.element = 'menu__item';
        NewMenuItem.classList.add(this.element);
      }
      this.classes.forEach((className) => NewMenuItem.classList.add(className)); // добавление частных классов через rest оператор если они присутствуют
      NewMenuItem.innerHTML = `
              <img src=${this.src} alt=${this.alt} />
              <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
              <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>`;
      this.parent.append(NewMenuItem); //определение куда встраивать в верстку
    }
  }

  getResource('http://localhost:3000/menu').then((data) => {
    //получение данных из БД
    data.forEach(({ img, alt, title, descr, price, parent }) => {
      // создание массива по свойствам
      new MenuItem(img, alt, title, descr, price, parent); // создание экзепляра через конструктор по свойствам и значениям
    });
  });
}

export default cards;
