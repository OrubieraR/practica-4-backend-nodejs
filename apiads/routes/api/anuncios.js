'use strict';

// Lanzando las conexiones necesarias:
//   - Express para los middlewares.
//   - Router, mongoose y el modelo de anuncio.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

// Middleware que devuelva una lista de anuncios.
router.get('/', function(req, res, next){
    // Operación asíncrona con Mongoose.
    Anuncio.find().exec(function(err, list){
        if (err) {
            next(err);
            return;
        }
        res.json({
            ok: true,
            list: list
        });
    });
});

// Actualización de un anuncio


// Creación de un anuncio



// Borrado de un anuncio




module.exports = router;