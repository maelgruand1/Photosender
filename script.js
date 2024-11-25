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
  const password = document.getElementById("password").value; // Récupère le mot de passe

  // Vérifie si les champs sont remplis et si le mot de passe est correct
  if (username && password === "1234") {
    alert("Connexion réussie !");
    
    // Met à jour le profil
    document.getElementById("profile-username").textContent = username; // Affiche le nom d'utilisateur
    document.getElementById("profile-logo").classList.remove("hidden"); // Affiche le profil

    // Masque la section "login" et affiche la section "home"
    document.getElementById("login").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
  } else {
    alert("Nom d'utilisateur ou mot de passe incorrect !");
  }
});
