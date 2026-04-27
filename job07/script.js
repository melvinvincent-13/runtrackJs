/**
 * changeTheme — bascule entre le thème clair (défaut) et le thème sombre.
 *
 * Thème clair (défaut) :
 *   - fond    : blanc  (#ffffff)
 *   - texte   : noir   (#000000)
 *
 * Thème sombre (dark mode) :
 *   - fond    : noir   (#000000)
 *   - texte   : blanc  (#ffffff)
 *
 * Le basculement est détecté grâce à un attribut data-theme sur le body :
 *   data-theme="dark"  → thème sombre actif
 *   data-theme="light" → thème clair actif (ou attribut absent)
 *
 * Cela évite d'utiliser une variable globale et permet de
 * retrouver l'état actuel depuis le DOM directement.
 */
function changeTheme() {
  const body = document.body;

  // Lecture de l'attribut data-theme pour connaître l'état actuel
  const themeCourant = body.getAttribute("data-theme");

  if (themeCourant === "dark") {
    // Thème sombre actif → on repasse au thème clair (état initial)
    body.style.backgroundColor = "#ffffff";
    body.style.color = "#000000";
    body.setAttribute("data-theme", "light");
  } else {
    // Thème clair (ou premier clic) → on passe au thème sombre
    body.style.backgroundColor = "#000000";
    body.style.color = "#ffffff";
    body.setAttribute("data-theme", "dark");
  }
}

// Attachement de l'événement click sur le bouton toggle-theme
// Pas de onclick="" dans le HTML — bonne pratique JS
const bouton = document.getElementById("toggle-theme");
bouton.addEventListener("click", changeTheme);