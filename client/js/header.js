document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const path = event.target.getAttribute('data-link');
        navigateTo(path);
        menu.classList.remove('active');
      });
    });
  });
  