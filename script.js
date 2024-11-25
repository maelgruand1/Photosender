// script.js

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
  
      // Cacher toutes les sections
      document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
      });
  
      // Afficher la section cliquée
      document.getElementById(sectionId).classList.remove('hidden');
    });
  });
  