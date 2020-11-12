const { json } = require("express");

module.exports = (req, res, next) => {
    // De que origenes aceptar peticiones
    res.header("Access-Control-Allow-Origin", "*");

    // Que Headers permitir
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();
}
