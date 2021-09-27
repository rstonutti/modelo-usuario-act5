const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validarCampos');

const router = require('express').Router();

router.get('/login', [
    check('nombre', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;