const { response } = require("express");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Role = require("../models/role");
const { ObjectId } = require('mongoose').Types;


const colleccionesPermitas =
    ['usuarios', 'categorias', 'roles'];




const buscarUsuarios = async (termino = '', res) => {

    const esMongoId = ObjectId.isValid(termino);

    console.log(esMongoId);

    try {
        if (esMongoId) {
            const usuario = await Usuario.findById(termino)
            res.status(200).json({
                results: (usuario) ? [usuario] : []
            })
        }

        const regex = new RegExp(termino, 'i')

        const usuarios = await Usuario.find({
            $or:[{nombre:regex},{correo:regex}],
            $and:[{estado:true}]
        });

        res.status(200).json({
            results: (usuarios) ? [usuarios] : []
        })


    } catch (error) {
        console.log(error);
    }

}

const buscarCategoria = async (termino = '', res) => {

    const esMongoId = ObjectId.isValid(termino);


    try {
        if (esMongoId) {
            const categoria = await Categoria.findById(termino)
            res.status(200).json({
                results: (categoria) ? [categoria] : []
            })
        }

        const regex = new RegExp(termino, 'i')

        const categorias = await Categoria.find({
            nombre:regex,
            $and:[{estado:true}],
        }).populate('usuario');

        res.status(200).json({
            results: (categorias) ? [categorias] : []
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Ocurrio un error"
        })
    }

}

const buscarRole = async (termino = '', res) => {

    const esMongoId = ObjectId.isValid(termino);
    try {
        if (esMongoId) {
            const role = await Role.findById(termino)
            res.status(200).json({
                results: (role) ? [role] : []
            })
        }

        const regex = new RegExp(termino, 'i')

        const roles = await Role.find({
            role:regex,
        });

        res.status(200).json({
            results: (roles) ? [roles] : []
        })


    } catch (error) {
        res.status(500).json({
            msg:"Ocurrio un error"
        })
    }

}

const buscar = async (req, res = response) => {


    try {

        const { coleccion, termino } = req.params;


        if (!colleccionesPermitas.includes(coleccion)) {

            return res.status(400).json({
                msg: 'las colecciones permitas son: ' + colleccionesPermitas
            })

        }

        switch (coleccion) {
            case 'usuarios':

                await buscarUsuarios(termino, res);

                break;

            case 'categorias':

            await buscarCategoria(termino, res);
                break;

            case 'roles':

            await buscarRole(termino, res);

                break;


            default:
                return res.status(500).json({
                    msg: 'No es permitada esta busquedad'
                })

                break;
        }


    } catch (error) {

        console.log(error);

    }
}



module.exports = buscar