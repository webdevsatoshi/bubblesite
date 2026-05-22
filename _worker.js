export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    const cleanRoutes = {
      '/subscribe': '/subscribe/index.html',
      '/faq': '/faq/index.html',
      '/privacy': '/privacy/index.html',
      '/terms': '/terms/index.html'
    };
    const subscribeRef = pathname.match(/^\/subscribe\/([A-Za-z0-9_-]+)$/);
    const assetPath = subscribeRef ? '/subscribe/index.html' : cleanRoutes[pathname];

    if (assetPath) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = assetPath;
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    return env.ASSETS.fetch(request);
  }
};
