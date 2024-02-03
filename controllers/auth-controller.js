

const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario')
var jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers/generar-jwt');



const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        //Consulta la inf mediante el email

        const usuario = await Usuario.findOne({ correo })
            .then(usuario => {
                return usuario
            }).catch(err => {
                console.log(err);
            })

        //Verifica si existe un usuario

        if (!usuario) {

            return res.status(400).json({
                msg: "No existe el usuario"
            })

        }

        // verificar si el estado del usuario es true

        if (!usuario.estado) {

            return res.status(400).json({
                msg: "El estado del usuario no es valido"
            })

        }
        //Contrasenia

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "El usuario o contrasenia no son validas"
            })
        }


        //Generar el jwt


        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario, token
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Algo salio mal"
        })
    }



}


module.exports = {
    login
}