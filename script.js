const ecranElt = document.querySelector("#ecran");

let precedent = 0;
let affichage = "";
let operation = null;
let nouveauCalcul = false;

window.onload = () => {
  let touches = document.querySelectorAll("input");
  for (let touche of touches) {
    touche.addEventListener("click", gererTouches);
  }
};

const gererTouches = function (event) {
  let touche = event.target.value;

  if (!isNaN(touche) || touche === ".") {
    if (nouveauCalcul) {
      affichage = touche.toString();
      nouveauCalcul = false;
    } else {
      affichage =
        affichage === "" ? touche.toString() : affichage + touche.toString();
    }
    ecranElt.innerText = affichage;
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
        if (affichage !== "") {
          precedent =
            precedent === 0
              ? parseFloat(affichage)
              : calculer(precedent, parseFloat(affichage), operation);
          ecranElt.innerText = precedent;
          operation = touche;
          affichage = "";
        }
        break;
      case "=":
        if (affichage !== "" && operation !== null) {
          precedent = calculer(precedent, parseFloat(affichage), operation);
          ecranElt.innerText = precedent;
          affichage = precedent;
          precedent = 0;
          operation = null;
          nouveauCalcul = true;
        }
        break;
    }
  }
};

function calculer(nb1, nb2, operation) {
  nb1 = parseFloat(nb1);
  nb2 = parseFloat(nb2);
  if (operation === "/" && nb2 === 0) {
    return "Erreur";
  }
  if (operation === "+") return nb1 + nb2;
  if (operation === "-") return nb1 - nb2;
  if (operation === "*") return nb1 * nb2;
  if (operation === "/") return nb1 / nb2;
}
