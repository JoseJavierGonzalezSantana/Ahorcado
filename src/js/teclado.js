//creación del teclado

const teclado = {
  bloque1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  bloque2: ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  bloque3: ["Z", "X", "C", "V", "B", "N", "M"],
  bloque1Class: "bloque1",
  bloque2Class: "bloque2",
  bloque3Class: "bloque3",
};

//creación del teclado
function imprimirTeclas() {
  imprimirteclado(teclado.bloque1, teclado.bloque1Class);
  imprimirteclado(teclado.bloque2, teclado.bloque2Class);
  imprimirteclado(teclado.bloque3, teclado.bloque3Class);
}
// create letras ul
var imprimirteclado = function (bloque, clase) {
  miTeclado = document.getElementById("teclado");
  tecla = document.createElement("div");
  tecla.id = "tecla";
  tecla.setAttribute("class", clase);
  for (let i = 0; i < bloque.length; i++) {
    listaTeclas = document.createElement("div");
    listaTeclas.setAttribute("class", "tecla");
    listaTeclas.id = bloque[i];
    listaTeclas.innerHTML = bloque[i];
    click();
    miTeclado.appendChild(tecla);
    tecla.appendChild(listaTeclas);
  }
};
