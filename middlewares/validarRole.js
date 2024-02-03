const { response } = require("express")



const validarRol = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Quiere validar el rol sin validar el token'
        });


    }

    const {rol, nombre} = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(400).json({
            msg: `${nombre} no es administrador `
        });
    }

    next();
}

const tieneRol = (...roles) => {

    console.log('ROLES',roles);

    return (req, res = response, next)=>{

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Quiere validar el rol sin validar el token'
            });
    
    
        }

        console.log(req.usuario.rol);

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `el servicio requiere los roles especificos ${roles} `
            });
    
    
        }
        next();
    }

}

module.exports = { validarRol,tieneRol }