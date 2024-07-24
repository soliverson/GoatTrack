document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
      if (e.target.matches('[data-link]')) {
          e.preventDefault();
          navigateTo(e.target.href);
      }
  });

  const navigateTo = url => {
      history.pushState(null, null, url);
      router();
  };

  const router = async () => {
      const routes = [
        { path: "/home-content.html", view: () => loadHTMLContent("/home-content.html") },
        { path: "/goat-data.html", view: () => loadHTMLContent("/goat-data.html") },
          { path: "/goat-profile-content.html", view: () => loadHTMLContent("/goat-profile-content.html") },
          { path: "/community-forum-content.html", view: () => loadHTMLContent("/community-forum-content.html") },
      ];

      const potentialMatches = routes.map(route => {
          return {
              route: route,
              isMatch: location.pathname === route.path
          };
      });

      let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

      if (!match) {
          match = {
              route: routes[0],
              isMatch: true
          };
      }

      match.route.view();
  };

  const loadHTMLContent = async (url) => {
      const mainContent = document.getElementById('main-content');
      const response = await fetch(url);
      const data = await response.text();
      mainContent.innerHTML = data;
      
      // Dynamically load and execute the script for the specific content
      if (url === "/goat-data.html") {
          const script = document.createElement('script');
          script.src = 'js/goat-data.js';
          script.defer = true;
          mainContent.appendChild(script);
      }
  };

  window.addEventListener('popstate', router);

  router();
});
