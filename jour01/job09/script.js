/**
 * Trie un tableau de nombres en ascendant ou descendant.
 *
 * Algorithme : Tri à bulles (Bubble Sort).
 * On compare deux éléments adjacents et on les échange s'ils sont
 * dans le mauvais ordre. On répète jusqu'à ce que le tableau soit trié.
 *
 * @param {number[]} numbers - Tableau de nombres à trier
 * @param {string}   order   - "asc" (croissant) ou "desc" (décroissant)
 * @returns {number[]} Nouveau tableau trié (l'original n'est pas modifié)
 */
function tri(numbers, order) {
  const tableau = [...numbers]; // Copie pour ne pas modifier l'original
  const n = tableau.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      const doitEchanger = order === "asc"
        ? tableau[j] > tableau[j + 1]   // asc  : le plus grand doit aller à droite
        : tableau[j] < tableau[j + 1];  // desc : le plus petit doit aller à droite

      if (doitEchanger) {
        const temp     = tableau[j];
        tableau[j]     = tableau[j + 1];
        tableau[j + 1] = temp;
      }
    }
  }

  return tableau;
}

// --- Tests ---
const nombres = [64, 34, 25, 12, 22, 11, 90];
console.log("Original :",   nombres);
console.log("Ascendant :",  tri(nombres, "asc"));  // [11, 12, 22, 25, 34, 64, 90]
console.log("Descendant :", tri(nombres, "desc")); // [90, 64, 34, 25, 22, 12, 11]
