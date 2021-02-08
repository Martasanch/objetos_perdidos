const express = require("express");
const rtObjeto = express.Router();
const Objeto = require("../models/Objeto");
const daoObjetos = require("../dao/daoObjetos");

//Formulario de registro de objeto

rtObjeto.get("/nuevo", function (req, res) {
  res.render("formulario", {nombre:"Hola, "+req.session.usuario+". Puedes añadir un objeto.", autenticado: req.session.autenticado});
});

//para capturar del body un archivo foto (importante, poner en form el atributo enctype="multipart/form-data")

rtObjeto.post("/guardar", function (req, res) {
  console.log(req.files);
  req.body.foto = `/images/${req.files.foto.name}`;
  daoObjetos.guardar(req.body).then((resp) => {
    let archivo = req.files.foto;
    archivo.mv(`./public/images/${archivo.name}`, (err) => {
      if (err) return res.status(500).send({ message: err });
      res.render("formulario", {mensaje: "objeto guardado con éxito", nombre:"Gracias, "+req.session.usuario, autenticado: req.session.autenticado});
    });
  });
});


//Listado de objetos
rtObjeto.get("/listar", async function (req, res) {
  let misObjetos = await daoObjetos.listar();
  //console.log(misObjetos)

  res.render("listado", { objetosPerdidos: misObjetos, autenticado: req.session.autenticado});
});


//Mostrar objeto por referencia de objetos
rtObjeto.get("/modificarobjeto/:id", function (req, res) {
let id=req.params.id
daoObjetos.encontrarporId(id)
.then(obj=>{
  console.log(obj)
  res.render("modificarobjeto", obj)
})
  
});



rtObjeto.post("/modificar", function (req, res) {
  daoObjetos.modificar(req.body)
      .then(resp=>res.render("modificarobjeto", {mensaje: "Modificado correctamente"}))
    });

rtObjeto.get("//eliminar/:id"), function (req, res) {
let id=req.params.id
daoObjetos.eliminar(id)
.then(resp=>
  res.send("eliminado")
  )}

module.exports = rtObjeto;
