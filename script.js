// Fonction pour vérifier les identifiants (email et mot de passe) dans Google Sheets
function checkCredentials(email, password) {
  const sheetId = "1EQYv8StlpOsOMX43w8WQf_dO1CrbLuREIogFKIP-pcQ";
  const range = "Feuille1!A:B";

  // Vérifie que l'API Google Sheets est chargée
  if (!gapi || !gapi.client || !gapi.client.sheets) {
    console.error("L'API Google Sheets n'est pas initialisée.");
    return;
  }

  // Appel API pour obtenir les données de la feuille
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: sheetId,
      range: range,
    })
    .then((response) => {
      const rows = response.result.values;
      if (rows && rows.length > 0) {
        let isAuthenticated = false;

        // Parcours les lignes et compare les identifiants
        rows.forEach((row) => {
          const sheetEmail = row[0];
          const sheetPassword = row[1];

          if (email === sheetEmail && password === sheetPassword) {
            isAuthenticated = true;
          }
        });

        if (isAuthenticated) {
          document.getElementById("status").textContent = "Connexion réussie !";
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
    })
    .catch((error) => {
      console.error("Erreur API Google Sheets", error);
      document.getElementById("status").textContent = "Erreur de connexion.";
    });
}

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

  const photoForm = document.getElementById("photoForm");
  if (photoForm) {
    photoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const fileInput = document.getElementById("photoInput");
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          const base64Image = reader.result.split(",")[1];
          const fileName = file.name;

          if (fileName) {
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
  }
});
