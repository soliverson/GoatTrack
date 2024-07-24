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
      { path: "/", view: () => loadHTMLContent("home-content.html") },
      { path: "/goat-data", view: () => loadHTMLContent("goat-data.html") },
      { path: "/goat-profile", view: () => loadHTMLContent("goat-profile.html") },
      { path: "/community-forum", view: () => loadHTMLContent("community-forum.html") },
      { path: "/goat-breeds", view: () => loadHTMLContent("goat-breeds.html") }
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
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      mainContent.innerHTML = data;
    } catch (error) {
      console.error('Failed to load HTML content:', error);
      mainContent.innerHTML = `<p>Failed to load content. Please try again later.</p>`;
    }
  };

  window.addEventListener('popstate', router);

  router();
});
