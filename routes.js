const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
route.get("/", homeController.paginaInicial);
route.post("/", homeController.trataPost);
/*
const homeController = require("./src/controllers/homeController");
const contatoController = require(".src/controllers/contatoController");

route.get("/", homeController.paginaInicial);
route.post("/", homeController.trataPost);

route.get("/contatos", contatoController.paginaInicial);
*/
module.exports = route;