function increaseValue() {
  const number = document.getElementById("number");
  sonidoTeclas.play();
  var value = parseInt(number.value, 10);
  value > 9 ? (value = 9) : "";
  value++;
  number.value = value;
}

function decreaseValue() {
  const number = document.getElementById("number");
  sonidoTeclas.play();
  var value = parseInt(number.value, 10);
  value < 3 ? (value = 3) : "";
  value--;
  number.value = value;
}

function NuevaPartida() {
  localStorage.setItem("modoDeJuego", JSON.stringify(1));

  Swal.fire({
    title:
      "<img src='./src/img/arcade.png' width='400px' height='300px' alt='modoarcade'>",
    html: "<div src='./src/img/galaxia.png'><h2 style='color: white;'>intenta adivinar las palabras con la maxima vida posible. <br>*una pista resta 1 <color style='color:pink'>vida</color> y 10 <color style='color:aqua'>puntos</color></h2>  </div> ",
    background: "#2c3e50 url(/src/img/galaxia.png)",
    htmlContainer: "arcadeBG",
    showCancelButton: false,
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      const jugador = {
        id: 1,
        vidas: 10,
        puntos: 0,
        nivel: 0,
      };
      localStorage.setItem("jugador", JSON.stringify(jugador));
      window.location.href = "./arcade.html";
    }
  });
}

function NuevaPartidaModoLibre() {
  localStorage.setItem("modoDeJuego", JSON.stringify(2));
  const multiBtn = Swal.mixin({
    customClass: {
      confirmButton: "multiBtn",
    },
    buttonsStyling: false,
  });
  multiBtn
    .fire({
      title: "Cuantos jugadores",
      html: `<form>
        <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
        <input type="number" disabled id="number" min ="2" max="10" value="2" />
        <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
      </form>`,
      background: "#2c3e50",
      confirmButtonText: "Confirmar",
      focusConfirm: false,
      color: "#fff",
      preConfirm: () => {
        const number = Swal.getPopup().querySelector("#number").value;
        return { number: number };
      },
      allowOutsideClick: () => {
        return false;
      },
    })
    .then((result) => {
      sonidoTeclas.play();
      var htmlNombreJugador = "";
      const numeroDeJugadores = number.value;
      console.log(`hay ${number.value} jugadores`);
      for (let i = 0; i < numeroDeJugadores; i++) {
        htmlNombreJugador += `
        <input type="text" class="inputJugador" id="jugador${
          i + 1
        }" placeholder="nombre del jugador${
          i + 1
        }" required minlength="1" maxlength="8" " size="10" value="jugador${
          i + 1
        }" required>
      `;
      }
      multiBtn
        .fire({
          title: "Nombre de los jugadores",
          html: `<form>${htmlNombreJugador}</form>`,
          background: "#2c3e50",
          confirmButtonText: "Confirmar",
          focusConfirm: false,
          color: "#fff",
          preConfirm: () => {
            for (let i = 0; i < numeroDeJugadores; i++) {
              NombreJugador = Swal.getPopup().querySelector(
                `#jugador${i + 1}`
              ).value;
              if (!NombreJugador) {
                Swal.showValidationMessage(
                  `por favor introduzca el nombre de todos los jugadores`
                );
              }
            }
          },
          allowOutsideClick: () => {
            return false;
          },
        })
        .then(() => {
          for (let i = 0; i < numeroDeJugadores; i++) {
            const NombreJugador = Swal.getPopup().querySelector(
              `#jugador${i + 1}`
            ).value;
            const jugador = {
              id: `jugador${i + 1}`,
              turno: i + 1,
              puntos: 0,
              nombre: NombreJugador,
              palabra: "",
            };
            numeroDeJugadores;
            localStorage.setItem(`jugador${i + 1}`, JSON.stringify(jugador));
            localStorage.setItem("turno", JSON.stringify(1));
            localStorage.setItem("numeroDeJugadores", numeroDeJugadores);
            console.log(NombreJugador);
          }

          window.location.href = "./ahorcado.html";
        });
    });
}

function partidaOnline() {


  Swal.fire({
    title:
      "<img src='./src/img/arcade.png' width='400px' height='300px' alt='modoarcade'>",
    html: "<div src='./src/img/galaxia.png'><h2 style='color: white;'><color style='color:red'>Abierto</color> en la proxima <color style='color:red'>actualización</color></div> ",
    background: "#2c3e50 url(/src/img/galaxia.png)",
    htmlContainer: "arcadeBG",
    showCancelButton: false,
    confirmButtonText: "OK",
  })





  // localStorage.setItem("modoDeJuego", JSON.stringify(3));
  // sessionStorage.clear()
  // clearSala()
  // Swal.fire({
  //   html: `<h1>Conectando</h1>`,
  //   background: "#2c3e50",
  //   focusConfirm: false,
  //   color: "#fff",
  //   showConfirmButton: false,
  //   allowOutsideClick: () => {
  //     return false;
  //   },
  // });

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     Swal.fire({
  //       title: "",
  //       html: `
  //     <link rel="stylesheet" href="src/css/menu.css">
  //     <div id="game-container">
  //     </div>
  //     <div class="playerInfo">
  //     <div id="playerNameBtn" class="button" onclick="changePlayerName(this)">cambiar nombre</div>
  //       <div class="button" onclick="newGame(); this.onclick = null;">Crear sala</div>
  //     <div class="button" onclick="joinGame(this)">Unirse a sala</div>
  //       </div>
  //       <div>
  //       </div>
  //     </div>
  //     <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
  //     <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
  //     <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
  //       <script src="./src/js/firebaseConfig.js"></script>
  //       <script src="./src/js/Online.js"></script>
      
  //     `,
  //       background: "#2c3e50",
  //       color: "#fff",
  //       showCancelButton: false,
  //       showConfirmButton: false,
  //       allowOutsideClick: () => {
  //         return false;
  //       },
  //     }).then((result) => {});
  //   }
  // });
}

function selectDificultad() {
  localStorage.setItem("modoDeJuego", JSON.stringify(4));

  Swal.fire({
    title: "seleccione dificuldad",
    html: '<select class="selectDificultad"><option selected value="1">Fácil</option><option value="2">Normal</option></option><option value="3">Difícil</option></select>',
    background: "#2c3e50",
    color: "#fff",
    showCancelButton: false,
    confirmButtonText: "OK", 
    confirmButtonColor: 'teal',

  }).then((result) => {
    if (result.isConfirmed) {
      const dificultad =
        Swal.getPopup().querySelector(".selectDificultad").value;
      localStorage.setItem("dificultad", JSON.stringify(dificultad));
      window.location.href = "./versus.html";
    }
  });
}
