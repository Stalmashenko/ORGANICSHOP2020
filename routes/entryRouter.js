const express = require("express");
const entryController = require("../controllers/entryController.js");
const entryRouter = express.Router();

entryRouter.get("/registry", entryController.registry);
entryRouter.post("/registry", entryController.add);
entryRouter.post("/", entryController.login);
module.exports = entryRouter;
