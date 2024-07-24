document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');

  const routes = {
    '/': 'home-content.html',
    '/goat-profile': 'goat-profile-content.html',
    '/community-forum': 'community-forum-content.html',
    '/goat-data': 'goat-data-content.html',
  };

  window.navigateTo = function(path) {
    const url = routes[path] || 'home-content.html';
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.body.innerHTML;
        mainContent.innerHTML = content;

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
  };

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const path = event.target.getAttribute('data-link');
      window.navigateTo(path);
    });
  });

  window.onpopstate = () => {
    window.navigateTo(window.location.pathname);
  };

  // Initial navigation
  window.navigateTo(window.location.pathname);
});
