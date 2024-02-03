const { Schema, model } = require('mongoose');


const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },
});

CategoriaSchema.methods.toJSON = function () {

    // Desestructurar las propiedades del objeto principal
    const { __v: categoriaV, usuario, ...categoria } = this.toObject();

    // Desestructurar las propiedades del objeto 'usuario'
    const { __v: usuarioV, ...usuarioData } = usuario;

    // Devolver el objeto desestructurado
    return {
        ...categoria, // Desestructuración de 'categoria'
        usuario: {
            ...usuarioData, // Desestructuración de 'usuario'
        },
    };
}


module.exports = model('Categoria', CategoriaSchema);