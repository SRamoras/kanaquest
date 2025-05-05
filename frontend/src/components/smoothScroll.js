// smoothScroll.js
import Lenis from '@studio-freight/lenis';

// Instância singleton de Lenis
let lenisInstance = null;

/**
 * Inicializa o smooth scroll usando Lenis.
 * @param {Object} options - configurações (duration, easing, etc.).
 * @returns {Lenis} Instância única de Lenis.
 */
export function initSmoothScroll(options = {}) {
  if (!lenisInstance) {
    lenisInstance = new Lenis(options);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
  return lenisInstance;
}

/**
 * Destrói a instância de Lenis (se disponível).
 */
export function destroySmoothScroll() {
  if (lenisInstance && typeof lenisInstance.destroy === 'function') {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
