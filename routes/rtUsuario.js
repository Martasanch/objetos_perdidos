const express = require("express");
const rtUsuario = express.Router();
const Usuario = require("../models/Usuario");
const daoUsuarios = require("../dao/daoUsuarios");

//Usuarios

rtUsuario.get("/registro", function (req, res) {
  res.render("registro");
});

rtUsuario.post("/guardar", function (req, res) {
  daoUsuarios
    .guardar(req.body)
    .then((resp) => {
      res.render("registro", { mensaje: "Usuario creado correctamente" });
    })
    .catch((err) => {
      /* console.log(err) */
      res.render("registro", { mensaje: err /* ._message */ });
    });
});

rtUsuario.get("/login", function (req, res) {
  res.render("login");
});

rtUsuario.post("/login", function (req, res) {
  console.log(req.body);
  daoUsuarios.login(req.body).then((respuesta) => {
    if (respuesta == true) {
      res.render("login", { body: req.body, mensaje: "Password Correcto" });
    } else
      res.render("login", { body: req.body, mensaje: "Password Incorrecto" });
  });
});

module.exports = rtUsuario;
