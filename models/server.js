
const express = require('express')
var cors = require('cors');
const connectionDb = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth', 
            usuarios: '/api/usuarios',
            categorias:'/api/categorias'
        }



        //Conecion ala bd

        this.conncectarDB();



        // Middewalares : funciones que van añadirle otra funcionalidad al web server 

        this.middlewares()

        //Rutas de mi app
        this.routes();
    }

    async conncectarDB() {
        await connectionDb();
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth-router'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias-router'));

    }

    listen() {
        this.app.listen(this.port, () => {

            console.log(process.env.PORT);

        })
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        //Parso y Lectura del body

        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))
    }
}

module.exports = Server
