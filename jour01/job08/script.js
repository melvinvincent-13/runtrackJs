/**
 * Vérifie si un nombre est premier.
 * Optimisation : on teste jusqu'à √n seulement.
 *
 * @param {number} n
 * @returns {boolean}
 */
function estPremier(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Retourne la somme de deux nombres si les deux sont premiers, false sinon.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number|boolean}
 */
function sommeNombresPremiers(a, b) {
  if (estPremier(a) && estPremier(b)) return a + b;
  return false;
}

// --- Tests ---
console.log(sommeNombresPremiers(3, 7));  // 10    (3 et 7 sont premiers)
console.log(sommeNombresPremiers(2, 11)); // 13    (2 et 11 sont premiers)
console.log(sommeNombresPremiers(4, 7));  // false (4 n'est pas premier)
console.log(sommeNombresPremiers(6, 9));  // false (aucun n'est premier)
