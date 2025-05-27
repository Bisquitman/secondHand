import burgerMenu from "./modules/burgerMenu.js";
import searchControl from "./modules/searchControl.js";
import selectControl from "./modules/selectControl.js";
import slider from "./modules/slider.js";
import renderGoods from "./modules/renderGoods.js";
import interceptLink from "./modules/interceptLink.js";
import itemModal from "./modules/itemModal.js";
import addFavorite from "./modules/addFavorite.js";

const init = () => {
  burgerMenu({
    btnSelector: '.navigation__btn',
    menuSelector: '.navigation',
    activeClass: 'navigation_active',
    closeSelector: '.navigation__link, .header__btn',
  });
  searchControl({
    btnSelector: '.search__btn',
    formSelector: '.search',
    activeClass: 'search_active',
    closeSelector: '.search__close',
    breakpoint: 760,
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

  try {
    renderGoods(location.search, () => {
      document.body.style.opacity = '1';
    });
  } catch (e) {
    document.body.style.opacity = '1';
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
};

init();

// 1:59:28
