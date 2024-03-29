


const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({
    nombre:{
        type:String,
        required: [true,'El nombre es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },
    precio:{
        type:Number,
        default:0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required:true, 
    },
    descripcion:{
        type:String
    },
    disponible:{
        type:Boolean,
        default:true
    }
});

// ProductoSchema.methods.toJSON = function () {
//     const {__v, password,_id, ...usuario} = this.toObject();
//     usuario.uuid = _id;

//     return usuario;
// }

module.exports = model('Producto', ProductoSchema);