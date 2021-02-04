const express = require("express");
const rtMain = express.Router();
const Objeto = require("../models/Objeto");
const daoObjetos = require("../dao/daoObjetos");
const fileUpload = require("express-fileupload");

//Formulario de registro de objeto

rtMain.get("/", function (req, res) {
  res.render("home");
});

module.exports = rtMain;
