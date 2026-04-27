/**
 * Affiche ou masque un <article> contenant une citation.
 *
 * Premier clic  : crée l'<article> et l'ajoute au <body>.
 * Deuxième clic : retire l'<article> du <body>.
 * Troisième clic : recrée l'<article>, etc.
 *
 * On utilise document.getElementById() pour vérifier si l'article
 * existe déjà dans le DOM avant de décider d'ajouter ou de supprimer.
 */
function showhide() {
  // On cherche si l'article existe déjà dans le DOM
  const articleExistant = document.getElementById("article-citation");

  if (articleExistant) {
    // L'article est présent → on le supprime du DOM
    articleExistant.remove();
  } else {
    // L'article est absent → on le crée et on l'ajoute au body

    // Création d'un nouvel élément <article>
    const nouvelArticle = document.createElement("article");

    // Attribution d'un id pour pouvoir le retrouver au prochain clic
    nouvelArticle.id = "article-citation";

    // Définition du texte affiché dans l'article
    nouvelArticle.innerText = "Coucou hibou, j'espère que ça va.";

    // Ajout de l'article à la fin du body
    document.body.appendChild(nouvelArticle);
  }
}

// Écoute du clic sur le bouton — pas de onclick dans le HTML
const bouton = document.getElementById("button");
bouton.addEventListener("click", showhide);