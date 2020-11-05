const express = require('express');
const user = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

user.post('/', async (req, res, next) => {
    const {username, mail, password} = req.body;

    if(username && mail && password){
        let query = `INSERT INTO user (user_name, user_mail, user_password)`;
        query += `VALUES ('${username}', '${mail}', '${password}');`;

        const queryResult = await db.query(query);

        if(queryResult.affectedRows == 1){
            return res.status(201).json({code: 201, message: 'Usuario registrado'});
        } else {
            return res.status(500).json({code: 500, message: 'Error'});
        }
    } else {
        return res.status(400).json({code: 400, message: 'Petición mal formada'});
    }
});

user.get('/', async (req, res, next) => {
    const query = 'SELECT * FROM user';
    const queryResult = await db.query(query);

    return res.status(200).json({status: 200, message: queryResult})
});

//Autenticación: Saber quien eres
//Autorización: Tener permiso de hacer cosas
user.post("/login", async (req, res, next) =>{
    const { mail, password } = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${mail}' AND user_password = '${password}';`;

    const queryResult = await db.query(query);
    
    if(mail && password){
        if(queryResult.length == 1){
            const token = jwt.sign({
                user_id: queryResult[0].user_id,
                user_mail: queryResult[0].user_mail
            }, "debugkey");

            return res.status(200).json({status: 200, message: token});
        } else {
            return res.status(401).json({status: 401, message: "Usuario y/o contraseña incorrectos"});
        }
    } else {
        return res.status(400).json({status: 400, message: "Petición incorrects"});
    }

});

module.exports = user;