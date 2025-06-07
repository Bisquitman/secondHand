export const addPreloader = () => {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = `<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>`;
  // if (!document.querySelector(".preloader")) {
    document.body.prepend(preloader);
    document.body.style.overflow = 'hidden';
  // }
};

export const removePreloader = () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';
    document.body.removeAttribute('style');
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 300);
};
