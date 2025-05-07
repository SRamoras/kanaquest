// src/utils/smoothScroll.js
import Lenis from '@studio-freight/lenis';

const originalScrollTo = window.scrollTo.bind(window);
let lenisInstance = null;

export function initSmoothScroll(options = {}) {
  if (!lenisInstance) {
    lenisInstance = new Lenis(options);

    // Override de window.scrollTo para suportar ambos os formatos
    window.scrollTo = (...args) => {
      if (!lenisInstance) {
        // se não tivermos Lenis, usa o nativo
        return originalScrollTo(...args);
      }

      // Caso chamem window.scrollTo({ top, left?, behavior? })
      if (args.length === 1 && typeof args[0] === 'object') {
        const { top = window.pageYOffset, behavior } = args[0];
        // Se behavior === 'smooth', anima; senão, salto imediato
        const immediate = behavior !== 'smooth';
        return lenisInstance.scrollTo(top, { immediate });
      }

      // Caso chamem window.scrollTo(x, y)
      if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        const [, y] = args;
        // neste formato, sempre salto imediato (comportamento original)
        return lenisInstance.scrollTo(y, { immediate: true });
      }

      // fallback para qualquer outro caso
      return originalScrollTo(...args);
    };

    // Desliga o scrollRestoration do browser
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Loop de RAF
    function raf(time) {
      if (lenisInstance) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
    }
    requestAnimationFrame(raf);
  }

  return lenisInstance;
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    if (typeof lenisInstance.destroy === 'function') {
      lenisInstance.destroy();
    }
    lenisInstance = null;
  }
  // Restaura scrollTo original
  window.scrollTo = originalScrollTo;

  // Restaura scrollRestoration do browser
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'auto';
  }
}
