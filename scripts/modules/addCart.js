import {getStorage, setStorage} from "../service/serviceStorage.js";
import {LS_CART_KEY} from "../const.js";

const addCart = (elem, text, selectorText) => {
  let obj = {};
  const cart = getStorage(LS_CART_KEY);
  const findItem = cart.find((item) => item.id === elem.dataset.id);

  if (findItem) {
    obj = findItem;
    obj.count += 1;
  } else {
    obj.count = 1;
    obj.id = elem.dataset.id;
    cart.push(obj);
  }

  if (text) {
    elem.innerHTML = text.replace('{count}', obj.count);
  }

  setStorage(LS_CART_KEY, cart);

  if (selectorText) {
    document.querySelector(selectorText.selector + `[data-id="${elem.dataset.id}"]`)
      .innerHTML = selectorText.text.replace('{count}', obj.count);
    // document.querySelectorAll(selectorText.selector).forEach((elem) => {
    //   elem.innerHTML = selectorText.text.replace('{count}', obj.count);
    // });
  }
};

const removeCart = (elem, selectorText) => {
  const cart = getStorage(LS_CART_KEY);
  const findItem = cart.find((item) => item.id === elem.dataset.id);

  if (findItem.count > 1) {
    findItem.count -= 1;
    setStorage(LS_CART_KEY, cart);

    if (selectorText) {
      document.querySelector(selectorText.selector + `[data-id="${elem.dataset.id}"]`)
        .innerHTML = selectorText.text.replace('{count}', findItem.count);
    }
  } else {
    const newCart = cart.filter((item) => item.id !== elem.dataset.id);
    setStorage(LS_CART_KEY, newCart);

    if (selectorText) {
      document.querySelector(selectorText.selector + `[data-id="${elem.dataset.id}"]`)
        .innerHTML = 'В корзину';
    }
  }
};

const controlCart = ({
                       selectorAdd,
                       selectorRemove,
                       selectorParent,
                       text,
                       selectorText,
                       cb,
                     }) => {
  if (selectorParent) {
    const parent = document.querySelector(selectorParent);
    parent.addEventListener('click', (e) => {
      const addTarget = e.target.closest(selectorAdd);
      if (addTarget) {
        addCart(addTarget, text, selectorText);
        if (cb) cb();
      }

      const removeTarget = e.target.closest(selectorRemove);
      if (removeTarget) {
        removeCart(removeTarget, selectorText);
        if (cb) cb();
      }
    });
  } else {
    const btn = document.querySelector(selectorAdd);
    btn.addEventListener('click', () => {
      addCart(btn, text, selectorText);
      if (cb) cb();
    });
  }
};

export default controlCart;