
$(document).ready(function () {

  
  $("#btn-afficher").on("click", function () {
    $("#citation").show();       // jQuery : affiche l'élément #citation
    $("#btn-cacher").show();     // affiche le bouton Cacher
    $("#btn-afficher").hide();   // masque le bouton Afficher
  });

  
  $("#btn-cacher").on("click", function () {
    $("#citation").hide();       // jQuery : masque l'élément #citation
    $("#btn-afficher").show();   // affiche le bouton Afficher
    $("#btn-cacher").hide();     // masque le bouton Cacher
  });

});