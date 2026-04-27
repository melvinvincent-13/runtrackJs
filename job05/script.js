/**
 * Barre de progression au scroll.
 *
 * À chaque événement "scroll" sur la fenêtre, on calcule le pourcentage
 * de page scrollée et on met à jour la couleur du footer en conséquence.
 *
 * Calcul du pourcentage :
 *   scrollY          : pixels déjà scrollés depuis le haut
 *   scrollHeight     : hauteur totale du document (contenu complet)
 *   innerHeight      : hauteur visible de la fenêtre
 *   scrollMax        : pixels maximum que l'on peut scroller
 *                      = scrollHeight - innerHeight
 *   pourcentage      : (scrollY / scrollMax) * 100
 *
 * Couleur de la barre :
 *   0%   → rouge   (hsl 0°)
 *   50%  → orange  (hsl 60°)
 *   100% → vert    (hsl 120°)
 *   On utilise hsl() : Hue (teinte 0-360), Saturation, Lightness
 *   La teinte va de 0 (rouge) à 120 (vert) proportionnellement au scroll.
 */

// Sélection du footer qui sert de barre de progression
const progressBar = document.getElementById("progress-bar");

// Écoute de l'événement "scroll" sur la fenêtre du navigateur
window.addEventListener("scroll", function () {
  // Pixels déjà scrollés depuis le haut de la page
  const scrollY = window.scrollY;

  // Hauteur totale scrollable = hauteur du document - hauteur visible
  const scrollMax = document.documentElement.scrollHeight - window.innerHeight;

  // Calcul du pourcentage de scroll (entre 0 et 100)
  const pourcentage = (scrollY / scrollMax) * 100;

  // Conversion du pourcentage en teinte HSL :
  // 0% = teinte 0 (rouge), 100% = teinte 120 (vert)
  const teinte = (pourcentage / 100) * 120;

  // Application de la couleur au footer
  progressBar.style.backgroundColor = `hsl(${teinte}, 80%, 50%)`;
});