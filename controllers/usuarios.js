const { response } = require("express");
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {
    const desde = Number(req.query.desde) || 0;
    
    const usuarios = await Usuario
    // LINEA 8: RETORNA TODOS LOS IDS QUE NO SEAN LOS QUE ESTAN EN LA REQ.ID
    .find({ _id: { $ne: req.uid } })
    .sort('-online')
    .skip(desde);
    
    console.log(usuarios);
    
    res.json({
        ok: true,
        msg: usuarios        
    })
}

module.exports = {
    getUsuarios
}