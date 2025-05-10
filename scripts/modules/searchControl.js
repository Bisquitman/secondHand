const searchControl = ({btnSelector, formSelector, activeClass, closeSelector, breakpoint}) => {
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
}

export default searchControl;