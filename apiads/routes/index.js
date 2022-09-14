var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

/* GET home page. */
router.get('/', async (req, res, next)=> {
  // res.render('index', { title: 'Anuncios' });

  try {
    // Filtros.
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const venta = req.query.venta;
    const foto = req.query.foto;
    const tags = req.query.tags;

    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;
    // selección de campos
    const fields = req.query.fields;
    const sort = req.query.sort;

    // Creación de un filtro vacío
    const filtro = {}


    if (nombre) {
        // filtro.nombre = nombre;
        filtro.nombre = new RegExp('^' + req.query.nombre, "i");
      }
  
    if (precio) {
        filtro.precio = precio;
    }
    
    if (venta) {
        filtro.venta = venta;
    }

    if (foto) {
        filtro.foto = foto;
    }

    if (tags) {
        filtro.tags = tags;
    }
    
    
    const anuncios = await Anuncio.list(filtro, skip, limit, fields, sort);
    
    res.render('index', {
      title: 'Página de anuncios',
      results: anuncios
    });

} catch (err) {
    next(err);
}
});

module.exports = router;
