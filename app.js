const express = require('express')
const app = express()
const rtUsuario = require('./routes/rtUsuario')
const rtObjeto = require('./routes/rtObjeto')
const rtMain = require('./routes/rtMain')
var exphbs  = require('express-handlebars')
const conexion=require('./conexion')
const fileUpload = require('express-fileupload')
const session= require('express-session')


//configuración del motor de plantillas handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(express.static(__dirname + '/public'))
app.use(fileUpload())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret: 'miclavesecreta',
    resave: false,
    saveUninitialized: true,
   /*  cookie: { secure: true } */
  }))


  let rutasPrivadas=[
    '/usuario/unlogin',
    '/objeto/nuevo'
    
    ]
    app.use((req,res,next)=>{
        //console.log('Estoy pasando por el middleware', req.url)
        if(req.session.autenticado){ 
         res.locals.session=req.session
         //console.log("usuario si esta autenticado")
          next()
        }else{
            //console.log("usuario no esta autenticado")
            if(rutasPrivadas.indexOf(req.url)!=-1){
                res.render('acceso-denegado')
            }else next()
        }
      })
  



//base de datos mongo

conexion.on('error',console.error.bind(console,"Error de conexion mongo"))
conexion.once('open',()=>console.log("conexion mongo ok"))



//enrutadores
app.use("/",rtMain) 
app.use("/objeto",rtObjeto)
app.use("/usuario",rtUsuario)


//arrancamos el servidor:
app.listen(3000,(err)=>{
    console.log('Server run on port 3000')
})


