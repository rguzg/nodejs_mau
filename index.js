const express = require('express');
const { pokemon } = require('./pokedex.json');

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
    res.send("Bienvenido al Pokedéx");
});

// JS lee de manera lineal los métodos GET. i.e. en este orden -> / -> /all -> /:id hasta encontrar una ruta que empate con la ruta en la petición
app.get("/pokemon/all", (req, res, next) => {
    res.status(200);
    res.send(pokemon);
});

// : antes de la ruta almacena el contenido de la ruta en una variable. Básciamente funciona como un cómodin, aquí se está diciendo que cualquier ruta que tenga algo después de / llegará a esta función
// Las rutas soportan regex
app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const pokemon_id = req.params.id - 1;
    
    if(pokemon_id >= 0 && pokemon_id <= 150){
        res.status(200);
        return res.send(pokemon[pokemon_id]);
    } 
    res.status(404);
    return res.send(`Error 404: Pokémon no encontrado`);
});

app.get('/pokemon/:name', (req, res, next) => {
    const pokemon_name = req.params.name;

    pokemon.forEach(element => {
        if(element.name == pokemon_name){
            res.status(200);
            return res.send(element);
        }
    });
    
    // If no Pokémon is found
    res.status(404);
    return res.send(`Error 404: Pokémon no encontrado`);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});