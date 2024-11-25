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
document.addEventListener("DOMContentLoaded", function () {
  // Ajoute ici ton code pour les événements, comme l'ajout de l'écouteur
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // ton code pour la soumission du formulaire
      document
        .getElementById("login-form")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          const emailInput = document.getElementById("email");
          const passwordInput = document.getElementById("password");

          if (emailInput && passwordInput) {
            const email = emailInput.value;
            const password = passwordInput.value;

            // Traitement du formulaire
            auth
              .signInWithEmailAndPassword(email, password)
              .then((userCredential) => {
                document.getElementById("status").textContent =
                  "Connexion réussie !";
                document
                  .getElementById("photosLink")
                  .classList.remove("hidden");
                document.getElementById("login").classList.add("hidden");
                document.getElementById("photos").classList.remove("hidden");
              })
              .catch((error) => {
                document.getElementById("status").textContent =
                  "Erreur de connexion.";
                console.error(error);
              });
          }
        });
    });
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
document.getElementById("photoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Récupère le fichier photo
  const fileInput = document.getElementById("photoInput");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const base64Image = reader.result.split(",")[1]; // Convertir en base64

      // Vérifier que le nom de fichier est valide
      const fileName = file.name;
      if (fileName) {
        // Appel de la fonction Apps Script pour uploader l'image dans Google Drive
        google.script.run.uploadPhotoToDrive(base64Image, fileName);
      } else {
        console.error("Nom de fichier invalide");
      }
    };
    reader.readAsDataURL(file);
  } else {
    console.error("Aucun fichier sélectionné");
  }
});
