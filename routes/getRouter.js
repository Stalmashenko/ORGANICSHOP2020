const express = require("express");
const getController = require("../controllers/getController.js");
const getRouter = express.Router();

getRouter.get("/", getController.about);
getRouter.get("/entry", getController.entry);
getRouter.get("/about", getController.about);
getRouter.get("/contact", getController.contact);
// getRouter.get("/orders", mustAuthenticatedMw, getController.orders);

module.exports = getRouter;

function mustAuthenticatedMw (req, res, next){
    req.isAuthenticated()
      ? next()
      : res.redirect('/entry');
  };