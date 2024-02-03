const { response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT= async (req, res = response, next)=>{

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }

    try {

        const {uuid} = jwt.verify(token,process.env.SECRETKEY);

       
        //leer el usuario que conresponde al uuid

        const usuario =  await Usuario.findById(uuid);

        if (!usuario) {
            return res.status(401).json({
                msg:'Usuario no existe en db'
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg:'Token no valido'
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log('Erorr en validar token',error);
        
        return res.status(401).json({
            msg:'Token no valido'
        });
    }

}

module.exports = {
    validarJWT
}