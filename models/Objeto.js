const mongoose= require("mongoose")
const {Model, Schema}=mongoose


const schemaObjeto=new Schema({
nombre: {type:String, required:true},
telefono:{type:String, required:true},
titulo:{type:String},
descripcion:{type:String},
foto:{type:String,default:'/images/sign.jpg'}

})



class Objeto extends Model{
errores=[]
//constructor
    


//get y set
get errores(){
        let errores=[]
        if(this.nombre=='') errores.push({error:'nombre vacío'})
        return errores
}
//metodos privados

/*     validar(){

        let errores=[]
        if(this.nombre=='') errores.push({error:'nombre vacío'})
        return errorres
    } */
        
 

  
}


schemaObjeto.loadClass(Objeto)  //Para añadir la clase Objeto al esquema (las unifico)
module.exports=mongoose.model('Objeto',schemaObjeto)