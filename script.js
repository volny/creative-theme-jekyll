/* ============================================================
   ELEC ENGINEERING — Script du site
   Très volontairement minimal : pas de framework, juste ce qu'il
   faut pour le menu mobile et l'année dans le footer.
   ============================================================ */

// Menu mobile : ouvre/ferme la nav quand on clique sur le bouton burger
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Ferme le menu automatiquement quand on clique un lien
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// Met à jour automatiquement l'année dans le footer (© 2026 ...)
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
