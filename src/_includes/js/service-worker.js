const TIMEOUT = 5000;

let isRefreshing = false;
let worker;

const renderLoader = () => {
  const svgns = 'http://www.w3.org/2000/svg';
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes loader {
      0% {
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dashoffset: 2.87;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
    
    @keyframes rotate {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);

  const loader = document.createElementNS(svgns, 'svg');
  loader.setAttribute('viewBox', '-1.5 -1.5 3 3');
  loader.setAttribute('aria-hidden', 'true');
  loader.style.height = '32px';
  loader.style.width = '32px';
  loader.style.transform = 'rotate(-90deg)';
  loader.style.position = 'fixed';
  loader.style.top = 'var(--space-l)';
  loader.style.right = 'var(--space-l)';
  loader.style.zIndex = 9999;

  const circle = document.createElementNS(svgns, 'circle');
  circle.setAttribute('r', '1');
  circle.style.fill = 'none';
  circle.style.stroke = 'var(--color-text)';
  circle.style['stroke-dasharray'] = 6.27;
  circle.style['stroke-width'] = '0.25px';
  circle.style.animation = 'loader 2s infinite, rotate 2s infinite';

  loader.appendChild(circle);

  document.body.prepend(loader);
};

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
        renderLoader();
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
