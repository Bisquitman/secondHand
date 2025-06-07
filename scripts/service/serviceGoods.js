import {URL_POSTFIX, URL_SERVER} from "../const.js";
import {addPreloader, removePreloader} from "../preloader.js";

const getGoods = (query='') => {
  addPreloader();
  return fetch(URL_SERVER + URL_POSTFIX + query)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return new Error(response.statusText);
    })
    .finally(() => {
      removePreloader();
    })
    .catch(error => {
      removePreloader();
      console.error('Ошибка запроса:', error.message)
    });
};

const serviceGoods = async (fn, query, cb) => {
  try {
    fn(await getGoods(query));
    if (cb) cb();
  } catch (error) {
    console.error('Ошибка: ', error.message);
  }
};

export default serviceGoods;