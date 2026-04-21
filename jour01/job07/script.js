/**
 * Détermine si une date est un jour férié, un week-end ou un jour travaillé.
 *
 * Jours fériés français 2024 :
 *   Fixes    : 1/1, 1/5, 8/5, 14/7, 15/8, 1/11, 11/11, 25/12
 *   Variables: Lundi de Pâques (1/4), Ascension (9/5), Pentecôte (20/5)
 *
 * @param {Date} date - La date à analyser
 */
function jourTravaille(date) {
  const nomsJours = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
  const nomsMois  = [
    "janvier","février","mars","avril","mai","juin",
    "juillet","août","septembre","octobre","novembre","décembre"
  ];

  const jour     = date.getDate();
  const mois     = date.getMonth() + 1; // getMonth() retourne 0-11, donc +1
  const annee    = date.getFullYear();
  const nomJour  = nomsJours[date.getDay()];
  const dateStr  = `${nomJour} ${jour} ${nomsMois[mois - 1]} ${annee}`;

  // Jours fériés au format "jour/mois"
  const feriesFixes     = ["1/1","1/5","8/5","14/7","15/8","1/11","11/11","25/12"];
  const feriesVariables = ["1/4","9/5","20/5"]; // Pâques, Ascension, Pentecôte 2024
  const tousFeries      = [...feriesFixes, ...feriesVariables];
  const cle             = `${jour}/${mois}`;

  if (tousFeries.includes(cle)) {
    console.log(`Le ${dateStr} est un jour férié`);
    return;
  }

  // getDay() : 0 = dimanche, 6 = samedi
  if (date.getDay() === 0 || date.getDay() === 6) {
    console.log(`Non, ${dateStr} est un week-end`);
    return;
  }

  console.log(`Oui, ${dateStr} est un jour travaillé`);
}

// --- Tests ---
jourTravaille(new Date(2024, 0, 1));   // 1er janvier  → jour férié
jourTravaille(new Date(2024, 6, 14));  // 14 juillet   → jour férié
jourTravaille(new Date(2024, 6, 13));  // samedi 13/07 → week-end
jourTravaille(new Date(2024, 6, 15));  // lundi 15/07  → jour travaillé
jourTravaille(new Date(2024, 11, 25)); // 25 décembre  → jour férié
