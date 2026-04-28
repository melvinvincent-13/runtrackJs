

$(document).ready(function () {

  
  $("#champ-recherche").focus(function () {
    $(this).animate({ width: "400px" }, 300);   // agrandissement animé
    $(this).addClass("actif");                   // applique le style focus (bordure bleue)
    $("#etat").text("Champ actif (400px)");
  });

  
  $("#champ-recherche").blur(function () {
    $(this).animate({ width: "200px" }, 300);    // réduction animée
    $(this).removeClass("actif");                 // retire le style focus
    $("#etat").text("Champ inactif (200px)");
  });

});