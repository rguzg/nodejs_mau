const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");

        // La información del usuario se incluye en la petición
        req.user = decoded;
        
        // Seguir a la siguiente ruta/función
        next();
    } catch (error) {
        res.status(401).json({code: 401, message: "No tienes permiso carita triste"})
    }
};