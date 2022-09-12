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

// Creación de un anuncio. Utilizando el método post porque va en el body del post.
router.post('/', function(req, res, next){
    // console.log(req.body);
    var anuncio = new Anuncio(req.body);
    anuncio.save(function (err, anuncioGuardado){
        if (err) {
            return next(err);
        }
        res.json({ok:true,anuncio:anuncioGuardado});
    });
});

// Actualización de un anuncio. Con la característica de express de recibir un dato :id.
router.put('/:id', (req, res, next)=>{
    let id = req.params.id;
    Anuncio.updateOne({_id:id}, req.body, function (err, anuncio){
        if (err) {
            return next(err);
        }
        res.json({ok:true,anuncio:anuncio});
    });
});

// Borrado de un anuncio.
router.delete('/:id', (req, res, next)=>{
    let id = req.params.id;
    Anuncio.remove({_id:id}, function (err, result){
        if (err) {
            return next(err);
        }
        res.json({ok:true,result:result});
    });

});



module.exports = router;