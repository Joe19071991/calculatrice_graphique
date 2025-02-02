const ecranElt = document.querySelector("#ecran");

let precedent = 0;
let affichage = "";
let operation = null;

window.onload = () => {
  //on écoute les clics sur les touches
  let touches = document.querySelectorAll("input");

  for (let touche of touches) {
    touche.addEventListener("click", gererTouches);
  }
};
const gererTouches = function (event) {
  let touche = event.target.value;

  if (parseFloat(touche) >= 0 || touche === ".") {
    affichage =
      affichage === "" ? touche.toString() : affichage + touche.toString();
    ecranElt.innerHTML = affichage;
  } else {
    switch (touche) {
      case "C":
        precedent = 0;
        affichage = "";
        operation = null;
        ecranElt.innerText = 0;
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        precedent =
          precedent === 0
            ? parseFloat(affichage)
            : calculer(precedent, parseFloat(affichage), operation);
        ecranElt.innerText = precedent;
        operation = touche;
        affichage = "";
        break;
      case "=":
        precedent =
          precedent === 0
            ? parseFloat(affichage)
            : calculer(precedent, parseFloat(affichage), operation);
        ecranElt.innerText = precedent;
        affichage = precedent;
        precedent = 0;
        break;
    }
  }
};

function calculer(nb1, nb2, operation) {
  nb1 = parseFloat(nb1);
  nb2 = parseFloat(nb2);
  if (operation === "+") return nb1 + nb2;
  if (operation === "-") return nb1 - nb2;
  if (operation === "*") return nb1 * nb2;
  if (operation === "/") return nb1 / nb2;
}
