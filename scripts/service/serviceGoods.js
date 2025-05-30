export const URL_SERVER = "http://localhost:3000";
export const URL_POSTFIX = '/api/goods';

const getGoods = (query='') => {
  return fetch(URL_SERVER + URL_POSTFIX + query)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return new Error(response.statusText);
    })
    .catch(error => console.error('Ошибка запроса:', error.message));
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