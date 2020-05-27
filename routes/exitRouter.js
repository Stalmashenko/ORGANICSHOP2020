const express = require("express");
const exitController = require("../controllers/exitController.js");
const exitRouter = express.Router();

exitRouter.get("/", exitController.exit);
module.exports = exitRouter;