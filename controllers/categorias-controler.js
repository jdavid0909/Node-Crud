const { response } = require('express');
const Categoria = require('../models/categoria');

//api categorias

// method for get all categoris by pagination
const categoriaGetAll = async (req, res = response) => {


    try {
        const { limite = 5, desde = 0 } = req.query;

        const query = { estado: true };

        const [total, categorias] = await Promise.all([
            Categoria.count(query),
            Categoria.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario')
        ])



        res.json({
            total,
            categorias
        })
    } catch (error) {

        res.status(500).json({
            msg: "no pudo obtener todas las categorias"
        })
    }

}

// get Catgegoria by id

const categoriaGetById = async (req, res = response) => {

    try {

        const { id } = req.params;


        const categoria = await Categoria.findById(id).populate('usuario');

        if (!categoria) {
            return res.status(200).json({
                msg: "No exite categoria"
            })
        }

        res.json(categoria)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "error server internal"
        })
    }



}






// method for save categoris
const categoriaSave = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    console.log(nombre);

    try {

        const categoriaExist = await Categoria.findOne({ nombre });

        if (categoriaExist) {
            console.log(categoriaExist);
            return res.status(400).json({
                msg: "categoria ya existe"
            })
        }

        //Generar la data a guardar

        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = new Categoria(data);

        await categoria.save();

        res.json(categoria)

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: "error server internal"
        })
    }




}


// method for save categoris
const categoriaUpdate = async (req, res = response) => {

    try {

        const { id } = req.params;

        const { _id, ...resto } = req.body;

        resto.usuario = req.usuario._id;

        const categoria = await Categoria.findByIdAndUpdate(id, resto);


        return res.json(categoria)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "error server internal"
        })
    }

}

const categoriasDelete = async (req, res = response) => {

    try {

        const { id } = req.params;


        const usuarioAutenticado = req.usuario;

        const categoria = await Categoria.findByIdAndUpdate(id, {
            estado: false,
            usuario: usuarioAutenticado
        });



        res.json({categoria})


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "error server internal"
        })
    }
}





module.exports = {
    categoriaSave,
    categoriaGetAll,
    categoriaGetById,
    categoriaUpdate,
    categoriasDelete

}