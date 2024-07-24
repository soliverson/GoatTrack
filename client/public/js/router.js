const routes = {
  '/': '/home-content.html',
  '/goat-data': '/goat-data.html',
  '/goat-profile': '/goat-profile.html',
  '/forum': '/forum.html',
};

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes['/'];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById('main-content').innerHTML = html;
  if (path === '/goat-data') {
      const script = document.createElement('script');
      script.src = 'js/goat-data.js';
      script.defer = true;
      document.body.appendChild(script);
  }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
