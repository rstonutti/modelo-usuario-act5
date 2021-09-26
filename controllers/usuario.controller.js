const { request, response } = require("express");

const ctrlUsuario = {};

const Usuario = require('../models/Usuario.js');

ctrlUsuario.getUser = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        res.json({
            usuario
        });
    } catch (error) {
        console.log('Error al mostrar los datos del usuario: ', error);
    }
};

ctrlUsuario.createUser = async (req = request, res = response) => {
    const body = req.body;
    try {
        const usuario = new Usuario(body);
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
    const body = req.body;
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, body, {new: true})
        res.json({
            msg: "Datos del usuario actualizados exitosamente",
            usuario
        });
    } catch (error) {
        console.log('Error al actualizar los datos del usuario: ', error);
    }
};

ctrlUsuario.deleteUser = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        await Usuario.findByIdAndDelete(id)
        res.json({
            msg: "Usuario borrado de la base de datos exitosamente"
        });
    } catch (error) {
        console.log('Error al borrar los datos del usuario: ', error);
    }
};

module.exports = ctrlUsuario;