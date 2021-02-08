const Objeto=require('../models/Objeto')
const daoObjetos={}


//save
daoObjetos.guardar=function save(objeto){
 return new Promise((resolved, rejet)=>{
let nuevoObjeto=new Objeto(objeto)
resolved(nuevoObjeto.save())
console.log(nuevoObjeto)
})

}
//listar
daoObjetos.listar=function find(){
    return new Promise((resolved, rejet)=>{
        resolved(Objeto.find().lean())
    })

}

//findByID
daoObjetos.encontrarporId=function buscarporId(id){
    return new Promise((resolved, rejet)=>{
        resolved(Objeto.findOne({_id:id}).lean())
    })

}

//Modificar
daoObjetos.modificar=function update(objeto){
    return new Promise((resolved, rejet)=>{
   Objeto.findByIdAndUpdate(
       objeto._id,
       objeto
   ).then(err=>{
       if(err) console.log(err)
      resolved('Actualizado Correctamente')
 
   })
})

}

//Eliminar
daoObjetos.eliminar=function borrar(id){
    return new Promise((resolved, rejet)=>{
    findOneAndRemove(id)
    .then(err=>{
        if(err) console.log(err)
       resolved('Borrado Correctamente')
  
    })
})

}

module.exports=daoObjetos