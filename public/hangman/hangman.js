let intentosRestantes = 0;
let partidaFinalizada = false;
let partidaGanada = false;
let salaID;

const ERROR = document.getElementById('error');
const WORD_PROGRESS_DIV = document.getElementById('word-progress-display');
const ROOM_ID_DISPLAY = document.getElementById('room-id-display');
const TRIES_DISPLAY = document.getElementById('tries-display');

async function getData(URL, body = {}, method = "GET") {
    let response
    if (method === "GET") {
        response = await fetch(URL, {
        method: method,
    })}
    else {
        response = await fetch(URL, {
            method: method,
            body,
        })
    }
    const data = await response.json();
    return data
}

async function sendLetterRequest(letter) {
    const response = await getData(`/hangman/salas/${id}`, {letra: letter} , "PATCH")
    TRIES_DISPLAY.innerHTML = `INTENTOS RESTANTES: ${response.intentosRestantes}`
}

function setWordProgress(arrayOfLetters) {
    WORD_PROGRESS_DIV.innerHTML = "" //clear the progress
    arrayOfLetters.forEach(letter => {
        const newLetterDocument = document.createElement("p"); 
        newLetterDocument.innerHTML = letter ? letter : "_";
        WORD_PROGRESS_DIV.appendChild(newLetterDocument);
    });
}

async function requestNewRoom() {
    const nuevaSala = await getData('/hangman/salas', {}, "POST");
    setWordProgress(nuevaSala.progresoDePalabra);
    salaID = nuevaSala.salaID;
    ROOM_ID_DISPLAY.innerHTML = `ID DE SALA: ${salaID}`;
    console.log(nuevaSala)
}

function clicked(valor) {
    //leer el valor y enviarlo al js para comparar con la palabra
    let seleccion= valor.value;
    valor.hidden=true;
    console.log(seleccion);
    //deshabilitar botón
}