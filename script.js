// script.js

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
const loginForm = document.getElementById("login-form");
const profileLogo = document.getElementById("profile-logo");
const profileUsername = document.getElementById("profile-username");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Vérification simplifiée
  if (username && password === "1234") {
    alert("Connexion réussie !");
    // Afficher le logo de profil avec le nom d'utilisateur
    profileUsername.textContent = username;
    profileLogo.classList.remove("hidden");

    // Masquer la section de connexion
    document.getElementById("login").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
  } else {
    alert("Nom d'utilisateur ou mot de passe incorrect !");
  }
});
