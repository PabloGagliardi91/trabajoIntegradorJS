const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const ppt = require('./piedraPapelTijera');
const ttt = require('./tateti');
const hm = require ('./HangMan')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Piedra papel tijera lagarto spock
app.get('/PPTLS/' , (req,res) => {
	res.sendFile(path.resolve(__dirname, 'public/PiedraPapelTijera.html'));
});



app.post('/PPTLS/', ppt.crearSala);
app.patch("/PPTLS/:idSala/", ppt.unirseASala);
app.post('/PPTLS/:idSala', ppt.guardarMovimiento);
app.get('/PPTLS/:idSala/:idJugador', ppt.verificarGanador);
app.patch('/PPTLS/:idSala/:idGanador', ppt.eliminarMov);



//Ta te ti FRONT END
//el front end del tateti maneja los siguientes datos:
//creación de la sala con su tablero, con su id, el id del player 1 (x) y todo en blanco.
//creación del id del player 2(O)

app.get('/TaTeTi/' , (req,res) => {
	res.sendFile(path.resolve(__dirname, 'public/tateti.html'));
});
//controllers
app.post('/TaTeTi/tablero', ttt.joinTateti);//crea un tateti
app.patch('/TaTeTi/tablero/:tableroId/', ttt.joinExistingTateti);//se une a un tateti preexistente.
//guarda en .json el archivo con el tablero actual.
//verifica si hay un ganador.
// borro la partida terminada del json.


//function  joinExistingTateti(req,res){

//}





//Hangman
app.get('/HangMan/' , (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/hangman/HangMan.html'));
});

// Crear una sala
app.post('/hangman/salas', hm.crearSala);


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
