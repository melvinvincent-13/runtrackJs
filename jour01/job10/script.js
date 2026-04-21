/**
 * Compte le nombre de voyelles dans une phrase et affiche le résultat.
 *
 * Voyelles reconnues : a, e, i, o, u, y (minuscules et majuscules).
 * Utilise une boucle for pour parcourir chaque caractère de la phrase.
 *
 * @param {string} phrase - La chaîne de caractères à analyser
 */
function compterVoyelles(phrase) {
  const voyelles = "aeiouyAEIOUY";
  let compteur = 0;

  // Boucle for classique — un caractère à la fois
  for (let i = 0; i < phrase.length; i++) {
    if (voyelles.includes(phrase[i])) {
      compteur++;
    }
  }

  console.log(`La phrase contient ${compteur} voyelles`);
}

// --- Tests ---
compterVoyelles("Bonjour tout le monde"); // La phrase contient 7 voyelles
compterVoyelles("JavaScript est super");  // La phrase contient 7 voyelles
compterVoyelles("aaaa");                  // La phrase contient 4 voyelles
compterVoyelles("bcd");                   // La phrase contient 0 voyelles
