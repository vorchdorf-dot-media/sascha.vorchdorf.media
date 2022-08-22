const TIMEOUT = 5000;

let isRefreshing = false;
let worker;

const renderBanner = (text) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('full-bleed');
  wrapper.style.position = 'fixed';
  wrapper.style.top = 0;
  wrapper.style.right = 0;
  wrapper.style.left = 0;
  wrapper.style.zIndex = 9999;

  const container = document.createElement('div');
  container.classList.add('container');
  container.style.backgroundColor = 'var(--color-secondary)';
  container.style.color = 'var(--color-bg)';
  container.style.textAlign = 'center';
  container.style.fontSize = 'var(--font-size-h5)';
  container.style.fontWeight = '700';

  const msg = document.createElement('span');
  msg.innerText = text;

  container.appendChild(msg);
  wrapper.appendChild(container);

  document.body.prepend(wrapper);
};

const refresh = () => {
  if (isRefreshing) {
    return null;
  }

  isRefreshing = true;
  window.location.reload();
};

if ('serviceWorker' in navigator) {
  const isInitialInstall = !navigator.serviceWorker.controller;

  navigator.serviceWorker.register('/sw.js').then((reg) => {
    !isInitialInstall &&
      reg.addEventListener('updatefound', () => {
        worker = reg.installing;

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

  !isInitialInstall &&
    navigator.serviceWorker.addEventListener('controllerchange', refresh);
}
