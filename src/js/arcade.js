window.onload = function () {
  var nivel; // Array de los niveles
  var puntos; //puntuación del jugador
  var nivelActual; // nivel donde se encuentra el jugador
  var palabra; //palabra seleccionada
  var linea; // palabra oculta
  var lineas = []; // array de lineas de las palabras ocultas
  var vidas; // vidas
  var contador; // contador de  acierto por lineas
  var espacios; // numeros de espacios que contiene una palabra
  var vidaMuñeco;
  // Get elements
  const swalClass = Swal.mixin({
    customClass: {
      confirmButton: "swalButtonConfir",
      cancelButton: "swalButtonCancel",
    },
    buttonsStyling: false,
  });
  var jugador = JSON.parse(localStorage.getItem("jugador")); //optiene los datos del jugador devuelto en objeto

  //Get de los elementos
  
  var mostrarVidas = document.getElementById("vidas");
  var mostrarNivel = document.getElementById("nivel");
  var mostrarPista = document.getElementById("pista");
  var mostrarPuntos = document.getElementById("puntos");
  var palabraOculta = document.getElementById("palabra");

  // selección de nivel
  var selectNivel = function () {
for (let i = 0; i < 9; i++) {
  if (nivelActual === nivel[i]) {
    mostrarNivel.innerHTML = `nivel ${i}`;
  }
}
  };

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
      vidas -= 1;
      uptdateVidas(jugador, vidas);
      MenosVida();
    }
    mostrarVidas.innerHTML = '<color style="color: pink;">' + vidas + '</color> vidas';
    mostrarPuntos.innerHTML = '<color style="color: aqua;" >' + puntos + '</color> puntos';;
    if (vidas < 0) {
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
        vidaMuñeco -= 1;
        this.setAttribute("class", "fallado");
        imprimirElementos();
        animate(vidaMuñeco);
      } else {
        SonidoAcierto.play();
        this.setAttribute("class", "acertado");
        imprimirElementos();
      }
    };
  };

  // Empieza el juego
  start = function () {
    nivel = [
      [
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
      ],
      [
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
      ],
      [
        "combate",
        "comida",
        "game over",
        "torneo",
        "agua embotellada",
        "carnet",
        "amapola",
        "circulo",
        "entrada",
        "ortografia",
      ],
      [
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
      ],
      [
        "rinoceronte",
        "disco",
        "camioneta",
        "boton",
        "agil",
        "dedo",
        "trabalenguas",
      ],
      [
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
      ],
      [
        "la felicidad",
        "paciencia y tiempo",
        "no entran moscas",
        "el que se pica",
        "lo veras todo mas claro",
        "lo que siembres hoy",
        "no hay mal que",
        "Cuando el sabio señala la luna",
        "antes de actuar",
      ],
      [
        "mas vale prevenir",
        "al mal tiempo",
        "de tal palo",
        "a quien madruga",
        "perro ladrador",
        "el que tiene boca",
        "no es oro",
      ],
      [
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
      ],
      ["yo", "dar", "sal", "saco", "rio", "ajo", "dos", "miel", "rey"],
    ];
    nivelActual = nivel[jugador.nivel]; //comprobar el nivel
    palabra = nivelActual[Math.floor(Math.random() * nivelActual.length)];
    palabraPista = palabra;
    palabra = palabra.toUpperCase();
    palabra = palabra.replace(/\s/g, "-");
    imprimirTeclas();
    puntos = jugador.puntos;
    lineas = [];
    vidaMuñeco = 10;
    vidas = jugador.vidas;
    contador = 0;
    espacios = 0;
    dibujarLineas();
    imprimirElementos();
    selectNivel();
    console.log(palabra);
  };

  start();

  //funciones de los resultados
  function victoria() {
    nivel = jugador.nivel;
    console.log(nivel);

    nivel++;
    puntos = puntos + 10 * nivel;
    uptdatePuntos(jugador, puntos);
    uptdateNivel(jugador, nivel);

    //comprueba si es el último nivel
    if (nivel > 9) {
      final();
      return;
    }

    swalClass
      .fire({
        title: "Victoria",
        text: ``,
        color: "#fff",
        html: `<div><h2>te quedan ${vidas} vidas</h2><img src="./src/img/victoria.png" class="imgVictoria"alt=""/></div>`,
        background: "#282a36",
        showCancelButton: true,
        confirmButtonText: "siguiente nivel",
        cancelButtonText: "guardar y salir",
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
    nivel = 0;
    puntos = 0;
    vidas = 10;
    uptdatePuntos(jugador, puntos);
    uptdateVidas(jugador, vidas);
    uptdateNivel(jugador, nivel);

    swalClass
      .fire({
        title: "Game over",
        text: `te quedastes sin vidas`,
        icon: "warning",
        background: "#282a36",
        color: "#fff",
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

  function final() {
  
  
    swalClass
      .fire({
        title: "Arcade completado",
        icon: "warning",
        background: "#282a36",
        html: '<p>Your score is <b style="color:pink;"></b> </p>',
        color: "#fff",
        showCancelButton: true,
        confirmButtonText: "reiniciar",
        cancelButtonText: "salir",
        didOpen: () => {
          const b = Swal.getHtmlContainer().querySelector('b')
          var counter = 0;
          timerInterval = setInterval(() => {
            if (counter !== puntos) {
                counter++;
            }
      b.textContent = counter
          }, 5)
        },
      })
      .then((result) => {
        sonidoTeclas.play();

        if (result.isConfirmed) {
          sonidoTeclas.play();

          vidas = 10;
          puntos = 0;
          nivel = 0;
          uptdateNivel(jugador, nivel);
          uptdatePuntos(jugador, puntos);
          uptdateVidas(jugador, vidas);
          location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          sonidoTeclas.play();

          window.location.href = "./index.html";
        }
      });
  }

  function MenosVida() {
    swalClass
      .fire({
        title: "¡¡¡Una vida menos!!!",
        text: `te quedan ${vidas} vidas`,
        icon: "warning",
        background: "#282a36",
        color: "#fff",
        showCancelButton: false,
        confirmButtonText: "Reintentar nivel",
      })
      .then((result) => {
        if (result.isConfirmed) {
          sonidoTeclas.play();
          location.reload();
        }
      });
  }

  //botones

  // pistas

  document.getElementById("pistaBtn").onclick = function () {
    sonidoTeclas.play();
    vidaMuñeco -= 1;
    animate(vidaMuñeco);
    puntos = puntos - 10 ;
    uptdateVidas(jugador, vidas);
    imprimirElementos();
    pistas = [
      [
        "Cambio o cambios que se hacen para que algo quede mejor.",
        "Músculo que está situado en el cuello y tiene la función de permitir el giro.",
        "De la fotosíntesis o que tiene relación con este proceso químico de las plantas.",
        "Se aplica a los animales cuyos embriones se desarrollan totalmente en el huevo.",
        "cuerpo flotante de forma simétrica.",
        "conjunto de medios o recursos necesarios para llevar a cabo los procesos de fabricación y de servicio.",
        "se forma en el suelo de una cueva.",
        "nombre de persona.",
        "hacer que algo crezca o progrese.",
        "ruido que produce un gato.",
      ],
      [
        "actividad intensa que realiza una persona o cosa.",
        "Que tiene poca luz o carece de ella.",
        "Actividad que se realiza generalmente para divertirse.",
        "Ciencia que estudia y describe la superficie de la Tierra en su aspecto físico.",
        "Reino al que pertenecen los organismos pluricelulares que se nutren de sustancias elaboradas por otros seres vivos.",
        "Colocación y combinación de elementos funcionales y ornamentales en un lugar.",
        "Que carece de clemencia.",
        "Acción de ir corriendo de un sitio a otro.",
        "Buen estado, marcha o funcionamiento de un ser vivo.",
        "expulsar de una competición.",
      ],
      [
        "Enfrentamiento físico entre personas o animales.",
        "Alimento que se toma en el almuerzo o en la cena.",
        "frase final de un juego.",
        "Conjunto de pruebas en que una serie de contrincantes compiten por conseguir el triunfo.",
        "líquido en una botella.",
        "documento que acredita la identidad de una persona.",
        "Planta herbácea de tallo erecto, flores grandes y semilla negruzca.",
        "Figura geométrica delimitada por una circunferencia.",
        "Papel impreso que se obtiene a cambio de una cantidad determinada de dinero y da derecho a asistir a un espectáculo público.",
        "Conjunto de las normas de escritura de una lengua.",
      ],
      [
        "tiene varios valores.",
        "Conjunto indicaciones para escribir más rapido.",
        "Vehículo para circular por tierra, está destinado al transporte de personas.",
        "Sistema de ventilación mediante el cual se consigue mantener un recinto cerrado a la temperatura y humedad deseadas.",
        "Vehículo volador.",
        "Juego de azar que se juega principalmente en los casinos.",
        "Que sigue el orden convencional del alfabeto.",
        "Juego público de azar en el que los participantes compran un billete con un número impreso.",
        "Pasatiempo que consiste en rellenar con letras las casillas.",
        "Insecto de color generalmente negro o rojizo.",
      ],
      [
        "Mamífero paquidermo de hasta 5 metros de longitud.",
        "Elemento de almacenamiento de datos en forma magnética u óptica.",
        " automóvil menor que el camión que sirve para el transporte de mercancías.",
        "Pieza pequeña y redonda, que va atornillada o clavada a un objeto del que sobresale y sirve de detonador.",
        "facilidad para moverse con soltura y rapidez.",
        "Parte alargada en que terminan la mano y el pie de los vertebrados.",
        "Palabra o frase difícil de pronunciar, en especial la que se propone como juego.",
      ],
      [
        "Planta herbácea de hojas verdes y muy aromáticas y flores de color blanco",
        "Indica que el nombre al que acompaña o al que sustituye al lugar número 12 en una serie.",
        "Que es confuso o crea confusión.",
        "Que es falso, vano o de mala calidad, o que no da el resultado que se esperaba.",
        "Cuerpo redondo u ovalado.",
        "Que no tiene viveza, energía, ni gracia.",
        "Superficie acotada, que se distingue de lo que la rodea.",
        "Relativo a España, país de Europa occidental, o a sus habitantes.",
        "Dicho o hecho melindroso o mojigato, propio de una persona ñoña.",
        "Asunto o materia sobre la que se trata en una conversación.",
      ],
      [
        "estado de animo.",
        "Lo más desean en el mundo.",
        "en boca cerrada.",
        "ajos come.",
        "Si te rodeas de luz",
        "recogerás mañana.",
        "por bien no venga.",
        "el tonto se fija en el dedo.",
        "piensa.",
      ],
      [
        "que curar.",
        "buna cara.",
        "tal astilla",
        "Dios le ayuda.",
        "poco mordedor.",
        "se equivoca.",
        "todo lo que reluce.",
      ],
      [
        "Carbono puro cristalizado en el sistema cúbico.",
        "saca los cuernos al ___",
        "Alimento básico que se elabora con una mezcla de harina.",
        "Masa de agua salada.",
        "Forma de energía que ilumina las cosas.",
        "Placa córnea y dura que cubre y protege la parte superior de la punta de los dedos.",
        "Animal vertebrado acuático.",
        "Construcción de hielo en forma de media esfera y con una única abertura cerrada.",
        " de plumaje por lo general blanco o gris.",
      ],
      [
        "la palabra más egoísta.",
        "Poner a disposición de una persona o una cosa algo material o inmaterial.",
        "Sustancia blanca, cristalina, muy soluble en el agua.",
        "Recipiente de tela, papel u otro material flexible.",
        "Corriente natural de agua que fluye permanentemente.",
        "Planta herbácea de hojas largas, en forma de espada.",
        "Indica que el nombre al que acompaña o al que sustituye está 2 veces.",
        "Sustancia espesa, pegajosa y muy dulce que elaboran las abejas.",
        "Soberano de una monarquía o un reino.",
      ],
    ];

    var nivelIndex = nivel.indexOf(nivelActual);
    var hintIndex = nivelActual.indexOf(palabraPista);
    mostrarPista.innerHTML = "Pista: - " + pistas[nivelIndex][hintIndex];
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