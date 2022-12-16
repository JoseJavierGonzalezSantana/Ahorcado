


  maxJugadoresRef
  .child("maxJugadores")
  .get()
  .then((snapshot) => {
    pos = snapshot.val();

    for (let i = 0; i < snapshot.val(); i++) {
      jugadorRef = database.ref(`salas/${code}/jugadores/jugador${i}`);

      jugadorRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            var el = document.createElement("DIV");
            el.id = "player" + snapshot.val().id;
            el.style = `color:${getColor()}`;
            document.getElementById("players").appendChild(el);
            document.getElementById(el.id).innerHTML = snapshot.val().nombre;
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















  sessionStorage.setItem("code", JSON.stringify(code));
