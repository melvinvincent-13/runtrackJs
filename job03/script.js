/**
 * Incrémente le compteur affiché dans l'élément #compteur.
 *
 * À chaque appel :
 *  1. On lit la valeur actuelle de #compteur (texte → nombre entier)
 *  2. On l'incrémente de 1
 *  3. On réécrit la nouvelle valeur dans le DOM
 *
 * IMPORTANT : on n'utilise PAS onclick="" dans le HTML.
 * L'événement est attaché via addEventListener() dans ce fichier.
 */
function addOne() {
  // Sélection de l'élément #compteur
  const compteurElement = document.getElementById("compteur");

  // Lecture de la valeur actuelle et conversion en entier (parseInt)
  // innerText retourne une String, parseInt la convertit en Number
  const valeurActuelle = parseInt(compteurElement.innerText);

  // Incrémentation et réécriture dans le DOM
  compteurElement.innerText = valeurActuelle + 1;
}

// Attachement de l'événement click sur le bouton via addEventListener
// — Respecte la séparation HTML / JS (pas de onclick dans le HTML)
const bouton = document.getElementById("button");
bouton.addEventListener("click", addOne);