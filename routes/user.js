
const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');
const { esRolValido, esEmailValid, existeUsuarioByID } = require('../helpers/db-validators');
const { usuariosPUT, usuariosPATCH, usuariosDELETE, usuariosParam, usuariosGet, usuariosPOST } = require('../controllers/ususariosController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol, tieneRol } = require('../middlewares/validarRole');


const router = Router();


router.get('', usuariosGet)

router.post('', [
    check('correo', 'El correo no es valido').isEmail(),
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 letras').isLength({ min: 6 }),
    // check('role', 'El role es invalido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(esEmailValid),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPOST)


router.put('/:id', [
    check('id', 'No es un mongo id').isMongoId(),
    check('id').custom(existeUsuarioByID),
    validarCampos
],

    usuariosPUT);

router.patch('', usuariosPATCH)

router.delete('/:id', 
[
    validarJWT,
    validarRol,
    tieneRol('ADMIN_ROLE','USER_ROLE'),
    check('id', 'No es un mongo id').isMongoId(),
    check('id').custom(existeUsuarioByID),
    validarCampos
],
usuariosDELETE)

router.get('/:id', usuariosParam)


module.exports = router;