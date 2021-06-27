//Backend del tateti
//maneja la siguiente información:

//jugadas ganadoras
// function loadAnswers()
// {
//     winners.push([1, 2, 3]);
//     winners.push([4, 5, 6]);
//     winners.push([7, 8, 9]);
//     winners.push([1, 4, 7]);
//     winners.push([2, 5, 8]);
//     winners.push([3, 6, 9]);
//     winners.push([1, 5, 9]);
//     winners.push([3, 5, 7]);
// }
//progreso del tablero
//de quien es el turno
//hay un ganador?
//hay un empate? movPlyr1 + movPlyr2 === 9;

const fs= require('fs');
const short = require('shortid');
var tablerosJson = fs.readFileSync('./infoTableros.json','utf8');
//infotableros.json contiene idTablero, progreso,

module.exports = {
	joinTateti:joinTateti,//crearSala: crearSala,//crea sala de tateti
	joinExistingTateti:joinExistingTateti,//unirseASala: unirseASala,//jugador 2 se une a una sala preexistente
	savetateti: savetateti,//guardarMovimiento: guardarMovimiento,//guarda el movimiento del jugador en el archivo .json
	//checkWinner: checkWinner,// verificarGanador: verificarGanador,//verifica que un jugador tenga una mano ganadora
	//deteteFinished:deteleFinished//eliminarMov: eliminarMov//no se que hace esto .... 
};

 const EMPTY = ' ';
 const CIRCLE = 'O';
const CROSS = 'X';

 function joinTateti(req, res){

     let tablero={

         tablero:[
             [EMPTY,EMPTY,EMPTY],
             [EMPTY,EMPTY,EMPTY],
             [EMPTY,EMPTY,EMPTY]
         ],
         turno: CROSS,
         BoardId : short(),
         crossId:short(),
        
     };

     savetateti(tablero);
     res.send(tablero)
     };



function joinExistingTateti(tableroId){
    let tablero = leerTablero(tableroId)
    //validar que exista y no sea un partido empezado
    tablero.circleId = generateId();
    savetateti(board);
    return {
        tablero: tablero.id,
        playerId: tablero.circleId
    };
}

 function savetateti(tateti){
     let tablero = JSON.parse(tablerosJson);
 	tablero.push(info);
 	fs.writeFileSync('infoTableros.json', JSON.stringify(tablero));
  
 }



 function playTateti (tableroId,playerId,posX,posY){
// //existe ese tablero?
// //existe ese jugador en este tablero?
// //es su turno?
// //posición x e y es valida? entre 0 y 2?
// //posicion x e y está libre?
// //alguien ganó?
// //modificar tablero
// //devolver el tablero al front para que actualice

 }

// //borrar partida del json una vez finalizada
// function eraseMatch (){
    
// }
