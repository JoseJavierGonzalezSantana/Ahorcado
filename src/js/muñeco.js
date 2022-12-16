// creación y dibujo del muñeco
canvas = function () {
};

imgMuñeco = document.createElement("img");
imgMuñeco.setAttribute("src", "./src/img/frame1.png");


// Animate man
var animate = function (vidaMuñeco) {
  imgMuñeco = document.getElementById("imgMuñeco");
  // var drawMe = vidaMuñeco;
  // drawArray[drawMe]();
  switch (vidaMuñeco) {
    case 0:
      imgMuñeco.setAttribute("src", "./src/img/frame10.png");
      break;
    case 1:
      imgMuñeco.setAttribute("src", "./src/img/frame9.png");
      break;
    case 2:
      imgMuñeco.setAttribute("src", "./src/img/frame8.png");
      break;
    case 3:
      imgMuñeco.setAttribute("src", "./src/img/frame7.png");
      break;
    case 4:
      imgMuñeco.setAttribute("src", "./src/img/frame6.png");
      break;
    case 5:
      imgMuñeco.setAttribute("src", "./src/img/frame5.png");
      break;
    case 6:
      imgMuñeco.setAttribute("src", "./src/img/frame4.png");
      break;
    case 8:
      imgMuñeco.setAttribute("src", "./src/img/frame3.png");
      break;
    case 9:
      imgMuñeco.setAttribute("src", "./src/img/frame2.png");
      break;
    case 10:
      imgMuñeco.setAttribute("src", "./src/img/frame1.png");
      break;
    default:
      break;
  }
};
