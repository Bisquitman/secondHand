const selectControl = ({btnSelector, selectSelector, activeClass, breakpoint}) => {
  const buttons = document.querySelectorAll(btnSelector);
  const selects = document.querySelectorAll(selectSelector);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (document.documentElement.clientWidth <= breakpoint) {
        const parentSelect = button.closest(selectSelector);
        parentSelect.classList.toggle(activeClass);
        selects.forEach((select) => {
          if (select !== parentSelect) {
            select.classList.remove(activeClass);
          }
        });
      }
    });
  });
}

export default selectControl;
