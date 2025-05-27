import serviceGoods from "../service/serviceGoods.js";
import {getStorage} from "../service/serviceStorage.js";
import {LS_FAV_KEY} from "./const.js";

const createCard = (item) => {
  const allFavorites = getStorage(LS_FAV_KEY);

  const li = document.createElement('li');
  li.className = 'goods__item';
  li.insertAdjacentHTML('beforeend', `
    <article class="item">
      <img 
        class="item__img"
        src="${item.image}" 
        alt="${item.title}" 
        title="${item.title}" 
        width="280"
        height="330"
      >
      <button class="item__favorite-btn${allFavorites.includes(item.id) ? ' active' : ''}" data-id="${item.id}">
        <svg width="28" height="24">
          <use xlink:href="#heart"/>
        </svg>
      </button>
      <div class="item__control-wrapper">
        <h3 class="item__title">${item.title}</h3>
        <button class="item__to-cart button" data-id="${item.id}">В корзину</button>
        <p class="item__price">
          ${item.discountPrice 
            ? `${item.discountPrice.toLocaleString()}&nbsp;₽
                <span class="item__price-old">${item.price.toLocaleString()}&nbsp;₽</span>` 
            : `${item.price.toLocaleString()}&nbsp;₽`}
        </p>
        <button class="item__description-btn" data-id="${item.id}">Подробнее</button>
      </div>
    </article>
  `);

  return li;
}

const renderCards = (parent) => {
  return (data) => data ? parent.append(...data.map(createCard)) : null;
}

const renderGoods = (query, cb) => {
  const list = document.querySelector('.goods__list');
  list.innerHTML = '';

  serviceGoods(renderCards(list), query, cb).then();
};

export default renderGoods;