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
app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido al Pokedéx");
});

// JS lee de manera lineal los métodos GET. i.e. en este orden -> / -> /all -> /:id hasta encontrar una ruta que empate con la ruta en la petición
app.get("/pokemon/", (req, res, next) => {
    return res.status(200).send(pokemon);
});

// : antes de la ruta almacena el contenido de la ruta en una variable. Básciamente funciona como un cómodin, aquí se está diciendo que cualquier ruta que tenga algo después de / llegará a esta función
// Las rutas soportan regex
app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const pokemon_id = req.params.id - 1;
    
    if(pokemon_id >= 0 && pokemon_id <= 150){
        return res.status(200).send(pokemon[pokemon_id]);
    } 

    return res.status(404).send(`Error 404: Pokémon no encontrado`);
});

// Name no números
app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const pokemon_name = req.params.name;

    // retorna arreglo con los elementos que cumplan con la condición del filtro
    const queryResult = pokemon.filter((p) => {
        return (p.name.toUpperCase() == pokemon_name.toUpperCase()) ? p : null;
    });
    
    // If no Pokémon is found
    (queryResult.length > 0) ? res.status(200).send(queryResult) : res.status(404).send(`Error 404: Pokémon no encontrado`);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});