// Navigation entre les sections
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");

    // Cacher toutes les sections
    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("hidden");
    });

    // Afficher la section cliquée
    document.getElementById(sectionId).classList.remove("hidden");
  });
});

// Gestion du formulaire de connexion
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le rechargement de la page

  const username = document.getElementById("username").value; // Récupère le nom d'utilisateur
  const email = document.getElementById("email").value; // Récupère l'email

  // Vérifie si le nom d'utilisateur et l'email sont remplis
  if (username && email) {
    alert("Connexion réussie !");

    // Met à jour le profil
    document.getElementById("profile-username").textContent = username; // Affiche le nom d'utilisateur
    document.getElementById("profile-logo").classList.remove("hidden"); // Affiche le profil

    // Masque la section "login" et affiche la section "home"
    document.getElementById("login").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");

    // Affiche la section des photos
    document.getElementById("photos").classList.remove("hidden");
  } else {
    alert("Veuillez remplir le nom d'utilisateur et l'email !");
  }
});
// Ajouter un gestionnaire d'événement au bouton "Commencez Maintenant"
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".action-btn");

  // Vérifie si le bouton existe avant d'ajouter un événement
  if (startButton) {
    startButton.addEventListener("click", function () {
      // Vérifie si l'utilisateur est connecté
      if (
        document.getElementById("profile-logo").classList.contains("hidden")
      ) {
        alert("Veuillez vous connecter d'abord.");
      } else {
        // Si l'utilisateur est connecté, rediriger vers la section Photos
        document.getElementById("home").classList.add("hidden"); // Masquer la section Home
        document.getElementById("photos").classList.remove("hidden"); // Afficher la section Photos
      }
    });
  }
});
