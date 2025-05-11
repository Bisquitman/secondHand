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
    .catch(error => console.error(error));
};

const serviceGoods = async (fn, query, cb) => {
  fn(await getGoods(query));
  if (cb) cb();
};

export default serviceGoods;