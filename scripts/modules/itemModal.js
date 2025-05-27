import serviceGoods from "../service/serviceGoods.js";
import {getStorage} from "../service/serviceStorage.js";
import {LS_FAV_KEY} from "./const.js";

const img = document.querySelector(".modal-item__img");
const title = document.querySelector(".modal-item__title");
const advantageList = document.querySelector(".modal-item__advantage-list");
const article = document.querySelector(".modal-item__text_article");
const btnToCart = document.querySelector(".modal-item__btn-to-cart");
const btnToFavorite = document.querySelector(".modal-item__btn-to-favorite");

const renderModal = (data) => {
  console.log(data);
  img.src = data.image;
  img.alt = data.title;
  title.textContent = data.title;
  article.textContent = data.id;
  btnToCart.dataset.id = data.id;
  btnToFavorite.dataset.id = data.id;
  
  let htmlAdvantage = '';
  for (const descriptionKey in data.description) {
    htmlAdvantage += `
      <li class="modal-item__advantage-item">
        ${descriptionKey}:
        <span class="modal-item__text">${data.description[descriptionKey]}</span>
      </li>
    `;
  }

  advantageList.innerHTML = htmlAdvantage;

  const allFavorites = getStorage(LS_FAV_KEY);
  if (allFavorites.includes(data.id)) {
    btnToFavorite.classList.add('active');
  } else {
    btnToFavorite.classList.remove('active');
  }
};

const itemModal = ({
                     selectorHandler,
                     selectorParent,
                     selectorModal,
                     classActive,
                     closeSelector,
                   }) => {
  const overlay = document.querySelector(selectorModal);
  if (selectorParent) {
    const parent = document.querySelector(selectorParent);

    parent.addEventListener('click', async ({target}) => {
      if (target.closest(selectorHandler)) {
        await serviceGoods(renderModal, `/${target.closest(selectorHandler).dataset.id}`);
        overlay.classList.add(classActive);
      }
    });
  } else {
    const target = document.querySelector(selectorHandler);
  }

  overlay.addEventListener('click', ({target}) => {
    if (target === overlay || target.closest(closeSelector)) {
      overlay.classList.remove(classActive);
    }
  });
};

export default itemModal;