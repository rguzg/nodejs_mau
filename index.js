const express = require('express');
const pokemon = require('./routes/pokemon')
const user = require('./routes/user')
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
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: true}));

//Body parser de express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get("/", (req, res, next) => {
    return res.status(200).json({code: 200, message:"Bienvenido al Pokédex"});
});

//Todas las rutas /pokemon utilizaran lo que está dentro de pokemon
app.use("/pokemon", pokemon);

app.use("/user", user);

// Baby's first middleware 😙
// El middleware está hasta abajo para que solo se envie 404 si no se encuentra ingresa a ninguna de las rutas de arriba 
app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "URL no encontrada"});
});

// || -> Si existe PORT usar este valor, sino utilizar 3000
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});