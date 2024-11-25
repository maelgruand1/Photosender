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
document.addEventListener("DOMContentLoaded", function () {
  const photoGallery = document.querySelector("#photoGallery .photos");

  // Récupérer la liste des photos depuis Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycby879s3Dls3iBwm7iufecGmBYIRSghXvyJFxvg6oG85Scp_vvQ_sbVrRxrmWyFHW3XK/exec"
  ) // Remplace TON_SCRIPT_ID par l'ID de ton script déployé
    .then((response) => response.json())
    .then((data) => {
      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          const img = document.createElement("img");
          img.src = file.url; // URL du fichier retournée par le script
          img.alt = file.name; // Nom du fichier comme description
          img.classList.add("uploaded-photo");
          photoGallery.appendChild(img); // Ajouter l'image à la galerie
        });
      } else {
        console.log("Aucune photo trouvée.");
      }
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des photos : ", err);
    });
});
