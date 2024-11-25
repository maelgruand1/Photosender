// Récupère toutes les sections et les liens du menu
const sections = document.querySelectorAll("main > section");
const menuLinks = document.querySelectorAll("#menu a");

// Fonction pour cacher toutes les sections
function cacherToutesLesSections() {
  sections.forEach((section) => {
    section.classList.add("hidden"); // Ajoute la classe hidden pour cacher
  });
}

// Fonction pour afficher une seule section
function afficherSection(sectionId) {
  // Cacher toutes les sections
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("hidden");
  });

  // Afficher la section ciblée
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove("hidden");
  }
}

// Ajout d'événements sur chaque lien du menu
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    const sectionId = link.getAttribute("data-section"); // Récupère la valeur de data-section
    afficherSection(sectionId); // Affiche la section correspondante
  });
});

// Au chargement de la page, affiche uniquement la section "Accueil"
window.addEventListener("DOMContentLoaded", () => {
  cacherToutesLesSections(); // Cache tout
  afficherSection("accueil"); // Affiche l'accueil
});
document.querySelectorAll("#menu a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute("data-section");
    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
  });
});
