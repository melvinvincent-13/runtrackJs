/**
 * Affiche un par un les jours de la semaine dans la console,
 * du lundi au dimanche, à l'aide d'une boucle for.
 */
function afficherJoursSemaines() {
  const joursSemaines = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
  ];

  // Boucle for classique — indice de 0 au dernier élément
  for (let i = 0; i < joursSemaines.length; i++) {
    console.log(joursSemaines[i]);
  }
}

afficherJoursSemaines();
