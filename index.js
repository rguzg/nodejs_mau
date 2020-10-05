const express = require('express');

console.log("Hola Mundo");

const x = 0;
let y = 0;
var z = 0; // <- Bad 😡

// Constructor de express
const app = express();

/*
    Verbos HTTP

    Peticiones entre diferentes entidades en la web
    - GET
    - POST 
    - PATCH: Actualizar una parte de un recurso
    - PUT: Actualiza un recurso completo
    - DELETE
*/

/*
    req = información sobre la petición
    res = objeto de respuesta
*/
app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido 🙂");
})

app.listen(3000, () => {
    console.log("Server is running...");
});