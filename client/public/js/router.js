document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');

  const routes = {
    '/': 'home-content.html',
    '/goat-profile': 'goat-profile-content.html',
    '/community-forum': 'community-forum-content.html',
    '/goat-data': 'goat-data-content.html',
    // Add other routes here if needed
  };

  function navigateTo(path) {
    const url = routes[path] || 'home-content.html';
    fetch(url)
      .then(response => response.text())
      .then(html => {
        mainContent.innerHTML = html;
        const scripts = mainContent.querySelectorAll('script');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          newScript.innerHTML = script.innerHTML;
          document.body.appendChild(newScript);
        });
      })
      .catch(error => {
        console.error('Error loading page:', error);
        mainContent.innerHTML = '<p>Error loading page.</p>';
      });
    window.history.pushState({}, path, window.location.origin + path);
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const path = event.target.getAttribute('data-link');
      navigateTo(path);
    });
  });

  window.onpopstate = () => {
    navigateTo(window.location.pathname);
  };

  navigateTo(window.location.pathname);
});
