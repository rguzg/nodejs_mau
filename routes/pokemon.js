const { query } = require('express');
const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

//const pokedex = require('../pokedex.json').pokemon;

pokemon.post("/", async (req, res, next) => {
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
    
    // Validar que los valores sean correctos
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let sql_query = `INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)`;
        sql_query += ` VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience});`;

        const queryResult = await db.query(sql_query);

        if(queryResult.affectedRows == 1){
            return res.status(201).json({
                id: queryResult.insertId,
                ... req.body
            });
        } else {
            return res.status(400).json({code: 400, message: "Ocurrió un error"});
        }
    }
    
});

pokemon.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const delete_id = req.params.id
    const query = `DELETE FROM pokemon WHERE pok_id = ${delete_id}`;
    
    const query_result = await db.query(query);
    
    if(query_result.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Pokémon eliminado correctamente"})
    } else {
        console.log(query_result);
        return res.status(404).json({code: 404, message: "Pokémon no existe"});
    }
});

pokemon.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;

    const query = `UPDATE pokemon SET pok_name= '${pok_name}' , pok_height= ${pok_height}, pok_weight = ${pok_weight}, pok_base_experience = ${pok_base_experience} WHERE pok_id = ${req.params.id}`;

    const queryResult = await db.query(query);

    if(queryResult.affectedRows == 1){
        return res.status(200).json({
            ... req.body
        });
    } else {
        return res.status(400).json({code: 400, message: "Ocurrió un error"});
    }
});

// Patch para cambiar el nombre
pokemon.patch("/:id([0-9]{1,3})", async (req, res, next) => {
    const {pok_name} = req.body;

    if(pok_name){
        const query = `UPDATE pokemon SET pok_name= '${pok_name}' WHERE pok_id = ${req.params.id}`;

        const queryResult = await db.query(query);

        if(queryResult.affectedRows == 1){
            return res.status(200).json({
                ... req.body
            });
        } else {
            return res.status(400).json({code: 400, message: "Ocurrió un error"});
        }
    } else {
        return res.status(400).json({code: 400, message: "Ocurrió un error"});
    }
});

// JS lee de manera lineal los métodos GET. i.e. en este orden -> / -> /all -> /:id hasta encontrar una ruta que empate con la ruta en la petición
// GET de todos los elementos sea el nombre del recurso
pokemon.get("/", async (req, res, next) => {
    // No callback!
    const queryResult = await db.query("SELECT * FROM pokemon;");

    // Convertir el resultado de la query a un JSON
    return res.status(200).json({code: 200, message: queryResult});
});

// : antes de la ruta almacena el contenido de la ruta en una variable. Básciamente funciona como un cómodin, aquí se está diciendo que cualquier ruta que tenga algo después de / llegará a esta función
// Las rutas soportan regex
pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const pokemon_id = req.params.id;

    if(pokemon_id >= 0 && pokemon_id <= 722){
        const queryResult = await db.query(`SELECT * FROM pokemon WHERE ${pokemon_id} = pok_id;`)

        return res.status(200).json({code: 200, message: queryResult});
    } 

    return res.status(404).json({code: 404, message:`Error 404: Pokémon no encontrado`});
});

// Name no números
pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const pokemon_name = req.params.name;

    // retorna arreglo con los elementos que cumplan con la condición del filtro
    /*const queryResult = pokedex.filter((p) => {
        // Si x && y es verdadero, retornar y
        return (p.name.toUpperCase() == pokemon_name.toUpperCase()) && p;

        //return (p.name.toUpperCase() == pokemon_name.toUpperCase()) ? p : null;
    });*/

    const queryResult = await db.query(`SELECT * FROM pokemon WHERE pok_name = "${pokemon_name}"`);
    console.log(queryResult);
    
    // If no Pokémon is found
    (queryResult.length > 0) ? res.status(200).json({code: 200, message: queryResult}) : res.status(404).json({code: 404, message: `Error 404: Pokémon no encontrado`});
});

module.exports = pokemon;