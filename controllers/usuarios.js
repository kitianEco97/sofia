const { response } = require("express");
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {
    const desde = Number(req.query.desde) || 0;
    
    const usuarios = await Usuario
    // LINEA 8: RETORNA TODOS LOS IDS QUE NO SEAN LOS QUE ESTAN EN LA REQ.ID
    .find({ _id: { $ne: req.uid } })
    .sort('-online')
    .skip(desde);
    
    
    res.json({
        ok: true,
        msg: usuarios        
    })
}

const findByDriver = async(req, res =response) => {
    try {
        const data = await Usuario.find({role: 'driver'});
        return res.status(201).json(data);
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: 'error al obtener el driver'
        });
    }
}


module.exports = {
    getUsuarios,
    findByDriver,    
}