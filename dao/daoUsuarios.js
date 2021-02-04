const Usuario = require("../models/Usuario");
const mailer = require("../modules/mailer");
const daoUsuarios = {};

//Guardar

daoUsuarios.guardar = function guardar(usuario) {
  return new Promise((resolved, reject) => {
    let nuevoUsuario = new Usuario(usuario);
    console.log(nuevoUsuario);
    nuevoUsuario
      .save()
      .then(() => {
        /*  mailer.send(nuevoUsuario.email) */ console.log("Email enviado");
        resolved(nuevoUsuario);
      })
      .catch((err) => reject(err));
  });
};

//Metodo buscar un usuario por email

daoUsuarios.getUsuarioByEmail = function getUsuarioByEmail(email) {
  return new Promise((resolved) => {
    resolved(Usuario.findOne({ email: email }));
  });
};

//Metodo para login

daoUsuarios.login = function login(credenciales) {
  return new Promise((resolved) => {
    daoUsuarios.getUsuarioByEmail(credenciales.email).then(async (usuario) => {
      console.log(usuario);
      let respuesta = await usuario.comprobarPwd(credenciales.password);
      console.log(respuesta);
      resolved(respuesta);
    });
  });
};

module.exports = daoUsuarios;
