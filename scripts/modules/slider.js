import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const slider = ({sliderSelector, paginationParent, bulletClass, bulletActiveClass}) => {
  new Swiper(sliderSelector, {
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
}

export default slider;