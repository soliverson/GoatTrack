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
          { path: "/", view: () => loadHTMLContent("/home-content.html") },
          { path: "/home-content.html", view: () => loadHTMLContent("/home-content.html") },
          { path: "/goat-data.html", view: () => loadHTMLContent("/goat-data.html") },
          { path: "/goat-profile-content.html", view: () => loadHTMLContent("/goat-profile-content.html") },
          { path: "/community-forum-content.html", view: () => loadHTMLContent("/community-forum-content.html") }
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
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`Failed to load content from ${url}`);
          }
          const data = await response.text();
          mainContent.innerHTML = data;
      } catch (error) {
          console.error("Error loading content:", error);
          mainContent.innerHTML = `<p>Error loading content. Please try again later.</p>`;
      }
  };

  window.addEventListener('popstate', router);

  router();
});
