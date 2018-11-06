const productsCtrl = require("./Controllers/productsCtrl");
// const cartCtrl = require("./Controllers/cartCtrl");

module.exports = app => {
  /** PRODUCTS */
  app.get("/api/routes", productsCtrl.getRoutesReducer);

  /** CART */
  // app.post("/api/cart", cartCtrl.addToCart);
  // app.get("/api/cart", cartCtrl.getCart);
  /** USER */
};