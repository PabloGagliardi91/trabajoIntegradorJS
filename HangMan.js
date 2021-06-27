// palabra random envío al front
const short = require('shortid');
const fs = require('fs');
const jsonWords = fs.readFileSync('palabras.json', 'utf-8');
const palabras = JSON.parse(jsonWords);

// API BASE DE DATOS JSON
const SALAS_FILENAME = 'salasHangman.json';

function findTodasLasSalas() {
    const salas = fs.readFileSync(SALAS_FILENAME, 'utf-8');
    return JSON.parse(salas);
}

function modificarTodasLasSalas(salas) {
    const salasEnTexto = JSON.stringify(salas, null, 5);
    fs.writeFileSync(SALAS_FILENAME, salasEnTexto);
}

function findSala(id) {
    const salas = findTodasLasSalas();
    const salaEncontrada = salas.find( (sala) => sala.id === id );
    return salaEncontrada;
}

function guardarSala(sala) {
    const salas = findTodasLasSalas();
    salas.push(sala);
    modificarTodasLasSalas(salas);
}

function eliminarSalaPorID(id) {
    const salas = findTodasLasSalas();
    const indiceDeSalaEncontrada = salas.findIndex( (sala) => sala.id === id );
    if (indiceDeSalaEncontrada === -1) return false;
    salas.split(indiceDeSalaEncontrada, 1)
    modificarTodasLasSalas(salas);
    return true;
}

function modificarSalaPorId(id, sala) {
    const salas = findTodasLasSalas();
    const indiceDeSalaEncontrada = salas.findIndex( (sala) => sala.id === id );
    if (indiceDeSalaEncontrada === -1) return false;
    salas[indiceDeSalaEncontrada] = sala;
    modificarTodasLasSalas(salas);
    return true;
}
// FIN API BASE DE DATOS JSON

// UTILIDADES
function obtenerPalabraRandom() {
    return palabras[Math.floor(Math.random() * palabras.length)].word;
}
// 

module.exports = {
    crearSala: crearSalaController
}

// crear una sala
function crearSalaController(req, res) {
    const idUnica = short();
    const palabraRandom = obtenerPalabraRandom();
    const progreso = Array(palabraRandom.length).fill(null);
    const intentosRestantes = 6;
    const nuevaSala = {
        id: idUnica,
        palabra: palabraRandom,
        progresoDePalabra: progreso,
        intentosRestantes,
        finalizada: false,
        gano: false
    }
    guardarSala(nuevaSala);

    // debug
    console.log(nuevaSala);

    const mensajeSalaCreada = {
        salaID: nuevaSala.id,
        intentosRestantes: nuevaSala.intentosRestantes,
        progresoDePalabra: nuevaSala.progresoDePalabra,
        error: false,
        message: "Sala creada con exito"
    }

    res.status(200).json(mensajeSalaCreada);
}