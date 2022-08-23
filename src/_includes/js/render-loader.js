const renderLoader = () => {
  const svgns = 'http://www.w3.org/2000/svg';
  const style = document.createElement('style');
  style.innerHTML = `
@keyframes loader {
  0% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: 2.87; }
  100% { stroke-dashoffset: 0; }
}
@keyframes rotate {
  to { transform: rotate(360deg); }
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
