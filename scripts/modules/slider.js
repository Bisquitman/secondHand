// import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import {Swiper} from './swiper-bundle.min.js';

  const slider = ({parentSliderSelector, sliderSelector, paginationParent, bulletClass, bulletActiveClass}) => {
    if (sliderSelector) {
    const swiper = new Swiper(sliderSelector, {
      init: false,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
      effect: 'fade',
      pagination: {
        el: paginationParent,
        type: 'bullets',
        bulletClass: bulletClass,
        bulletActiveClass: bulletActiveClass,
        clickable: true,
        // renderBullet: function (index, bulletClass) {
        //   return `<span class="${bulletClass}"></span>`
        // },
      },
      on: {
        init() {
          this.el.addEventListener('mouseenter', (e) => {
            this.autoplay.stop();
          });
          this.el.addEventListener('mouseleave', (e) => {
            this.autoplay.start();
          });
        },
      },
    });

    const checkSlider = () => {
      const href = location.href;
      if (href.includes('?')) {
        swiper.disable();
        document.querySelector(parentSliderSelector)?.remove();
      } else {
        swiper.init();
      }
    };

    checkSlider();

    return checkSlider;
  }
}

export default slider;