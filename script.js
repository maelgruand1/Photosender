// Fonction pour vérifier les identifiants (email et mot de passe) dans Google Sheets
function checkCredentials(email, password) {
  const sheetId = "1EQYv8StlpOsOMX43w8WQf_dO1CrbLuREIogFKIP-pcQ"; // Remplace par l'ID de ton Google Sheet
  const range = "Sheet1!A:B"; // Plage des données à lire (colonne A : Email, colonne B : Mot de passe)

  // Appel API pour obtenir les données de la feuille
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: sheetId,
      range: range,
    })
    .then(
      function (response) {
        const rows = response.result.values;
        if (rows.length > 0) {
          let isAuthenticated = false;

          // Parcours les lignes et compare les identifiants
          rows.forEach(function (row) {
            const sheetEmail = row[0];
            const sheetPassword = row[1];

            if (email === sheetEmail && password === sheetPassword) {
              isAuthenticated = true;
            }
          });

          if (isAuthenticated) {
            document.getElementById("status").textContent =
              "Connexion réussie !";
            document.getElementById("photosLink").classList.remove("hidden");
            document.getElementById("login").classList.add("hidden");
            document.getElementById("photos").classList.remove("hidden");
          } else {
            document.getElementById("status").textContent =
              "Erreur de connexion : email ou mot de passe incorrect";
          }
        } else {
          document.getElementById("status").textContent =
            "Aucun utilisateur trouvé dans la feuille";
        }
      },
      function (error) {
        console.error("Erreur API Google Sheets", error);
        document.getElementById("status").textContent = "Erreur de connexion.";
      }
    );
}

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
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      if (emailInput && passwordInput) {
        const email = emailInput.value;
        const password = passwordInput.value;

        // Appeler la fonction pour vérifier les identifiants dans Google Sheets
        checkCredentials(email, password);
      }
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
