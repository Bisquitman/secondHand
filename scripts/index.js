import burgerMenu from "./modules/burgerMenu.js";
import searchControl from "./modules/searchControl.js";
import selectControl from "./modules/selectControl.js";
import slider from "./modules/slider.js";
import renderGoods from "./modules/renderGoods.js";
import interceptLink from "./modules/interceptLink.js";

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

  renderGoods(location.search, () => {
    document.body.style.opacity = '1';
  });
  interceptLink(checkSlider)
};

init();