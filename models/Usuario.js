const mongoose= require("mongoose")
const {Model, Schema}=mongoose
const bcrypt=require("bcrypt") 




const schemaUsuario=new Schema({
nombre: {
        type:String,
         validate:{
                validator: function(v){
                        return  /^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/.test(v);

                },
                message: 'Tu nombre no puede tener caracteres especiales'
                },
                required:[true, 'El nombre es necesario'],    
        
        
},
email: {
        type:String,
        required: [true, 'El email es necesario'], //index cuando lo voy a usar para búsquedas, unique es para no permitir que se repita, luego hay que programarlo en la base de datos metiendo el código
        unique:true,
    
},
password: {
        type:String,
        required:[true, 'El password es necesario']
},
activo:{
        type:Boolean,
        default:false} //como no llega nada del formulario, es false por defecto

})


class Usuario extends Model{

 
//set y get

        set emailMal(dato){ //al set le doy el name del formulario, y proceso sus datos(req.body.emailMal), para, en este caso, ponerlo todo en minusculas
                this.email=dato.toLowerCase()
        }


//PRIVADOS

//LOGIN
//Comprobar si el password de ingreso está en la base de datos de usuarios registrados, le pasaré un parámetro que llamo contrasenia

comprobarPwd(contrasenia){ 
 //devuelve true si el password coincide y false si no       
        return bcrypt.compare(contrasenia, this.password) //bcrypt devuelve una promesa
                .then(res=>{return res})
}


}



//Encriptar el password antes de guardarlo

schemaUsuario.pre('save', function(next){
     bcrypt.genSalt(6).then(salts=>{
             bcrypt.hash(this.password, salts).then(hash=>{
                     this.password=hash
                     next()
             }).catch(error=>next(error))   

     }).catch(error=>next(error))   
})




schemaUsuario.loadClass(Usuario)  //Para añadir la clase usuario al esquema (las unifico)
module.exports=mongoose.model('usuario',schemaUsuario)