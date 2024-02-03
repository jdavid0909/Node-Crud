const { Router } = require('express');
const { categoriaSave, categoriaGetAll, categoriaGetById, categoriaUpdate, categoriasDelete } = require('../controllers/categorias-controler');
const { validarRol, tieneRol } = require('../middlewares/validarRole');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeCategoriaByID } = require('../helpers/db-validators');

const router = Router();

//get all categories paginado
router.get('/', [
    validarJWT,
    validarRol,
    tieneRol('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos
], categoriaGetAll)

//get categoria por id
router.get('/:id', [
    validarJWT,
    validarRol,
    tieneRol('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un mongo id').isMongoId(),
    validarCampos
],
    categoriaGetById)


//create categoria por id
router.post('/',
    [
        validarJWT,
        validarRol,
        tieneRol('ADMIN_ROLE', 'USER_ROLE'),
        check('nombre', 'El nombre no es valido').not().isEmpty(),
        validarCampos
    ],
    categoriaSave)

//update  categoria por id
router.put('/:id', [
    validarJWT,
    validarRol,
    tieneRol('ADMIN_ROLE', 'USER_ROLE'),
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('id').custom(existeCategoriaByID),
    validarCampos
], categoriaUpdate)

//delete categoria por id
router.delete('/:id', [
    validarJWT,
    validarRol,
    tieneRol('ADMIN_ROLE','USER_ROLE'),
    check('id', 'No es un mongo id').isMongoId(),
    check('id').custom(existeCategoriaByID),
    validarCampos
],categoriasDelete)




module.exports = router