function changePlayerName(e) {
  database
    .ref(`jugador/${jugadorId}`)
    .child("nombre")
    .get()
    .then((snapshot) => {
      e.innerHTML = `<input id='input' placeholder=${snapshot.val()} onkeyup='checkName(this)' autofocus></input>`;
      e.className += " notturn";
      e.onclick = null;
    });
}
function checkName(e) {
  localStorage.setItem("nombreOnline", JSON.stringify(e.value));

  database.ref(`jugador/${jugadorId}`).update({
    nombre: e.value,
  });
}

function getColor() {
  color = {
    r: Math.random() * 252,
    g: Math.random() * 252,
    b: Math.random() * 252,
  };

  return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
}

function addPlayer(position, jugadorId, code, nombre) {
  newJugadorRef = database.ref(`salas/${code}/jugadores/jugador${position}`);
  newJugadorRef.set({
    id: jugadorId,
    turno: position,
    nombre: nombre,
    puntos: 0,
  });
}

function printPlayers(code) {









  maxJugadoresRef
    .child("maxJugadores")
    .get()
    .then((snapshot) => {
      pos = snapshot.val();



      var table=`<div id='code'>codigo de sala <div></div>${code}
      </div></div><div id='start'></div>
      <table id="code-table">
      <tr>
      <th>jugador</th>
      <th>${pos-1}/10</th>
    </tr>
    <tr><div id='players'></div></tr>
    </table>`

      document.getElementById("players").innerHTML=table;

      for (let i = 0; i < snapshot.val(); i++) {
        jugadorRef = database.ref(`salas/${code}/jugadores/jugador${i}`);

        jugadorRef
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
          
              var td = document.createElement("TD");
              var tr = document.createElement("TR");
            td.id = "player" + snapshot.val().id;
            td.style = `color:${getColor()}`;
            document.getElementById("code-table").appendChild(td);
            document.getElementById("code-table").appendChild(tr);
            document.getElementById(td.id).innerHTML = snapshot.val().nombre;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      showError("error al conectar con el servidor");
      console.log(error);
    });
}
function showError(error) {
  Swal.fire({
    title: "ERROR",
    html: `<h1>${error}</h1>`,
    background: "#2c3e50",
    color: "#fff",
    showCancelButton: false,
    showConfirmButton: false,
  });
}

function newGame() {
  const element = document.querySelector(".playerInfo");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  var letters = "0123456789";
  code = "";

  for (var i = 0; i < 4; i++)
    code += letters[Math.floor(Math.random() * letters.length)];
    localStorage.setItem("code", JSON.stringify(code));

  jugadorRef = database.ref(`jugador/${jugadorId}`);
  salaRef = database.ref(`salas/${code}`);
  jugadoresRef = database.ref(`salas/${code}/jugadores`);
  maxJugadoresRef = database.ref(`salas/${code}/maxJugadores`);
  turnoRef = database.ref(`salas/${code}/turno`);

  jugadorRef.update({
    sala: code,
  });

  database.ref(`salas/${code}/status`).set({
    status: 0,
  });

  maxJugadoresRef.set({
    maxJugadores: 1,
  });
  turnoRef.set({
    turno: 1,
  });

  maxJugadoresRef
    .child("maxJugadores")
    .get()
    .then((snapshot) => {
      console.log(snapshot.val());
      pos = snapshot.val();
      maxJugadoresRef.update({
        maxJugadores: pos + 1,
      });

      jugadorRef
        .child("nombre")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            addPlayer(pos, jugadorId, code, snapshot.val());
          }
        })
        .catch((error) => {
          showError("error al conectar con el servidor");
          console.log(error);
        });
    })
    .catch((error) => {
      showError("error al conectar con el servidor");
      console.log(error);
    });

  document.getElementById(
    "game-container"
  ).innerHTML = `<div id='players'></div><div id='start'></div>`;

  jugadoresRef
    .on("child_added", function (e) {
      printPlayers(code);

      maxJugadoresRef
        .child("maxJugadores")
        .get()
        .then((snapshot) => {
          if (snapshot.val() == 3) {
            document.getElementById(
              "start"
            ).innerHTML = `<div id='start' class='button' onclick='startGame()'>Start!</div>`;
          }
        })
        .catch((error) => {
          showError("error al conectar con el servidor");
          console.log(error);
        });
      sessionStorage.setItem("maxJugadores", JSON.stringify(snapshot.val()));
    })
    .catch((error) => {
      showError("error al conectar con el servidor");
      console.log(error);
    });
}

function joinGame(e) {
  // database.ref(`${code}/status`).remove();
  e.innerHTML =
    "<input id='input' placeholder='Game code' onkeyup='checkCode(this)' autofocus></input>";
  e.className += " notturn";
  e.onclick = null;
}

function checkCode(el) {
  if (el.value.length == 4) {
    code = el.value.toUpperCase();
    console.log(code);
    el.onkeyup = null;

    maxJugadoresRef = database.ref(`salas/${code}/maxJugadores`);

    maxJugadoresRef
      .child("maxJugadores")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        pos = snapshot.val();

        database.ref(`salas/${code}/maxJugadores`).update({
          maxJugadores: pos + 1,
        });

        jugadorRef
          .child("nombre")
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              addPlayer(pos, jugadorId, code, snapshot.val());
            } else {
              showError("datos no encontrados");
            }
          })
          .catch((error) => {
            showError("error al conectar con el servidor");
            console.log(error);
          });
      })
      .catch((error) => {
        showError("error al conectar con el servidor");
        console.log(error);
      });

    const element = document.querySelector(".playerInfo");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    statusRef = database.ref(`salas/${code}/status`);

    statusRef
      .child("status")
      .get()
      .then((snapshot) => {
        if (snapshot.val() === 0) {
          document.getElementById("game-container").innerHTML =
            "<div id='waiting'><span class='wait font'>Esperando a empezar la partida</span></div><div id='wcode' class='wait font'>" +
            code +
            "</div>";
        } else {
          showError("partida llena");
        }
      })
      .catch((error) => {
        showError("error al conectar con el servidor");
        console.log(error);
      });
  }
  statusRef.on("child_changed", (e) => {
    startGame();
  });
}

function startGame() {
  database.ref(`salas/${code}/status`).update({
    status: 1,
  });
  sessionStorage.setItem("code", JSON.stringify(code));
  sessionStorage.setItem("turno", JSON.stringify(1));
  sessionStorage.setItem("init", JSON.stringify(0));

  window.location.href = "./Online.html";
}
