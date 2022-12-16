function animate(puntos) {
 setInterval(() => {
    var scored = document.getElementById("score");
    var counter = parseInt(scored);
    if (counter !== puntos) {
        scored(counter - 1);
    
      } else {
        alert("Time out");
      }



 }, 500);
  
  }
  