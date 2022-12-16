sonidos = document.getElementById("sonidos");

crearAudio(sonidos,"teclado")
crearAudio(sonidos,"acierto")
crearAudio(sonidos,"fallo")

var sonidoTeclas = document.getElementById("sonidoteclado");
var SonidoAcierto = document.getElementById("sonidoacierto");
var sonidoFallo = document.getElementById("sonidofallo");

function crearAudio(sonidos,audioid) {
  var audio = document.createElement("audio");
  audio.id = `sonido${audioid}`;
  audio.setAttribute("preload", "auto");
  sonidos.appendChild(audio);
  var src = document.createElement("source");
  src.setAttribute("src", `./src/audio/${audioid}.mp3`);
  audio.appendChild(src);
}

