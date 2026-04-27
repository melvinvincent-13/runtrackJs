/**
 * Récupère le contenu texte de l'élément #citation
 * et l'affiche dans la console de développement.
 *
 * Utilise getElementById() pour cibler l'élément par son id,
 * puis .innerText pour lire son contenu texte visible.
 */
function citation() {
  // Sélection de l'élément HTML dont l'id est "citation"
  const element = document.getElementById("citation");

  // Lecture du texte contenu dans cet élément
  const texte = element.innerText;

  // Affichage dans la console de développement (F12)
  console.log(texte);
}

// Récupération du bouton et ajout d'un écouteur d'événement "click"
// On utilise addEventListener et NON onclick dans le HTML (bonne pratique)
const bouton = document.getElementById("button");
bouton.addEventListener("click", citation);