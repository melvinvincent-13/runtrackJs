/**
 * Détermine si une année est bissextile.
 *
 * Règles (dans l'ordre de priorité) :
 *  1. Divisible par 400 → bissextile
 *  2. Divisible par 100 → NON bissextile
 *  3. Divisible par 4   → bissextile
 *  4. Sinon             → NON bissextile
 *
 * @param {number} annee - L'année à tester
 * @returns {boolean} true si bissextile, false sinon
 */
function bisextile(annee) {
  if (annee % 400 === 0) return true;
  if (annee % 100 === 0) return false;
  if (annee % 4   === 0) return true;
  return false;
}

// --- Tests ---
console.log(bisextile(2024)); // true  — divisible par 4
console.log(bisextile(2023)); // false — non divisible par 4
console.log(bisextile(2000)); // true  — divisible par 400
console.log(bisextile(1900)); // false — divisible par 100 mais pas 400
