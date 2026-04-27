/**
 * Keylogger — capture chaque lettre (a-z) tapée au clavier
 * et l'ajoute dans le <textarea id="keylogger">.
 *
 * Règles :
 *  - La lettre est toujours ajoutée UNE fois dans le textarea.
 *  - Si le focus est dans le textarea au moment du clic, le navigateur
 *    l'ajoute lui-même une première fois (comportement natif).
 *    Notre listener l'ajoute une deuxième fois → total : 2 fois.
 *  - L'écouteur est sur document (global) pour capturer les frappes
 *    même quand le focus n'est pas dans le textarea.
 *
 * event.key    : la valeur de la touche pressée (ex : "a", "b", "Enter"...)
 * /^[a-z]$/i  : expression régulière qui teste si c'est une lettre a-z
 *               (le flag "i" rend la vérification insensible à la casse)
 */

// Récupération du textarea une seule fois au chargement
const textarea = document.getElementById("keylogger");

// Écoute de TOUTES les frappes clavier sur l'ensemble du document
document.addEventListener("keydown", function (event) {
  // On vérifie que la touche pressée est bien une lettre (a-z, insensible casse)
  const estUneLettre = /^[a-z]$/i.test(event.key);

  if (!estUneLettre) return; // Touche non alphabétique → on ignore

  // Si le focus est DANS le textarea, le navigateur va ajouter la lettre
  // tout seul (comportement natif du textarea). Notre listener ajoute
  // une deuxième occurrence → la lettre apparaît deux fois au total.
  // Si le focus est AILLEURS, seul notre listener ajoute la lettre → une fois.
  textarea.value += event.key;
});