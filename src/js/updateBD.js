function uptdateVidas(jugador, vidas) {
  jugador["vidas"] = vidas;
  localStorage.setItem("jugador", JSON.stringify(jugador));
}
function uptdatePuntos(jugador, puntos) {
  jugador["puntos"] = puntos;
  localStorage.setItem("jugador", JSON.stringify(jugador));
}
function uptdateNivel(jugador, nivel) {
  jugador["nivel"] = nivel;
  localStorage.setItem("jugador", JSON.stringify(jugador));
}
function uptdateTurno(turno) {
  localStorage.setItem("turno", JSON.stringify(turno));
}

function añadirPuntos(jugador, puntos) {
  jugador["puntos"] = puntos;
  localStorage.setItem(jugador.id, JSON.stringify(jugador));
}
function resetGame() {
  for (let i = 1; i < numeroDeJugadores + 1; i++) {
    jugador = JSON.parse(localStorage.getItem(`jugador${i}`));
    jugador.puntos = 0;
    localStorage.setItem(jugador.id, JSON.stringify(jugador));
  }
}




function uptdateFirePuntos(puntos,turno,code) {
  sessionStorage.setItem("jugador", JSON.stringify(jugador));
  database.ref(`salas/${code}/jugadores/jugador${turno}`).update({
    puntos: puntos,
  });
}

function uptdateFireTurno(turno,code) {
  sessionStorage.setItem("turno", JSON.stringify(turno));
  database.ref(`salas/${code}/turno`).update({
    turno: turno,
  });
}


function resetFireGame(code) {
  for (let i = 1; i < numeroDeJugadores + 1; i++) {
    jugador = JSON.parse(localStorage.getItem(`jugador${i}`));
    jugador.puntos = 0;
    localStorage.setItem(jugador.id, JSON.stringify(jugador));
  }
}
