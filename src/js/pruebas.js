
// NOTE - INCLUDE YOUR FIREBASE CONFIG HERE FOR ANYTHING TO WORK:
const firebaseConfig = {
  apiKey: "AIzaSyCFBVawOyCtzcQNvHoXFwg2nrzbahfwE3A",
  authDomain: "ahorcado-dfcdc.firebaseapp.com",
  databaseURL:
    "https://ahorcado-dfcdc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ahorcado-dfcdc",
  storageBucket: "ahorcado-dfcdc.appspot.com",
  messagingSenderId: "592080962384",
  appId: "1:592080962384:web:52f146078444c1bd7c6255",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

const playerNameInput = document.querySelector("#player-name");
const playerName = document.querySelector("#player-color");

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (user) {
    //You're logged in!
    jugadorId = user.uid;
    jugadorRef = database.ref(`jugador/${jugadorId}`);

    jugadorRef.set({
      id: jugadorId,
      nombre: "anonimo",
      sala: "",
    });

    //Remove me from Firebase when I diconnect
    jugadorRef.onDisconnect().remove();

    //Begin the game now that we are signed in
  } else {
    //You're logged out.
  }
});

firebase
  .auth()
  .signInAnonymously()
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  });

playerName.addEventListener("click", (e) => {
  
    database.ref(`jugador/${jugadorId}`).update({
      nombre: playerNameInput.value
    });
  
  console.log("hizo clik");
 
});

function getColor(){

	color = {
		r: Math.random() * 252,
		g: Math.random() * 252,
		b: Math.random() * 252
	};
	

	return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
}
function printPlayers(code){

  

  maxJugadoresRef.child("maxJugadores").get().then((snapshot) => {
    pos=snapshot.val();
 
for (let i = 0; i < snapshot.val(); i++) {
  jugadorRef = database.ref(`salas/${code}/jugadores/jugador${i}`);
 

  jugadorRef.child("nombre").get().then((snapshot) => {
    if (snapshot.exists()) {

      var el = document.createElement("DIV");
      el.id = "player" + snapshot.val();
      el.style = `color:${getColor()}`;
      document.getElementById("players").appendChild(el);
      document.getElementById(el.id).innerHTML = snapshot.val();

    }

  })
  .catch((error) => {
    console.error(error);
  })


  
}

   
  })
  .catch((error) => {
    console.error(error);
  })




  
}
function addPlayer(position,jugadorId,code,nombre){
  
  newJugadorRef = database.ref(`salas/${code}/jugadores/jugador${position}`);

  newJugadorRef.set({
 id: jugadorId,
 turno: 0,
 nombre: nombre,
 palabra: "",
 puntos: 0,
});
}

function newGame() {
  var letters = "ABCDEFGHIJLKMNOPQRSTUVWXYZ";
  code = "";

  for (var i = 0; i < 6; i++)
    code += letters[Math.floor(Math.random() * letters.length)];
  document.getElementById("game-container").innerHTML =
    "<div id='code' class='font'>" +
    code +
    "</div><div id='players' class='font'>Enter the code to join this game!</div><div id='start' class='font' onclick='startGame()'>Start!</div>";

 
    jugadorRef = database.ref(`jugador/${jugadorId}`);
    salaRef = database.ref(`salas/${code}`);
    jugadoresRef= database.ref(`salas/${code}/jugadores`);
    maxJugadoresRef = database.ref(`salas/${code}/maxJugadores`);
    


    jugadorRef.update({
      sala: code
    });


    database.ref(`salas/${code}/status`).set({
      status: 0,
    });

    maxJugadoresRef.set({
      maxJugadores: 0
    });



    maxJugadoresRef.child("maxJugadores").get().then((snapshot) => {
      console.log(snapshot.val())
      pos=snapshot.val();
      maxJugadoresRef.update({
        maxJugadores: pos+1
      });
  
     jugadorRef.child("nombre").get().then((snapshot) => {
      if (snapshot.exists()) {
     addPlayer(pos,jugadorId,code,snapshot.val())
    }
      })
      .catch((error) => {
        console.error(error);
      })

    })
    .catch((error) => {
      console.error(error);
    })
 

    jugadoresRef.on("child_added", function (e) {

      printPlayers(code)

     
    })
    .catch((error) => {
      console.error(error);
    });
}

function joinGame(e) {
  // database.ref(`${code}/status`).remove();
  e.innerHTML =
    "<input id='input' class='font' placeholder='Game code' onkeyup='checkCode(this)' autofocus></input>";
  e.className += " notturn";
  e.onclick = null;
}

function checkCode(el) {
  if (el.value.length == 6) {
    code = el.value.toUpperCase();
    console.log(code);
    el.onkeyup = null;


    maxJugadoresRef = database.ref(`salas/${code}/maxJugadores`);

    maxJugadoresRef.child("maxJugadores").get().then((snapshot) => {
      console.log(snapshot.val())
      pos=snapshot.val();
       
       
      database.ref(`salas/${code}/maxJugadores`).update({
        maxJugadores: pos+1
      });
  
     jugadorRef.child("nombre").get().then((snapshot) => {
      if (snapshot.exists()) {
     addPlayer(pos,jugadorId,code,snapshot.val())
    } else {
      console.log("No data available");
    }

      })
      .catch((error) => {
        console.error(error);
      })

    })
    .catch((error) => {
      console.error(error);
    })

  statusRef = database.ref(`salas/${code}/status`);

    statusRef.child("status").get().then((snapshot) => {
        if (snapshot.val() === 0) {
          document.getElementById("game-container").innerHTML =
            "<div id='waiting' style='background-color:white'><span class='wait font'>Wating for the game to start...</span></div><div id='wcode' class='wait font'>" +
            code +
            "</div>";
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
