const { model, Schema } = require('mongoose');

const UsuarioSchema = new Schema({
        usuario: {
            type: String,
            unique: [true, 'El correo está duplicado'],
            required: [true, 'El nombre de usuario es necesario']
        },
        contrasenia: {
            type: String,
            required: [true, 'La contraseña es necesaria']
        },
        correo: {
            type: String,
            unique: [true, 'El correo está duplicado'],
            required: [true, 'El correo es necesario']
        },
        rol:{
            type: String,
            required: true,
            enum: ['admin_role', 'collaboration_role', 'user_role']
        },
        estado: {
            type: Boolean,
            default: true
        }
});

module.exports = model('Usuario', UsuarioSchema);