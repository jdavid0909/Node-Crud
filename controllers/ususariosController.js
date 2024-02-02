const { response } = require('express');

const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;


    const query = { estado: true };


    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.count(query);

    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })

}

const usuariosParam = (req, res = response) => {

    const { id } = req.params;
    const params = req.query;


    res.json({
        hola: "get controllador",
        id,
        params
    })

}


const usuariosPOST = async (req, res = response) => {

    try {



        const { nombre, correo, password, rol } = req.body;

        const usuario = new Usuario({ nombre, correo, password, rol });

        //Verificar corrreo

        const existeEmail = await Usuario.findOne({ correo });

        if (existeEmail) {
            return res.status(400).json({
                msg: "El correo ya esta registrado"
            })
        }

        //Encryptar contrasenia

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);


        //Guardar en bd

        await usuario.save();

        res.json(usuario)


    } catch (error) {

        console.log(error);

    }


}


const usuariosPUT = async (req, res = response) => {

    const { id } = req.params;

    const { _id, password, google, correo, ...resto } = req.body;

    //Todo validar contra la bd
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)

}

const usuariosDELETE = async (req, res = response) => {

    const {id} = req.params;

    console.log(id);

    //Fisicamente lo borramos

    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndDelete(id,{estado:false});


    res.json(usuario)

}

const usuariosPATCH = (req, res = response) => {

    res.json({
        hola: "patch controllador"
    })

}


module.exports = {
    usuariosGet,
    usuariosPOST,
    usuariosPATCH,
    usuariosPUT,
    usuariosDELETE,
    usuariosParam
}