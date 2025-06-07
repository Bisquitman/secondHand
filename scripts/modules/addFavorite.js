import {getStorage, toggleStorage} from "../service/serviceStorage.js";
import {LS_FAV_KEY} from "../const.js";

const addFavorite = ({
                       linkFavoriteHandler,
                       targetSelector,
                       parentSelector,
                       changeActiveClass
}) => {
  const links = document.querySelectorAll(linkFavoriteHandler);
  const updateLinks = () => {
    links.forEach(link => {
      link.href = `?list=${getStorage(LS_FAV_KEY)}`;
    });
  };
  updateLinks();

  if (parentSelector) {
    const parent = document.querySelector(parentSelector);

    parent.addEventListener("click", (e) => {
      const target = e.target.closest(targetSelector);
      if (target) {
        target.classList.toggle("active");
        toggleStorage(LS_FAV_KEY, target.dataset.id);
        updateLinks();
      }
    });
  } else {
    const target = document.querySelector(targetSelector);
    target.addEventListener("click", (e) => {
      const btn = e.target.closest(targetSelector);
      btn.classList.toggle("active");
      toggleStorage(LS_FAV_KEY, btn.dataset.id);
      updateLinks();

      document.querySelectorAll(`${changeActiveClass}[data-id="${target.dataset.id}"]`)
        .forEach((elem) => {
          elem.classList.toggle("active");
        });
    });
  }
};

export default addFavorite;