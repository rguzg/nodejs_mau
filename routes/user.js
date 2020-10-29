const express = require('express');
const user = express.Router();
const db = require('../config/database');

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

module.exports = user;