const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const ctrlUsuario = {};

const Usuario = require('../models/Usuario.js');

ctrlUsuario.getUser = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        const inactivo = await Usuario.findOne({ $and: [{ id }, { estado: false }] })

        if (inactivo) {
            return res.json({
                msg: `El usuario ${usuario.nombre} no existe`
            });
        }

        res.json({
            usuario
        });
    } catch (error) {
        console.log('Error al mostrar los datos del usuario: ', error);
    }
};

ctrlUsuario.createUser = async (req = request, res = response) => {
    const { nombre, correo, contrasenia, rol } = req.body;

    try {

        const usuario = new Usuario({ nombre, correo, contrasenia, rol });

        //NOTA: Puse el nombre y correo en una misma validación por probar el or... Despues me diran si es mejor separarlo para especificar por separado cual ese el repetido.
        //Existe usuario y/o correo
        /* const repetido = await Usuario.findOne({$or:[{nombre},{correo}]});
        if (repetido) {
            return res.status(400).json({
                msg: 'El nombre de usuario o el correo ya están en uso'
            });
        } */

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);

        //Guardar usuario en db
        await usuario.save();

        res.json({
            msg: 'Usuario agregado exitosamente',
            usuario
        });
    } catch (error) {
        console.log('Error al guardar los datos del usuario: ', error);
    };
};

ctrlUsuario.editUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, contrasenia, correo, ...resto } = req.body;

    try {

        //Validar contra db
        if (contrasenia) {
            const salt = bcryptjs.genSaltSync();
            resto.contrasenia = bcryptjs.hashSync(contrasenia, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

        res.json({
            msg: 'Datos del usuario actualizados exitosamente',
            usuario
        });

    } catch (error) {
        console.log('Error al actualizar los datos del usuario: ', error);
    }
};

ctrlUsuario.deleteUser = async (req = request, res = response) => {
    const { id } = req.params;
    try {

        const inactivo = await Usuario.findOne({ $and: [{ id }, { estado: false }] });

        /* console.log(inactivo) */

        if (inactivo) {
            return res.json({
                msg: `El usuario ${id} no existe`
            });
        }

        const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

        res.json({
            msg: 'Usuario borrado de la base de datos exitosamente',
            usuario
        });
    } catch (error) {
        console.log('Error al borrar los datos del usuario: ', error);
    }
};

module.exports = ctrlUsuario;