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
          { path: "/goat-data", view: () => loadHTMLContent("/goat-data.html") },
          { path: "/goat-profile-content", view: () => loadHTMLContent("/goat-profile-content.html") },
          { path: "/community-forum-content", view: () => loadHTMLContent("/community-forum-content.html") }
      ];

      const potentialMatches = routes.map(route => ({
          route: route,
          isMatch: location.pathname === route.path
      }));

      let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

      if (!match) {
          match = { route: routes[0], isMatch: true };
      }

      await match.route.view();
  };

  const loadHTMLContent = async (url) => {
      const mainContent = document.getElementById('main-content');
      const response = await fetch(url);
      if (response.ok) {
          const data = await response.text();
          mainContent.innerHTML = data;
      } else {
          mainContent.innerHTML = "<h1>404 - Page Not Found</h1>";
      }
  };
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
            { path: "/goat-data", view: () => loadHTMLContent("/goat-data.html") },
            { path: "/goat-profile-content", view: () => loadHTMLContent("/goat-profile-content.html") },
            { path: "/community-forum-content", view: () => loadHTMLContent("/community-forum-content.html") }
        ];
  
        const potentialMatches = routes.map(route => ({
            route: route,
            isMatch: location.pathname === route.path
        }));
  
        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
  
        if (!match) {
            match = { route: routes[0], isMatch: true };
        }
  
        await match.route.view();
    };
  
    const loadHTMLContent = async (url) => {
        const mainContent = document.getElementById('main-content');
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.text();
            mainContent.innerHTML = data;
        } else {
            mainContent.innerHTML = "<h1>404 - Page Not Found</h1>";
        }
    };
  
    window.addEventListener('popstate', router);
  
    router();
  });
  
  window.addEventListener('popstate', router);

  router();
});
