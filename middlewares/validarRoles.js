const { response, request } = require('express');


const adminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se intenta verificar el role sin validar el token'
        });
    };

    const { nombre, rol } = req.usuario;

    if (rol !== 'admin_role') {
        return res.status(401).json({
            msg: `${nombre} no es Administrador`
        });
    }


    next();

};

const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se intenta verificar el role sin validar el token'
            });
        };

        if (!roles.includes(req.usuario.rol)) {
            return res.status(400).json({
                msg: `El servicio requiere alguno de estos roles ${roles}`
            });
        }

        next();
    };
};

module.exports = {
    adminRole,
    tieneRole
};