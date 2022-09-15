'use strict';

// Módulo de conexión a la BBDD.
const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.log('Error de conexión', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost/practica-4');

// Exportar para poder llamar a este módulo desde otras partes, por ejemplo initdb.js.
module.exports = mongoose.connection;