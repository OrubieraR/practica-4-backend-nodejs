'use strict';

// const { name } = require('ejs');
const mongoose = require('mongoose');

// Definiendo el esquema. Todos los documentos tendrán este esquema siempre que se use Mongoose.
// Se pueden añadir usando otra librería, pero cuando se entre otra vez con Mongoose gestionará solo los datos que hay en el esquema, el resto no sabrá qué es y no lo modificará.
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Añadiendo un método estático para listar con filtro los anuncios disponibles usando el método get de http.
anuncioSchema.statics.list = function (filter, skip, limit, fields, sort){
    const query = Anuncio.find(filter);
    
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);

    // return query.exec(cb);
    return query.exec();
};


const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Indicarle que cree el modelo. Devuelve un modelo del anuncio.
// En otras partes de la app se podrá usar mongoose para recuperar el modelo.
// Hay que añadirlo en app.js
// mongoose.model('Anuncio', anuncioSchema);