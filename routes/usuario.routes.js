const router = require('express').Router();

const { 
    getUser,
    createUser,
    editUser,
    deleteUser } = require('../controllers/usuario.controller.js');

router.get('/get-user/:id', getUser);
router.post('/create-user/', createUser);
router.put('/edit-delete/:id', editUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;