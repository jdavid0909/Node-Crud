const Role = require("../models/role");
const usuario = require("../models/usuario");



const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`el rol ${rol} es invalido`);
    }
}

const esEmailValid = async (correo = '') => {
    const existeEmail = await usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`el correo ${correo} es invalido`);
    }
}


const existeUsuarioByID = async (id) => {
    const existeID = await usuario.findById(id);
    console.log(existeID);

    if (!existeID) {
        throw new Error(`el id ${id} es invalido`);
    }
}


module.exports = {
    esRolValido,
    esEmailValid,
    existeUsuarioByID
}