import burgerMenu from "./modules/burgerMenu.js";
import searchControl from "./modules/searchControl.js";
import selectControl from "./modules/selectControl.js";
import slider from "./modules/slider.js";
import renderGoods from "./modules/renderGoods.js";
import interceptLink from "./modules/interceptLink.js";
import itemModal from "./modules/itemModal.js";
import addFavorite from "./modules/addFavorite.js";
import {removePreloader} from "./preloader.js";
import controlCart from "./modules/addCart.js";
import renderCart from "./modules/renderCart.js";

const init = () => {
  burgerMenu({
    btnSelector: '.navigation__btn',
    menuSelector: '.navigation',
    activeClass: 'navigation_active',
    closeSelector: '.navigation__link, .header__btn',
  });
  selectControl({
    btnSelector: '.footer__subtitle',
    selectSelector: '.footer__nav-item',
    activeClass: 'footer__nav-item_active',
    breakpoint: 760,
  });

  const checkSlider = slider({
    parentSliderSelector: '.hero',
    sliderSelector: '.hero__slider',
    paginationParent: '.hero__slider-pagination',
    bulletClass: 'hero__slider-line',
    bulletActiveClass: 'hero__slider-line_active',
  });
  searchControl({
    btnSelector: '.search__btn',
    formSelector: '.search',
    activeClass: 'search_active',
    closeSelector: '.search__close',
    breakpoint: 760,
    cb: checkSlider,
  });

  try {
    renderGoods(location.search, () => {
      removePreloader();
    });
  } catch (e) {
    removePreloader();
    console.error(e.message);
  }
  interceptLink(checkSlider);

  itemModal({
    selectorHandler: '.item__description-btn',
    selectorParent: '.goods__list',
    selectorModal: '.overlay_item',
    classActive: 'overlay_active',
    closeSelector: '.modal-item__btn-to-cart, .overlay__button-close',
  });

  itemModal({
    selectorHandler: '.header__btn_cart',
    selectorModal: '.overlay_cart',
    classActive: 'overlay_active',
    closeSelector: '.overlay__button-close',
    cb: renderCart,
  });

  addFavorite({
    linkFavoriteHandler: ".header__btn_favorite",
    targetSelector: ".item__favorite-btn",
    parentSelector: ".goods__list",
  });
  addFavorite({
    linkFavoriteHandler: ".header__btn_favorite",
    targetSelector: ".modal-item__btn-to-favorite",
    changeActiveClass: ".item__favorite-btn",
  });

  controlCart({
    selectorAdd: '.item__to-cart',
    selectorParent: '.goods__list',
    text: 'В корзине<sup>({count})</sup>',
  });

  controlCart({
    selectorAdd: '.modal-item__btn-to-cart',
    text: 'В корзине<sup>({count})</sup>',
    selectorText: {
      selector: '.item__to-cart',
      text: 'В корзине<sup>({count})</sup>',
    },
  });

  controlCart({
    selectorAdd: '.props__btn_plus',
    selectorRemove: '.props__btn_minus',
    selectorParent: '.modal-cart__list',
    selectorText: {
      selector: '.item__to-cart',
      text: 'В корзине<sup>({count})</sup>',
    },
    cb: renderCart,
  });
};

init();

// 7d 2:08:00