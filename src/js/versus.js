window.onload = function () {
  var palabras;
  var palabra; //palabra seleccionada
  var linea; // palabra oculta
  var lineas = []; // array de lineas de las palabras ocultas
  var contador; // contador de  acierto por lineas
  var espacios; // numeros de espacios que contiene una palabra
  var vidaMuñeco;
  var dificultad;
  var ia;
  var iaPuntos;
  var misPuntos;
  var ganador;

  // Get elements
  const swalClass = Swal.mixin({
    customClass: {
      confirmButton: "swalButtonConfir",

      cancelButton: "swalButtonCancel",
    },
    buttonsStyling: false,
  });

  //Get de los elementos
  var palabraOculta = document.getElementById("palabra");

  // selección de nivel

  // Crear lineas de la palabra oculta
  dibujarLineas = function () {
    acierto = document.createElement("ul"); //crea el ul para desglosar la palabra
    //añade la letras en un li
    for (var i = 0; i < palabra.length; i++) {
      acierto.setAttribute("id", "my-palabra");
      linea = document.createElement("li");
      linea.setAttribute("class", "linea");
      //comprueba los es pacios de la palabra

      if (palabra[i] === "-") {
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

    // mostrarPuntos.innerHTML = "Tienes " + puntos + " puntos";
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
        turnoDeLaIa();

        sonidoFallo.play();
        vidaMuñeco -= 1;

        this.setAttribute("class", "fallado");
        imprimirElementos();
        animate(vidaMuñeco);
        turnoDeLaIa();
      } else {
        misPuntos++;
        SonidoAcierto.play();
        this.setAttribute("class", "acertado");
        imprimirElementos();
      }
    };
  };

  // Empieza el juego
  start = function () {
    palabras = [
      "ADAPTACION",
      "Esternocleidomastoideo",
      "Fotosinteticamente",
      "Ovoviviparo",
      "barco",
      "instalaciones",
      "estalagmita",
      "anacleto",
      "desarollar",
      "ronronear",
      "tejemaneje",
      "oscuro",
      "juego",
      "geografia",
      "animales",
      "decoracion",
      "inclemente",
      "carrera",
      "salud",
      "descalificacion",
      "combate",
      "comida",
      "game over",
      "torneo",
      "agua",
      "carnet",
      "amapola",
      "circulo",
      "entrada",
      "ortografia",
      "polivalente",
      "dictado",
      "coche",
      "aire acondicionado",
      "avion",
      "ruleta",
      "alfabetico",
      "loteria",
      "crucigrama",
      "hormiga",
      "rinoceronte",
      "disco",
      "camioneta",
      "boton",
      "agil",
      "dedo",
      "trabalenguas",
      "menta",
      "duodecimo",
      "Babelico",
      "Ful",
      "huevo",
      "Zonzo",
      "zona",
      "español",
      "ñoñeria",
      "tema",
      "diamante",
      "sol",
      "pan",
      "mar",
      "luz",
      "uña",
      "uvas",
      "iglu",
      "pez",
      "oca",
      "yo",
      "dar",
      "sal",
      "saco",
      "rio",
      "ajo",
      "dos",
      "miel",
      "rey",
    ];

    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabra = palabra.toUpperCase();

    palabra = palabra.replace(/\s/g, "-");

    console.log(palabra);
    dificultad = JSON.parse(localStorage.getItem("dificultad"));

    imprimirTeclas();
    lineas = [];
    vidaMuñeco = 10;
    contador = 0;
    espacios = 0;
    dibujarLineas();
    imprimirElementos();
    ia = 0;
    iaPuntos = 0;
    misPuntos = 0;
  };

  start();

  //funciones de los resultados
  function victoria() {
    if (iaPuntos > misPuntos) {
      ganador = "la ia";
      puntosGanador = iaPuntos;
      puntosPerdedor = misPuntos;
    } else {
      ganador = "EL jugador";
      puntosGanador = misPuntos;
      puntosPerdedor = iaPuntos;
    }
    swalClass
      .fire({
        title: "Y el ganador es...",
        text: ``,
        color: "#fff",
        html: `<h1>${ganador} con ${puntosGanador} aciertos a ${puntosPerdedor} aciertos</h1>`,
        background: "#1b583b",
        showCancelButton: true,
        confirmButtonText: "Siguiente nivel",
        cancelButtonText: "Salir",
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

  function GameOver() {
    swalClass
      .fire({
        title: "Empate",
        text: `nadie adivino la palabra`,
        background: "#1b583b",
        color: "#fff",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Reintentar",
        cancelButtonText: "Salir",
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

  function AccionDeLaIa() {
    setTimeout(() => {
      if (ia == 0) {
        var letras = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "Ñ",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        var vocales = ["A", "E", "I", "O", "U"];
        var consonantes = [
          "B",
          "C",
          "D",
          "F",
          "G",
          "H",
          "J",
          "K",
          "L",
          "M",
          "N",
          "Ñ",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        do {
          switch (dificultad) {
            case "1":
              var LetraElegida = document.getElementById(
                letras[Math.floor(Math.random() * 27)]
              );
            
              break;
            case "2":

              var LetraElegida = document.getElementById(
                vocales[Math.floor(Math.random() * 5)]
              );

              if (LetraElegida.onclick == null) {
                LetraElegida = document.getElementById(
                  consonantes[Math.floor(Math.random() * 22)]
                );
              }

              var palabraFinal = Math.round(lineas.length / 2);
              if (contador == lineas.length) break;

              if (contador >= palabraFinal) {
                LetraElegida = document.getElementById(
                  palabra[Math.floor(Math.random() * lineas.length)]
                );
                
              }

           
              break;
            case "3":  
            var LetraElegida = document.getElementById(
              vocales[Math.floor(Math.random() * 5)]
            );    
            if (contador == lineas.length) break;      
            
              LetraElegida = document.getElementById(
                palabra[Math.floor(Math.random() * lineas.length)]
              );
              
            
           
              break;
          }
        } while (LetraElegida.onclick == null);

        var palabraAcertada = LetraElegida.innerHTML;
        LetraElegida.onclick = null;

        sonidoTeclas.play();
        for (var i = 0; i < palabra.length; i++) {
          if (palabra[i] === palabraAcertada) {
            lineas[i].innerHTML = palabraAcertada;
            contador += 1;
          }
        }

        var j = palabra.indexOf(palabraAcertada);
        if (j === -1) {
          sonidoFallo.play();
          vidaMuñeco -= 1;

          LetraElegida.setAttribute("class", "fallado");
          imprimirElementos();
          animate(vidaMuñeco);
        } else {
          iaPuntos++;
          SonidoAcierto.play();
          LetraElegida.setAttribute("class", "acertado");
          imprimirElementos();
          turnoDeLaIa();
        }

        ia = 1;
      } else {
        ia = 0;
      }
    }, 500);
  }
  function turnoDeLaIa() {
    let timerInterval;
    Swal.fire({
      title: `turno de la CPU`,
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
        AccionDeLaIa();
      },
    }).then((result) => {
      AccionDeLaIa();
    });
  }

  // Reset

  document.getElementById("resetBtn").onclick = function () {
    location.reload();
  };
};
