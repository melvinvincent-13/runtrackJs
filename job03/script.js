
const NB_PIECES    = 8;    // 8 carreaux + 1 vide
const TAILLE_GRILLE = 3;   // grille 3×3

// État gagnant : pièces 1→8 dans l'ordre, 0 (vide) en dernière position
const ETAT_GAGNANT = [1, 2, 3, 4, 5, 6, 7, 8, 0];

// État actuel de la grille (tableau de 9 valeurs)
let etat = [];
let mouvements = 0;
let partieTerminee = false;

// ─── Démarrage ─────────────────────────────────────────────────────────
$(document).ready(function () {
  demarrerPartie();

  // Bouton recommencer
  $("#btn-recommencer").on("click", function () {
    demarrerPartie();
  });
});

/**
 * Démarre (ou redémarre) une partie :
 * - Mélange les pièces
 * - Réinitialise les compteurs
 * - Affiche la grille
 */
function demarrerPartie() {
  mouvements     = 0;
  partieTerminee = false;

  $("#message").text("");
  $("#btn-recommencer").hide();
  $("#compteur").text("Mouvements : 0");

  // Génère un mélange valide (résolvable)
  etat = melangerValide();
  afficherGrille();
}

/**
 * Affiche la grille selon l'état actuel.
 * Vide #grille puis recrée les 9 cases.
 */
function afficherGrille() {
  $("#grille").empty();

  etat.forEach(function (valeur, index) {
    const carreau = $("<div></div>").addClass("carreau");
    carreau.attr("data-index", index);

    if (valeur === 0) {
      // Case vide
      carreau.addClass("case-vide");
    } else {
      // Carreau avec image
      const img = $(`<img src="image${valeur}.png" alt="Pièce ${valeur}" />`);
      carreau.append(img);

      // Clic sur un carreau → tenter de le déplacer
      carreau.on("click", function () {
        if (!partieTerminee) {
          tenterDeplacement(index);
        }
      });
    }

    $("#grille").append(carreau);
  });
}

/**
 * Tente de déplacer le carreau à l'index donné vers la case vide.
 * Un carreau peut se déplacer si la case vide est directement adjacente
 * (haut, bas, gauche, droite — pas en diagonale).
 *
 * @param {number} indexCarreau - position du carreau cliqué (0-8)
 */
function tenterDeplacement(indexCarreau) {
  const indexVide = etat.indexOf(0); // trouve la position de la case vide

  // Calcul des coordonnées ligne/colonne
  const ligneCarreau = Math.floor(indexCarreau / TAILLE_GRILLE);
  const colCarreau   = indexCarreau % TAILLE_GRILLE;
  const ligneVide    = Math.floor(indexVide / TAILLE_GRILLE);
  const colVide      = indexVide % TAILLE_GRILLE;

  // On vérifie que le carreau et la case vide sont adjacents (distance Manhattan = 1)
  const distanceLigne = Math.abs(ligneCarreau - ligneVide);
  const distanceCol   = Math.abs(colCarreau - colVide);
  const estAdjacent   = (distanceLigne + distanceCol) === 1;

  if (!estAdjacent) return; // pas adjacent → on ne fait rien

  // Échange dans le tableau d'état
  etat[indexVide]    = etat[indexCarreau];
  etat[indexCarreau] = 0;

  // Mise à jour du compteur
  mouvements++;
  $("#compteur").text(`Mouvements : ${mouvements}`);

  // Réaffichage de la grille
  afficherGrille();

  // Vérification de la victoire
  if (estGagne()) {
    partieTerminee = true;
    $("#message").text("Vous avez gagné 🎉");
    $("#btn-recommencer").show();
  }
}

/**
 * Vérifie si l'état actuel correspond à l'état gagnant.
 * @returns {boolean} true si gagné
 */
function estGagne() {
  return etat.every(function (valeur, index) {
    return valeur === ETAT_GAGNANT[index];
  });
}

/**
 * Génère un état de départ mélangé ET résolvable.
 * @returns {number[]} tableau de 9 valeurs mélangées
 */
function melangerValide() {
  let grille = [...ETAT_GAGNANT]; // copie de l'état résolu

  // 200 mouvements aléatoires à partir de l'état résolu
  for (let i = 0; i < 200; i++) {
    const indexVide   = grille.indexOf(0);
    const voisins     = getVoisins(indexVide);
    const voisinChoisi = voisins[Math.floor(Math.random() * voisins.length)];

    // Échange
    grille[indexVide]    = grille[voisinChoisi];
    grille[voisinChoisi] = 0;
  }

  return grille;
}

/**
 * Retourne les indices des cases adjacentes à un index donné.
 * @param {number} index - position dans le tableau (0-8)
 * @returns {number[]} liste des indices adjacents valides
 */
function getVoisins(index) {
  const voisins = [];
  const ligne   = Math.floor(index / TAILLE_GRILLE);
  const col     = index % TAILLE_GRILLE;

  if (ligne > 0) voisins.push(index - TAILLE_GRILLE); // haut
  if (ligne < TAILLE_GRILLE - 1) voisins.push(index + TAILLE_GRILLE); // bas
  if (col > 0)  voisins.push(index - 1); // gauche
  if (col < TAILLE_GRILLE - 1)  voisins.push(index + 1); // droite

  return voisins;
}