const express = require("express");
const rtObjeto = express.Router();
const Objeto = require("../models/Objeto");
const daoObjetos = require("../dao/daoObjetos");

//Formulario de registro de objeto

rtObjeto.get("/nuevo", function (req, res) {
  res.render("formulario");
});

//para capturar del body un archivo foto (importante, poner en form el atributo enctype="multipart/form-data")

rtObjeto.post("/guardar", function (req, res) {
  console.log(req.files);
  req.body.foto = `/images/${req.files.foto.name}`;
  daoObjetos.guardar(req.body).then((resp) => {
    let archivo = req.files.foto;
    archivo.mv(`./public/images/${archivo.name}`, (err) => {
      if (err) return res.status(500).send({ message: err });
      res.render("formulario");
    });
  });
});

rtObjeto.get("/listar", async function (req, res) {
  let misObjetos = await daoObjetos.listar();

  res.render("listado", { objetosPerdidos: misObjetos });
});

module.exports = rtObjeto;
