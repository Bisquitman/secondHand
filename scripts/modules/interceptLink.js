import renderGoods from "./renderGoods.js";

const handlerClick = (e, cb) => {
  const target = e.target.closest('a');
  if (target) {
    const href = target.getAttribute('href');
    if (href[0] === '?') {
      e.preventDefault();
      history.pushState(href.substring(1), href.substring(1), location.pathname + href);
      if (cb) cb();
      renderGoods(href);
    }
  }
}

const interceptLink = (cb) => {
  document.body.addEventListener("click", (e) => {
    handlerClick(e, cb);
  });

  window.addEventListener("popstate", (e) => {
    if (e.state) {
      renderGoods('?' + e.state);
    } else {
      renderGoods();
    }
  });
};

export default interceptLink;