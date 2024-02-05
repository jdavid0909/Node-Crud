const { response } = require("express");
const Producto = require('../models/producto');

const productoGetAll = async (req, res = response) => {


    try {
        const { limite = 5, desde = 0 } = req.query;

        const query = { estado: true };

        const [total, productos] = await Promise.all([
            Producto.count(query),
            Producto.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('categoria')
        ])



        res.json({
            total,
            productos
        })
    } catch (error) {

        res.status(500).json({
            msg: "no pudo obtener todas los productos"
        })
    }

}


const ProductoSave = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    try {

        const productoExist = await Producto.findOne({ nombre });

        if (productoExist) {
            console.log(productoExist);
            return res.status(400).json({
                msg: "producto ya existe"
            })
        }

        //Generar la data a guardar

        const usuario =  req.usuario._id;
        const data =  req.body;

        data.nombre = nombre;
        data.usuario = usuario;
    

        const producto = new Producto(data);

        await producto.save();

        res.json(producto)

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: "error server internal"
        })
    }




}

module.exports = {
    productoGetAll,
    ProductoSave

}