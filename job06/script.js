/**
 * Konami Code — Easter egg aux couleurs de La Plateforme_.
 *
 * Le Konami Code est une séquence de touches célèbre issue des jeux vidéo :
 *   ↑ ↑ ↓ ↓ ← → ← → B A
 *
 * Fonctionnement :
 *  1. On écoute chaque touche pressée sur le document.
 *  2. On stocke les N dernières touches dans un tableau "saisies".
 *  3. On compare ce tableau à la séquence Konami.
 *  4. Si la séquence correspond, on active le style La Plateforme_.
 *
 * Couleurs La Plateforme_ :
 *   Bleu principal  : #1919e6
 *   Blanc           : #ffffff
 *   Rouge accent    : #ff0000
 */

// Séquence du Konami Code — les valeurs correspondent à event.key
const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

// Tableau qui stocke les dernières touches tapées
// On ne garde que les N dernières (N = longueur du code Konami)
let saisies = [];

/**
 * Écoute chaque touche clavier et vérifie si le Konami Code est complété.
 * Si oui, applique le style La Plateforme_ à la page.
 */
document.addEventListener("keydown", function (event) {
  // Ajout de la touche pressée à la fin du tableau
  saisies.push(event.key);

  // On ne garde que les N dernières touches (taille du Konami Code)
  if (saisies.length > KONAMI.length) {
    saisies.shift(); // Supprime la touche la plus ancienne
  }

  // Comparaison des deux tableaux touche par touche
  const konamiSaisi = saisies.join(",") === KONAMI.join(",");

  if (konamiSaisi) {
    activerStyleLaPlateforme();
    saisies = []; // Réinitialisation pour permettre un nouveau déclenchement
  }
});

/**
 * Applique le style La Plateforme_ à la page entière.
 * Modifie le body et injecte du contenu HTML de présentation.
 */
function activerStyleLaPlateforme() {
  // Style du body — couleurs La Plateforme_
  document.body.style.backgroundColor = "#1919e6";
  document.body.style.color = "#ffffff";
  document.body.style.fontFamily = "Arial, sans-serif";
  document.body.style.display = "flex";
  document.body.style.flexDirection = "column";
  document.body.style.alignItems = "center";
  document.body.style.justifyContent = "center";
  document.body.style.minHeight = "100vh";
  document.body.style.margin = "0";

  // Injection du contenu HTML dans le body
  document.body.innerHTML = `
    <div style="text-align: center; padding: 40px;">
      <h1 style="font-size: 64px; color: #ffffff; margin-bottom: 10px;">
        La Plateforme_
      </h1>
      <p style="font-size: 22px; color: #ffffff; margin-bottom: 30px;">
        La grande école du numérique pour tous
      </p>
      <p style="font-size: 16px; color: #ccccff;">
        🎮 Konami Code activé ! Félicitations, tu connais le secret.
      </p>
      <div style="margin-top: 40px; width: 80px; height: 5px;
                  background-color: #ffffff; border-radius: 3px;"></div>
    </div>
  `;
}