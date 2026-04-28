
const IMAGES = [
  "arc1.png",
  "arc2.png",
  "arc3.png",
  "arc4.png",
  "arc5.png",
  "arc6.png"
];

// L'image actuellement sélectionnée (son numéro d'origine, 1-6)
let imageSelectionnee = null;

$(document).ready(function () {

  
  initialiser();

  
  // Réordonne les images dans #zone-melange de façon aléatoire
  $("#btn-melanger").on("click", function () {
    melanger();
    $("#message").text("").removeClass("gagne perdu");
  });

  // ── Réinitialiser ─────────────────────────────────────────────────────
  // Vide la zone de reconstruction et replace toutes les images dans #zone-melange
  $("#btn-reinitialiser").on("click", function () {
    initialiser();
    $("#message").text("").removeClass("gagne perdu");
  });

  // ── Vérifier ──────────────────────────────────────────────────────────
  // Contrôle si les images dans #zone-reconstruction sont dans le bon ordre
  $("#btn-verifier").on("click", function () {
    verifier();
  });

});

/**
 * Initialise (ou réinitialise) le jeu :
 * - Vide les deux zones
 * - Crée les 6 slots de destination dans #zone-reconstruction
 * - Place les 6 images mélangées dans #zone-melange
 */
function initialiser() {
  imageSelectionnee = null;

  // Vide les deux zones
  $("#zone-reconstruction").empty();
  $("#zone-melange").empty();

  // Crée les 6 slots numérotés dans la zone de reconstruction
  for (let i = 1; i <= 6; i++) {
    const slot = $(
      `<div class="slot"
            data-position="${i}"
            style="
              width: 100px; height: 100px;
              border: 2px dashed #ccc;
              border-radius: 4px;
              display: flex; align-items: center; justify-content: center;
              font-size: 24px; color: #ccc;
              cursor: pointer; position: relative;
            ">
        ${i}
      </div>`
    );

    // Clic sur un slot : y place l'image sélectionnée
    slot.on("click", function () {
      placerDansSlot($(this));
    });

    $("#zone-reconstruction").append(slot);
  }

  // Place les images mélangées dans #zone-melange
  const indices = melangeurTableau([1, 2, 3, 4, 5, 6]);
  indices.forEach(function (num) {
    const img = creerImage(num);
    $("#zone-melange").append(img);
  });
}

/**
 * Crée un élément <img> jQuery pour une image arc-en-ciel.
 * @param {number} num - numéro de l'image (1-6)
 * @returns {jQuery} l'élément image
 */
function creerImage(num) {
  const img = $(`<img
    class="arc-img"
    src="${IMAGES[num - 1]}"
    data-num="${num}"
    alt="Arc-en-ciel partie ${num}"
  />`);

  // Clic sur l'image : la sélectionne (ou la désélectionne)
  img.on("click", function () {
    if (imageSelectionnee === num) {
      // Deuxième clic sur la même → désélectionner
      imageSelectionnee = null;
      $(".arc-img").removeClass("selectionnee");
    } else {
      // Sélectionner cette image
      $(".arc-img").removeClass("selectionnee");
      $(this).addClass("selectionnee");
      imageSelectionnee = num;
    }
  });

  return img;
}

/**
 * Place l'image sélectionnée dans le slot cliqué.
 * Si le slot est déjà occupé, l'image qui y était est renvoyée dans #zone-melange.
 * @param {jQuery} slot - le slot de destination
 */
function placerDansSlot(slot) {
  if (imageSelectionnee === null) return; // aucune image sélectionnée

  // Si le slot contient déjà une image → la renvoyer dans #zone-melange
  const imgExistante = slot.find("img");
  if (imgExistante.length > 0) {
    const numExistant = parseInt(imgExistante.attr("data-num"));
    imgExistante.remove();
    const imgRetour = creerImage(numExistant);
    $("#zone-melange").append(imgRetour);
  }

  // Trouver l'image sélectionnée dans #zone-melange et la déplacer dans le slot
  const imgSource = $(`#zone-melange img[data-num="${imageSelectionnee}"]`);
  imgSource.remove();

  const nouvelleImg = creerImage(imageSelectionnee);
  nouvelleImg.removeClass("selectionnee");

  // Vider le numéro du slot et y mettre l'image
  slot.html("").append(nouvelleImg);

  // Réinitialiser la sélection
  imageSelectionnee = null;
  $(".arc-img").removeClass("selectionnee");
}

/**
 * Mélange les images dans #zone-melange sans toucher à #zone-reconstruction.
 * Toutes les images (dans les deux zones) sont d'abord remises dans #zone-melange
 * puis réordonnées aléatoirement.
 */
function melanger() {
  imageSelectionnee = null;

  // Récupérer tous les numéros encore dans les slots
  $("#zone-reconstruction .slot img").each(function () {
    const num = parseInt($(this).attr("data-num"));
    $(this).remove();
    const img = creerImage(num);
    $("#zone-melange").append(img);
  });

  // Remettre le label numéroté dans les slots vides
  $("#zone-reconstruction .slot").each(function (i) {
    if ($(this).find("img").length === 0) {
      $(this).html(i + 1);
    }
  });

  // Mélanger les images dans #zone-melange
  const images = $("#zone-melange img").toArray();
  const ordre  = melangeurTableau(images.map((_, i) => i));
  $("#zone-melange").empty();
  ordre.forEach(function (i) {
    $("#zone-melange").append(images[i]);
  });
}

/**
 * Vérifie si les 6 images dans #zone-reconstruction sont dans le bon ordre (1→6).
 * Affiche "Vous avez gagné" en vert ou "Vous avez perdu" en rouge.
 */
function verifier() {
  let correct = true;
  let count   = 0;

  $("#zone-reconstruction .slot").each(function (i) {
    const img = $(this).find("img");
    if (img.length === 0) {
      correct = false; // slot vide
      return false;
    }
    count++;
    const num = parseInt(img.attr("data-num"));
    if (num !== i + 1) correct = false; // mauvais ordre
  });

  if (count < 6) {
    $("#message").text("Placez toutes les images avant de vérifier !").css("color", "orange");
    return;
  }

  if (correct) {
    $("#message").text("Vous avez gagné ").addClass("gagne").removeClass("perdu");
  } else {
    $("#message").text("Vous avez perdu ").addClass("perdu").removeClass("gagne");
  }
}

/**
 * Mélange un tableau en place (algorithme Fisher-Yates).
 * Retourne le tableau mélangé.
 * @param {Array} tableau
 * @returns {Array}
 */
function melangeurTableau(tableau) {
  const t = [...tableau];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}