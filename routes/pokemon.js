const express = require('express');
const pokemon = express.Router();

const pokedex = require('../pokedex.json').pokemon;

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body)
});

// JS lee de manera lineal los métodos GET. i.e. en este orden -> / -> /all -> /:id hasta encontrar una ruta que empate con la ruta en la petición
// GET de todos los elementos sea el nombre del recurso
pokemon.get("/", (req, res, next) => {
    return res.status(200).send(pokedex);
});

// : antes de la ruta almacena el contenido de la ruta en una variable. Básciamente funciona como un cómodin, aquí se está diciendo que cualquier ruta que tenga algo después de / llegará a esta función
// Las rutas soportan regex
pokemon.get('/:id([0-9]{1,3})', (req, res, next) => {
    const pokemon_id = req.params.id - 1;
    
    if(pokemon_id >= 0 && pokemon_id <= 150){
        return res.status(200).send(pokedex[pokemon_id]);
    } 

    return res.status(404).send(`Error 404: Pokémon no encontrado`);
});

// Name no números
pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
    const pokemon_name = req.params.name;

    // retorna arreglo con los elementos que cumplan con la condición del filtro
    const queryResult = pokedex.filter((p) => {
        // Si x && y es verdadero, retornar y
        return (p.name.toUpperCase() == pokemon_name.toUpperCase()) && p;

        //return (p.name.toUpperCase() == pokemon_name.toUpperCase()) ? p : null;
    });
    
    // If no Pokémon is found
    (queryResult.length > 0) ? res.status(200).send(queryResult) : res.status(404).send(`Error 404: Pokémon no encontrado`);
});

module.exports = pokemon;