// Array de los turnos
var puntos; //puntuación del jugador
var turnoActual; // nivel donde se encuentra el jugador
var palabra = JSON.parse(localStorage.getItem("palabra")) //palabra seleccionada
var linea; // palabra oculta
var lineas = []; // array de lineas de las palabras ocultas
var vidas; // vidas
var contador; // contador de acierto por lineas
var espacios; // numeros de espacios que contiene una palabra
var vidaMuñeco;
var pista;
var pasarJugador; //jugador que escribe la palabra y por lo tanto se salta el turno de adivinar
//define las class del sweetalert211
var tabla;

//Get de los elementos
var numeroDeJugadores = JSON.parse(localStorage.getItem("numeroDeJugadores")); //optiene los datos del jugador devuelto en objeto
var turno = JSON.parse(localStorage.getItem("turno")); //optiene los datos del jugador devuelto en objeto
var jugador = JSON.parse(localStorage.getItem(`jugador${turno}`)); //optiene los datos del jugador devuelto en objeto
var jugadores = [""];
var rank;
var marcador = document.getElementById("marcador");

var mostrarVidas = document.getElementById("vidas");
var mostrarturno = document.getElementById("turno");
var mostrarPista = document.getElementById("pista");
var mostrarPuntos = document.getElementById("puntos");
var palabraOculta = document.getElementById("palabra");
window.onload = function () {
  const swalClass = Swal.mixin({
    customClass: {
      confirmButton: "swalButtonConfir",
      cancelButton: "swalButtonCancel",
    },
    buttonsStyling: false,
  });

  function ranking() {
    rankingPosicion = document.createElement("div");
    rankingPosicion.setAttribute("class", "ranking");
    for (let i = 1; i < numeroDeJugadores + 1; i++) {
      rankingElemrnto = document.createElement("div");
    rankingElemrnto.setAttribute("class", "elemento");
      Rpos = document.createElement("div");
      Rpos.setAttribute("class", `ranking-rank R${i}`);
      Rpos.innerHTML = i;
      Rpuntos = document.createElement("div");
      Rpuntos.setAttribute("class", "ranking-puntos");
      RNombre = document.createElement("div");
      RNombre.setAttribute("class", `ranking-nombre ${jugadores[i].id}`);
      if (jugadores[i] != null) {
        RNombre.innerHTML = jugadores[i].nombre;
        Rpuntos.innerHTML = jugadores[i].puntos;
        marcador.appendChild(rankingPosicion);
        rankingPosicion.appendChild(rankingElemrnto);
        rankingElemrnto.appendChild(Rpos);
        rankingElemrnto.appendChild(RNombre);
        rankingElemrnto.appendChild(Rpuntos);
      }
    }
  }
  function actualizarRanking() {
    jugadores = [""];
    for (let i = 1; i < numeroDeJugadores + 1; i++) {
      jugadores.push(JSON.parse(localStorage.getItem(`jugador${i}`)));
    }

    console.log(jugadores);
    jugadores.sort(function (a, b) {
      if (a.puntos < b.puntos) {
        return 1;
      }
      if (a.puntos > b.puntos) {
        return -1;
      }
      return 0;
    });

    marcador.innerHTML = "";

    ranking();
  }

  // Crear lineas de la palabra oculta
  dibujarLineas = function () {
    acierto = document.createElement("ul"); //crea el ul para desglosar la palabra
    //añade la letras en un li
    for (var i = 0; i < palabra.length; i++) {
      acierto.setAttribute("id", "my-palabra");
      linea = document.createElement("li");
      linea.setAttribute("class", "linea");
      //comprueba los es pacios de la palabra

      if (palabra[i] === " ") {
        linea.innerHTML = "-";
        espacios += 1;
      } else {
        linea.innerHTML = "_";
      }
      lineas.push(linea);
      palabraOculta.appendChild(acierto);
      acierto.appendChild(linea);
    }
  };
  // Muestra las  vidas y los puntos
  imprimirElementos = function () {
    if (vidaMuñeco == 0) {
      vidas -= 1;
      uptdateVidas(jugador, vidas);
      GameOver();
    }

    for (var i = 0; i < lineas.length; i++) {
      if (contador + espacios == lineas.length) {
        var ganar = true;
      }
    }
    if (ganar === true) {
      victoria();
    }
  };

  // OnClick en el teclado
  click = function () {
    listaTeclas.onclick = function () {
      sonidoTeclas.play();
      var palabraAcertada = this.innerHTML;
      this.onclick = null;
      for (var i = 0; i < palabra.length; i++) {
        if (palabra[i] === palabraAcertada) {
          lineas[i].innerHTML = palabraAcertada;
          contador += 1;
        }
      }

      var j = palabra.indexOf(palabraAcertada);

      if (j === -1) {
        sonidoFallo.play();
        cambioTurno();
        vidaMuñeco -= 1;
        this.setAttribute("class", "fallado");
        imprimirElementos();
        animate(vidaMuñeco);
      } else {
        SonidoAcierto.play();
        this.setAttribute("class", "acertado");
        puntos = puntos + 10;
        añadirPuntos(jugador, puntos);
        imprimirElementos();
        actualizarRanking();
      }
    };
  };



function comprobarPalabra(){
  palabra = palabra.toUpperCase();
  palabra = palabra.replace(/\s/g, "-");
  palabra = palabra.replace("Á", "A");
  palabra = palabra.replace("É", "E");
  palabra = palabra.replace("Í", "I");
  palabra = palabra.replace("Ó", "O");
  palabra = palabra.replace("Ú", "U");
  palabra = palabra.replace("Ü", "U");
  console.log(palabra);
}
  // Empieza el juego
  start = function () {
    Swal.fire({
      title: `turno de ${jugador.nombre}`,
      html: `<h2>Escriba la palabra</h2><input type="text" id="palabraOculta" class="swal2-input" placeholder="Palabra oculta">
      <input type="text" id="pistaJugador" class="swal2-input" placeholder="Pista">`,
      confirmButtonText: "Empezar ronda",
      color: "#fff",
      background: "#1b583b",
      focusConfirm: false,
      preConfirm: () => {
        let regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
        const palabra = Swal.getPopup().querySelector("#palabraOculta").value;
        var pista = Swal.getPopup().querySelector("#pistaJugador").value;
        if (!pista) {
          pista = `${jugador.nombre} No ha dejado pista`;
        }
        
        if(!regex.exec(palabra)){
          Swal.showValidationMessage(`no se permiten caracteres especiales ni numeros`);
        }
        if (!palabra) {
          Swal.showValidationMessage(`por favor introduzca una palabra`);
        }
        
        return { palabra: palabra, pista: pista };
      },
    }).then((result) => {
      parseInt(numeroDeJugadores);
      parseInt(turno);
      pasarJugador = jugador.turno;
      palabra = result.value.palabra;
      pista = result.value.pista;
      comprobarPalabra();
      imprimirTeclas();
      puntos = 0;
      lineas = [];
      vidaMuñeco = 10;
      contador = 0;
      espacios = 0;
      dibujarLineas();
      imprimirElementos();
      cambioTurno();
    });
    actualizarRanking();
  };
  start();

  function cambioTurno() {
    comprobarGanador();

    jugador = JSON.parse(localStorage.getItem(`jugador${turno}`));

    if (turno == numeroDeJugadores) {
      turno = 1;
    } else {
      turno++;
    }
    if (turno == pasarJugador) {
      cambioTurno();
    }

    localStorage.setItem("turno", JSON.stringify(turno));
    jugador = JSON.parse(localStorage.getItem(`jugador${turno}`));
    vidas = jugador.vidas;
    puntos = jugador.puntos;
    swalClass.fire({
      title: `turno de ${jugador.nombre}`,
      background: "#282a36",
        color: "#fff",
    });
  }

  //funciones de los resultados
  function victoria() {
    //comprueba si es el último nivel

    puntos = puntos + 20;

    añadirPuntos(jugador, puntos);
    //se define las class del po

    swalClass
      .fire({
        title: "Victoria",
        text: ``,
        color: "#fff",
        html: `<div><h2>Has adivinado la palabra</h2><img src="./src/img/victoria.png" class="imgVictoria"alt=""/></div>`,
        background: "#282a36",
        showCancelButton: false,
        confirmButtonText: "siguiente ronda",
      })
      .then((result) => {
        sonidoTeclas.play();

        if (result.isConfirmed) {
          sonidoTeclas.play();

          location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          sonidoTeclas.play();

          window.location.href = "./index.html";
        }
      });
  }

  function comprobarGanador() {
    for (let i = 1; i < numeroDeJugadores + 1; i++) {
      jugador = JSON.parse(localStorage.getItem(`jugador${i}`));
      
      if (jugador.puntos > 200) {
        final();
        return;
      }
    }
  }

  function final() {
    swalClass
      .fire({
        title: "Arcade completado",
        text: `tupuntuación es de ${puntos}`,
        icon: "warning",
        background: "#282a36",
        color: "#fff",
        showCancelButton: true,
        confirmButtonText: "reiniciar",
        cancelButtonText: "salir",
      })
      .then((result) => {
        sonidoTeclas.play();
        if (result.isConfirmed) {
          sonidoTeclas.play();
          resetGame();
          location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          sonidoTeclas.play();
          window.location.href = "./index.html";
        }
      });
  }

  function GameOver() {
    console.log(pasarJugador);
    jugador = JSON.parse(localStorage.getItem(`jugador${pasarJugador}`));
    console.log(jugador);
    puntos = jugador.puntos + 20;
    console.log(puntos);
    añadirPuntos(jugador, puntos);
    actualizarRanking();

    swalClass
      .fire({
        title: "Nadie a adivinado la palabra",
        text: `${jugador.nombre} gana 20 puntos`,
        background: "#282a36",
        color: "#fff",
        showCancelButton: false,
        confirmButtonText: "Siguiente ronda",
      })
      .then((result) => {
        if (result.isConfirmed) {
          sonidoTeclas.play();
          cambioTurno();
          location.reload();
        }
      });
  }

  //botones

  // pistas

  document.getElementById("pistaBtn").onclick = function () {
    sonidoTeclas.play();
    vidas -= 1;
    uptdateVidas(jugador, vidas);
    imprimirElementos();
    mostrarPista.innerHTML = "Pista: - " + pista;
  };

  // Reset

  document.getElementById("resetBtn").onclick = function () {
    sonidoTeclas.play();
    vidas = 10;
    puntos = 0;
    nivel = 0;
    uptdateNivel(jugador, nivel);
    uptdatePuntos(jugador, puntos);
    uptdateVidas(jugador, vidas);
    location.reload();
  };



 
};
