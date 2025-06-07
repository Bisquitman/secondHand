import renderGoods from "./renderGoods.js";

const searchControl = ({btnSelector, formSelector, activeClass, closeSelector, breakpoint, cb}) => {
  const btn = document.querySelector(btnSelector);
  const btnClose = document.querySelector(closeSelector);
  const form = document.querySelector(formSelector);

  const activateForm = () => {
    form.classList.add(activeClass);
    btn.removeEventListener('click', activateForm);
    btn.type = 'submit';
  };

  const deactivateForm = () => {
    form.classList.remove(activeClass);
    btn.addEventListener('click', activateForm);
    btn.type = 'button';
  };

  const searchBtnType = () => {
    if (document.documentElement.clientWidth >= breakpoint) {
      btn.addEventListener('click', activateForm);
      btnClose.addEventListener('click', deactivateForm);
      btn.type = 'button';
    } else {
      btn.type = 'submit';
    }
  };

  searchBtnType();

  window.addEventListener('resize', () => {
    searchBtnType();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchURL = `?search=${form.elements.search.value}`;
    history.pushState(searchURL.substring(1, 1), searchURL.substring(1), searchURL);
    renderGoods(searchURL);
    cb();
    form.reset();
    deactivateForm();
  });
};

export default searchControl;