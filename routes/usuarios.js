/*
    path: api/usuarios

*/
const { Router } = require('express');

const { getUsuarios, findByDriver } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getUsuarios);
router.get('/findByDriver', findByDriver);


module.exports = router;
