const express = require("express");
const orderController = require("../controllers/orderController.js");
const orderRouter = express.Router();

orderRouter.get("/add", mustAuthenticatedMw, orderController.add);
orderRouter.get("/remove", mustAuthenticatedM, orderController.remove);
orderRouter.get("/decrease", mustAuthenticatedM, orderController.decrease);
orderRouter.get("/cart", mustAuthenticatedM, orderController.cart);
orderRouter.get("/complete", mustAuthenticatedM, orderController.complete);

module.exports = orderRouter;

 function mustAuthenticatedMw (req, res, next){
    req.isAuthenticated()
      ? next()
      : res.sendStatus(401);
  };

  function mustAuthenticatedM (req, res, next){
    req.isAuthenticated()
      ? next()
      : res.redirect('/entry');
  };