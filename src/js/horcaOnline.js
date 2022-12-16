// Array de los turnos
var puntos; //puntuación del jugador
var turnoActual; // nivel donde se encuentra el jugador
var palabra; //palabra seleccionada
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

const swalClass = Swal.mixin({
  customClass: {
    confirmButton: "swalButtonConfir",
    cancelButton: "swalButtonCancel",
  },
  buttonsStyling: false,
});

//Get de los elementos
var code = JSON.parse(sessionStorage.getItem("code"));
var turno = JSON.parse(sessionStorage.getItem("turno")); //optiene los datos del jugador devuelto en objeto
var jugadorId = JSON.parse(sessionStorage.getItem("id"));
var jugador = JSON.parse(sessionStorage.getItem(`jugador${turno}`));
var numeroDeJugadores = JSON.parse(sessionStorage.getItem("maxJugadores"));
var jugadores = [""];
var marcador = document.getElementById("marcador");
var mostrarturno = document.getElementById("turno");
var mostrarPista = document.getElementById("pista");
var palabraOculta = document.getElementById("palabra");
turnoRef = database.ref(`salas/${code}/turno`);
var palabraOculta = document.getElementById("palabra");

function setDatos(code) {
  maxJugadoresRef = database.ref(`salas/${code}/maxJugadores`);
  maxJugadoresRef
    .child("maxJugadores")
    .get()
    .then((snapshot) => {
      const pos = snapshot.val();
      console.log(snapshot.val());
      sessionStorage.setItem(`maxJugadores`, JSON.stringify(pos));
      for (let i = 1; i < pos; i++) {
        jugadorRef = database.ref(`salas/${code}/jugadores/jugador${i}`);
        jugadorRef
          .get()
          .then((snapshot) => {
            const jugador = {
              id: snapshot.val().id,
              nombre: snapshot.val().nombre,
              puntos: snapshot.val().puntos,
              turno: snapshot.val().turno,
            };
            sessionStorage.setItem(`jugador${i}`, JSON.stringify(jugador));
          })
          .catch((error) => {
            console.error(error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

window.onload = function () {
  function ranking() {
    rankingPosicion = document.createElement("div");
    rankingPosicion.setAttribute("class", "ranking");
    for (let i = 1; i < numeroDeJugadores; i++) {
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
    for (let i = 1; i < numeroDeJugadores; i++) {
      jugadores.push(JSON.parse(sessionStorage.getItem(`jugador${i}`)));
    }

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
  function imprimirElementos() {
    if (vidaMuñeco == 0) {
      vidas -= 1;
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
  }

  // OnClick en el teclado
  click = function () {
    listaTeclas.onclick = function () {
      sonidoTeclas.play();
      this.onclick = null;
      var palabraAcertada = this.innerHTML;
      database.ref(`salas/${code}/click`).update({
        click: palabraAcertada,
      });
    };
  };

  function comprobarPalabra() {
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
    setDatos(code);

    
    if (jugadorId == jugador.id) {
      Swal.fire({
        title: `turno de ${jugador.nombre}`,
        html: `<h2>Escriba la palabra</h2><input type="text" id="palabraOculta" class="swal2-input" placeholder="Palabra oculta">
      <input type="text" id="pistaJugador" class="swal2-input" placeholder="Pista">`,
        confirmButtonText: "Empezar ronda",
        color: "#fff",
        background: "#1b583b",
        focusConfirm: false,
        allowOutsideClick: () => {
          return false;
        },
        preConfirm: () => {
          let regex =
            /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
          const palabra = Swal.getPopup().querySelector("#palabraOculta").value;
          var pista = Swal.getPopup().querySelector("#pistaJugador").value;
          if (!pista) {
            pista = `${jugador.nombre} No ha dejado pista`;
          }

          if (!regex.exec(palabra)) {
            Swal.showValidationMessage(
              `no se permiten caracteres especiales ni numeros`
            );
          }
          if (!palabra) {
            Swal.showValidationMessage(`por favor introduzca una palabra`);
          }

          return { palabra: palabra, pista: pista };
        },
      }).then((result) => {
        database.ref(`salas/${code}/palabra`).set({
          palabra: result.value.palabra,
        });
      });
    } else {
      Swal.fire({
        title: `${jugador.nombre} esta escribiendo la palabra`,
        background: "#2c3e50",
        color: "#fff",
        showConfirmButton: false,
        allowOutsideClick: () => {
          return false;
        },
      });
    }

    actualizarRanking();
  };

 

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      imprimirTeclas();
      init = JSON.parse(sessionStorage.getItem("init"));

      if (init === 0) {
        setDatos(code);
        let timerInterval;
        Swal.fire({
          title: `esperando jugadores`,
          timer: 2000,
          background: "#2c3e50",
          color: "#fff",
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {}, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
            sessionStorage.setItem("init", JSON.stringify(1));
            location.reload();
          },
        }).then((result) => {
          sessionStorage.setItem("init", JSON.stringify(1));
          location.reload();
        });
      } else {
        Swal.fire({
          color: "#fff",
          background: "#282a36",
          showCancelButton: false,
          confirmButtonText: "Listo",
        }).then(() => {
          start()
        });
      }
    } else {
      location.reload();
    }
  });

  function cambioTurno() {
    // comprobarGanador();
    jugador = JSON.parse(sessionStorage.getItem(`jugador${turno}`));

    if (turno == numeroDeJugadores) {
      turno = 1;
    } else {
      turno++;
    }
    if (turno == pasarJugador) {
      cambioTurno();
    }

    puntos = jugador.puntos;

    uptdateFirePuntos(puntos, turno, code);
    uptdateFireTurno(turno, code);
  }

  //funciones de los resultados
  function victoria() {
    puntos = puntos + 20;
    uptdateFirePuntos(puntos, turno, code);
    database.ref(`salas/${code}/ganador`).update({
      ganador: jugador.id,
    });

    //se define las class del po
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


  

  function GameOver() {
    jugador = JSON.parse(sessionStorage.getItem(`jugador${pasarJugador}`));
    puntos = jugador.puntos + 20;
    console.log(puntos);
    uptdateFirePuntos(puntos,turno,code)
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
          reset()
        }
      });
  }

  database.ref(`salas/${code}/palabra`).on("child_added", (e) => {
    console.log(jugador);
    palabra = e.val();
    sessionStorage.setItem(`palabra`, JSON.stringify(palabra));
    palabra = JSON.parse(sessionStorage.getItem("palabra"));
    pasarJugador = jugador.turno;
    console.log(pasarJugador);
    lineas = [];
    vidaMuñeco = 10;
    contador = 0;
    espacios = 0;
    dibujarLineas();
    imprimirElementos();
    comprobarPalabra();

    cambioTurno();
  });

  database.ref(`salas/${code}/turno`).on("child_changed", (e) => {
    jugador = JSON.parse(sessionStorage.getItem(`jugador${turno}`));
    if (jugadorId == jugador.id) {
      swalClass.fire({
        title: `es tu turno`,
        background: "#282a36",
        color: "#fff",
      });
    } else {
      swalClass.fire({
        title: `turno de ${jugador.nombre}`,
        background: "#282a36",
        color: "#fff",
        showConfirmButton: false,
        allowOutsideClick: () => {
          return false;
        },
      });
    }
  });

  database.ref(`salas/${code}/click`).on("child_changed", (e) => {
    console.log(e.val());
    var palabraAcertada = e.val();
    var click = document.getElementById(palabraAcertada);
    console.log(click);
    for (var i = -1; i < palabra.length; i++) {
      if (palabra[i] === palabraAcertada) {
        lineas[i].innerHTML = palabraAcertada;
        contador += 1;
      }
    }
    var j = palabra.indexOf(palabraAcertada);

    if (j === -1) {
      sonidoFallo.play();
      vidaMuñeco -= 1;
      click.setAttribute("class", "fallado");
      imprimirElementos();
      animate(vidaMuñeco);
      cambioTurno();
    } else {
      SonidoAcierto.play();
      click.setAttribute("class", "acertado");
      puntos = puntos + 10;
      uptdateFirePuntos(puntos, turno, code);
      imprimirElementos();
    }

    actualizarRanking();
  });

  database.ref(`salas/${code}/ganador`).on("child_added", (e) => {
    jugador = JSON.parse(sessionStorage.getItem(`jugador${turno}`));

    swalClass
      .fire({
        title: "Victoria",
        text: ``,
        color: "#fff",
        html: `<div><h2>${jugador.nombre} ha adivinado la palabra</h2><img src="./src/img/victoria.png" class="imgVictoria"alt=""/></div>`,
        background: "#282a36",
        showCancelButton: false,
        confirmButtonText: "siguiente ronda",
        allowOutsideClick: () => {
          return false;
        },
      })
      .then((result) => {
        sonidoTeclas.play();
        reset()
       
      });
  });


  function reset(){
    sessionStorage.clear();
          sessionStorage.setItem("code", JSON.stringify(code));
          sessionStorage.setItem("turno", JSON.stringify(turno));
          sessionStorage.setItem("init", JSON.stringify(0));
          database.ref(`salas/${code}/ganador`).remove();
          database.ref(`salas/${code}/click`).remove();
          database.ref(`salas/${code}/palabra`).remove();
          location.reload();

  }
  //botones

  // pistas

  document.getElementById("pistaBtn").onclick = function () {
  //   sonidoTeclas.play();
  //   vidas -= 1;
  //   uptdateVidas(jugador, vidas);
  //   imprimirElementos();
  //   mostrarPista.innerHTML = "Pista: - " + pista;
   };
};
