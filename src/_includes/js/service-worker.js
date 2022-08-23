let isRefreshing = false;

const refresh = () => {
  if (isRefreshing) {
    return null;
  }

  isRefreshing = true;
  window.location.reload();
};

if ('serviceWorker' in navigator) {
  const TIMEOUT = 5000;
  const IS_INITIAL = !navigator.serviceWorker.controller;

  navigator.serviceWorker.register('/sw.js').then((reg) => {
    !IS_INITIAL &&
      reg.addEventListener('updatefound', () => {
        renderLoader();
        const worker = reg.installing;

        setTimeout(
          () => renderBanner('Update gefunden. Seite lädt in Kürze neu.'),
          TIMEOUT,
        );

        worker.addEventListener('statechange', () => {
          worker.state === 'installed' &&
            worker.postMessage({ action: 'skipWaiting' });
        });
      });
  });

  !IS_INITIAL &&
    navigator.serviceWorker.addEventListener('controllerchange', refresh);
}
