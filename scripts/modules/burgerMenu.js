const burgerMenu = ({ btnSelector, menuSelector, activeClass, closeSelector }) => {
  const btn = document.querySelector(btnSelector);
  const menu = document.querySelector(menuSelector);

  btn.addEventListener('click', (e) => {
    menu.classList.toggle(activeClass);
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest(closeSelector)) {
      menu.classList.remove(activeClass);
    }
  });
}

export default burgerMenu;