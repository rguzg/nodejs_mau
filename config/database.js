const mysql = require('mysql');
const util = require('util');

// Mulitples conexiones
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "pokemon"
});

// Hacer que todas las query regresen promesas. No more callback hell!
pool.query = util.promisify(pool.query);

module.exports = pool;