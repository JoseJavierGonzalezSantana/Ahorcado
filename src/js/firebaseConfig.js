// const firebaseConfig = {
//   apiKey: "AIzaSyCFBVawOyCtzcQNvHoXFwg2nrzbahfwE3A",
//   authDomain: "ahorcado-dfcdc.firebaseapp.com",
//   databaseURL:
//     "https://ahorcado-dfcdc-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "ahorcado-dfcdc",
//   storageBucket: "ahorcado-dfcdc.appspot.com",
//   messagingSenderId: "592080962384",
//   appId: "1:592080962384:web:52f146078444c1bd7c6255",
// };

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (user) {
    //You're logged in!
    jugadorId = user.uid;
    jugadorRef = database.ref(`jugador/${jugadorId}`);
    nombre = JSON.parse(localStorage.getItem('nombreOnline')); //optiene los datos del jugador devuelto en objeto
  sessionStorage.setItem(`id`, JSON.stringify(jugadorId));
  //optiene los datos del jugador devuelto en objeto

    if(nombre==null){nombre="anonimo"}

    jugadorRef.update({
      id: jugadorId,
      nombre: nombre,
    
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


  function clearSala(){
var code = JSON.parse(localStorage.getItem("code"));
        sala = database.ref(`salas/${code}`);
        sala.remove();
        console.log("limpio")
   
  }