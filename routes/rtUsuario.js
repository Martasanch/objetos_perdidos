const express = require("express");
const rtUsuario = express.Router();
const Usuario = require("../models/Usuario");
const daoUsuarios = require("../dao/daoUsuarios");

//Registro de Usuarios

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
        if(err.code ==11000){
        res.render("registro", { mensajemailrep: err /* ._message */ });
        }else res.render('registro', {mensajenombre:err.errors.nombre, mensajemail:err.errors.email, mensajepass:err.errors.password })
      
      });
});


//Login de usuarios
rtUsuario.get("/login", function (req, res) {
  res.render("login");
});
//Unlogin de usuario
rtUsuario.get("/unlogin", function (req, res) {
  req.session.destroy()
  res.render("home");
});

rtUsuario.post("/login", function (req, res) {
  console.log(req.body);
  daoUsuarios.login(req.body)
  .then((respuesta) => {
      if (respuesta.resultado == true) {
        console.log(req.session)
        req.session.autenticado=true
        req.session.usuario=respuesta.nombre

        res.render("formulario", { body: req.body, nombre:"Bienvenido, "+req.session.usuario, autenticado: req.session.autenticado});
      
      }else
      res.render("login", { body: req.body, mensaje:respuesta.mensaje});
  })
  .catch(err=>{
      res.render('login', { body: req.body, mensaje:"Algo ha ido mal"})
    })
});



module.exports = rtUsuario;
