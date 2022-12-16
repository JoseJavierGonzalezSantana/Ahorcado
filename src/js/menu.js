imgtitulo= document.getElementById("titulo");


const arcadeBtn = Swal.mixin({
  customClass: {
    confirmButton: "arcadeBtn",
    denyButton: "arcadeBtn",
    cancelButton: "arcadeBtn-cancelar",
    background: "body",
  },
  buttonsStyling: false,
});


window.onload = function () {
  
let i=Math.floor(Math.random()*7)
    imgtitulo.setAttribute("src", `./src/img/titulo${i}.png`);

  document.getElementById("arcade").onclick = function () {
    sonidoTeclas.play();

    if (window.localStorage.getItem("jugador") == undefined) {
      NuevaPartida();
    } else {
   
      arcadeBtn
        .fire({
          title: "continuar partida",
          showDenyButton: true,
          background: "#2c3e50",
          color: "#fff",
          showCancelButton: true,
          confirmButtonText: "continuar",
          denyButtonText: "nueva partida",
          cancelButtonText: "Cancelar",
        })
        .then((result) => {
          sonidoTeclas.play();
          if (result.isConfirmed) {
            sonidoTeclas.play();
            window.location.href = "./arcade.html";
          } else if (result.isDenied) {
            sonidoTeclas.play();
            NuevaPartida();
          }
        });
    }
  };

  document.getElementById("multi").onclick = function () {
    sonidoTeclas.play();




    arcadeBtn
    .fire({
      title: "local/En linea",
      showDenyButton: true,
      background: "#2c3e50",
      color: "#fff",
      showCancelButton: true,
      confirmButtonText: "local",
      denyButtonText: "En linea",
      cancelButtonText: "Cancelar",

    }) .then((result) => {
      sonidoTeclas.play();
      if (result.isConfirmed) {
        sonidoTeclas.play();
      
        if (window.localStorage.getItem("jugador1") == undefined) {
          NuevaPartidaModoLibre();
        } else {
        
          arcadeBtn
            .fire({
              title: "continuar partida",
              showDenyButton: true,
              background: "#2c3e50",
              color: "#fff",
              showCancelButton: true,
              confirmButtonText: "continuar",
              denyButtonText: "nueva partida",
              cancelButtonText: "Cancelar",
    
            })
    
            .then((result) => {
              sonidoTeclas.play();
              if (result.isConfirmed) {
                sonidoTeclas.play();
                window.location.href = "./ahorcado.html";
              } else if (result.isDenied) {
                sonidoTeclas.play();
                NuevaPartidaModoLibre();
              }
            });
        }





      } else if (result.isDenied) {
        sonidoTeclas.play();
      partidaOnline();
      }
    });










   
  
  };

  document.getElementById("versus").onclick = function () {
    selectDificultad();
  };
  document.getElementById("creditos").onclick = function () {
    Swal.fire({
      background: " #16141e",
      color: "white",
      html:
        '<h1 class="h1creditos">Creditos</h1>' +
 
 "<p><h2>Ahorcado v1.0</h2></p> <p>programador:<br>José Javier Gonzalez Santana</p>" +
        "Más juegos en: <b> " +
        '<a href="#">Proximamente</a></b> ',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> valorar',
      confirmButtonAriaLabel: "Thumbs up, Valorar",
    });
  };
};
