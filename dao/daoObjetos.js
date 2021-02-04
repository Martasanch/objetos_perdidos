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
//list
daoObjetos.listar=function find(){
    return new Promise((resolved, rejet)=>{
        resolved(Objeto.find().lean())
    })

}

//findBy



//delete

module.exports=daoObjetos