const { Router } = require("express");
const { login } = require("../controllers/auth-controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");



const router = Router();


router.post('/login',[
    check('correo','Correo Obligatorio').isEmail(),
    check('password','Contresenia es Obligatorio').not().isEmpty(),
    validarCampos
], login);


module.exports = router;