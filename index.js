const express = require('express');
const bodyparser = require('body-parser');
const pokemon = require('./routes/pokemon')
const morgan = require('morgan');

console.log("Hola Mundo");

const x = 0;
let y = 0;
var z = 0; // <- Bad 😡

// Constructor de express
const app = express();

/*
    Verbos HTTP

    Peticiones entre diferentes entidades en la web
    - GET: Obtener un recurso
    - POST: Almacenar/Crear recursos 
    - PATCH: Actualizar una parte de un recurso
    - PUT: Actualiza un recurso completo
    - DELETE - Elimina un recurso
*/

/*
    req = información sobre la petición
    res = objeto de respuesta
*/

// use -> Aplicar una función a todas las peticiones que entren a la aplicación, osea middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido al Pokedéx");
});

//Todas las rutas /pokemon utilizaran lo que está dentro de pokemon
app.use("/pokemon", pokemon);

// || -> Si existe PORT usar este valor, sino utilizar 3000
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});