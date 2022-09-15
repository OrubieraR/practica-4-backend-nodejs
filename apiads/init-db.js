'use strict';

const readline = require('readline');

// Conectar a la BBDD. Reutilizar el módulo de connect mongoose.
const connection = require('./lib/connect-mongoose');

// Cargar los modelos. Se usa main con asincronía para trabajar con la BBDD.
const Anuncio = require('./models/Anuncio');

// Cargando datos iniciales desde un JSON externo en data/anuncios.json
const initData = require('./data/anuncios');
// const { reject } = require('async');

async function main() {
    // Añadiendo protección al proceso de inicialización de la BBDD.
    const continuar = await protection('Esta acción inicializará toda la base de datos.\n ¿Estás seguro de querer seguir?');

    if (!continuar) {
        process.exit();
    }

    // Inicializar la colección de anuncios por defecto.
    await initAnuncios();
    connection.close();

}


main().catch(err => console.log('Hubo un error:', err));

async function initAnuncios() {
    // Borrar todos los documentos de anuncios.
    const deleted = await Anuncio.deleteMany();
    console.log(`Eliminados ${(deleted).deletedCount} documentos.`);
    
    const inserted = await Anuncio.insertMany(initData.list);
    console.log(`Añadidos ${inserted.length} documentos.`);
    
}

function protection(texto){
    return new Promise((resolve, reject) => {
        // Interface para la pregunta. Llamado ifc.
        const ifc = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        ifc.question(texto, respuesta => {
            ifc.close();
            if (respuesta.toLowerCase() === 'si') {
                resolve(true);
                return;
            }
            resolve(false);
        });
    })
}


