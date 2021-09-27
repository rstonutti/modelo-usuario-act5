const Role = require('../models/Role.js');
const Usuario = require('../models/Usuario.js');

const existeNombre = async (nombre = '') => {
    const existeNombre = await Usuario.findOne({ nombre });
    if (existeNombre) {

        throw new Error(`El nombre de usuario ${nombre} ya está en uso`);

        /* return res.status(400).json({
            msg: 'Este nombre de usuario ya está en uso. Elige otro'
        }); */
    };
};

const existeCorreo = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {

        throw new Error(`El correo ${correo} ya está en uso`);

        /* return res.status(400).json({
            msg: 'Este correo ya está en uso. Elige otro'
        }); */
    };
}

const existeRol = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`);
    }
};

const existeUsuarioID = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
};

module.exports = {
    existeNombre,
    existeCorreo,
    existeRol,
    existeUsuarioID
}