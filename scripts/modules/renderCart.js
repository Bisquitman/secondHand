// import {addPreloader} from "../preloader.js";
import {getStorage} from "../service/serviceStorage.js";
import {LS_CART_KEY} from "../const.js";
import serviceGoods from "../service/serviceGoods.js";

const renderList = (cart) => {
  const cartList = document.querySelector(".modal-cart__list");
  const cartTotalPrice = document.querySelector(".modal-cart__total-price");

  cartList.innerHTML = "";
  const data = getStorage(LS_CART_KEY);

  let totalPrice = 0;

  cart.map(({id, title, price, discountPrice, image}) => {
    const li = document.createElement("li");
    li.className = 'modal-cart__item';

    const truePrice = discountPrice || price;

    const obj = data.find((item) => item.id === id);
    li.insertAdjacentHTML('beforeend', `
      <img
          class="modal-cart__img"
          src="${image}"
          alt="${title}"
          title="${title}"
          width="100"
          height="105"
      >
      <div class="modal-cart__wrapper">
        <h3 class="modal-cart__subtitle">${title}</h3>
        <ul class="modal-cart__props props">
          <li class="props__item">
            <h4 class="props__title">Артикул:</h4>
            <div class="props__description">${id}</div>
          </li>
          <li class="props__item">
            <h4 class="props__title">Количество</h4>
            <div class="props__description">
              <button class="props__btn props__btn_minus" type="button" data-id="${id}">-</button>
              <output class="props__count">${obj.count}</output>
              <button class="props__btn props__btn_plus" type="button" data-id="${id}">+</button>
            </div>
          </li>
          <li class="props__item">
            <h4 class="props__title">Цена, шт</h4>
            <div class="props__description">${truePrice.toLocaleString()} ₽</div>
          </li>
          <li class="props__item">
            <h4 class="props__title">Стоимость</h4>
            <div class="props__description">${(obj.count * truePrice).toLocaleString()} ₽</div>
          </li>
        </ul>
      </div>
    `);

    cartList.append(li);
    totalPrice += truePrice * obj.count;
  });

  cartTotalPrice.innerHTML = totalPrice.toLocaleString();
};

const renderCart = () => {
  const data = getStorage(LS_CART_KEY);
  const list = data.map(item => item.id);

  if (list.length) {
    serviceGoods(renderList, `?list=${list}`);
  } else {
    renderList([]);
  }
};

export default renderCart;