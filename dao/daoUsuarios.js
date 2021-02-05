const Usuario = require("../models/Usuario")
const mailer = require("../modules/mailer")
const daoUsuarios = {};

//Guardar

daoUsuarios.guardar = function guardar(usuario) {
  return new Promise((resolved, reject) => {
    let nuevoUsuario = new Usuario(usuario)
    console.log(nuevoUsuario)
    nuevoUsuario
      .save()
      .then(() => {
        /*  mailer.send(nuevoUsuario.email) */ console.log("Email enviado")
        resolved(nuevoUsuario);
      })
      .catch((err) => reject(err))
  })
}

//Metodo buscar un usuario por email

daoUsuarios.getUsuarioByEmail = function getUsuarioByEmail(email) {
  return new Promise((resolved, reject) => {
    Usuario.findOne({ email: email })
    .then(usuario=>resolved(usuario))
    .catch(err=>reject(err))
  })
}

//Metodo para login
daoUsuarios.login = function login(credenciales) {
  return new Promise((resolved, reject) => {
    daoUsuarios.getUsuarioByEmail(credenciales.email)
    .then(async (usuario) => {
          if(usuario==null)
          resolved({resultado:false, mensaje:'Usuario no existe'})
          else{
            let respuesta = await usuario.comprobarPwd(credenciales.password);
            if(respuesta){
          
            resolved({resultado:respuesta, nombre: usuario.nombre, mensaje: 'Usuario correcto'})
            }else
            resolved({resultado:respuesta, mensaje: 'Password incorrecto'})
          }
    })
    .catch(err=>reject(err))//si hay fallo de conexión
  })
}

module.exports = daoUsuarios;
