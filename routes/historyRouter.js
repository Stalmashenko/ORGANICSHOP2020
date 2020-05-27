const express = require("express");
const historyController = require("../controllers/historyController.js");
const historyRouter = express.Router();

historyRouter.get("/", historyController.getOrders);
module.exports = historyRouter;
