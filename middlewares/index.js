const validarCampos = require('../middlewares/validarCampos.js');
const validarJWT = require('../middlewares/validarJWT.js');
const validarRoles = require('../middlewares/validarRoles.js');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
};