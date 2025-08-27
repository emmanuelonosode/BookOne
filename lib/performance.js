// Performance optimization utilities to minimize main-thread work

/**
 * Throttle function execution to reduce main thread load
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Debounce function execution to reduce main thread load
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Function} Debounced function
 */
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

/**
 * Optimized scroll handler with requestAnimationFrame
 * @param {Function} callback - Function to call on scroll
 * @returns {Function} Optimized scroll handler
 */
export function createOptimizedScrollHandler(callback) {
  let ticking = false;
  
  return function(event) {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback(event);
        ticking = false;
      });
      ticking = true;
    }
  };
}

/**
 * Optimized resize handler with debouncing
 * @param {Function} callback - Function to call on resize
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Optimized resize handler
 */
export function createOptimizedResizeHandler(callback, delay = 250) {
  return debounce(callback, delay);
}

/**
 * Intersection Observer for lazy loading and performance
 * @param {Function} callback - Function to call when element intersects
 * @param {Object} options - Intersection Observer options
 * @returns {IntersectionObserver} Intersection Observer instance
 */
export function createIntersectionObserver(callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
}

/**
 * Optimized event listener with passive option
 * @param {Element} element - DOM element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Event listener options
 */
export function addOptimizedEventListener(element, event, handler, options = {}) {
  const defaultOptions = {
    passive: true,
    ...options
  };
  
  element.addEventListener(event, handler, defaultOptions);
  
  // Return cleanup function
  return () => {
    element.removeEventListener(event, handler, defaultOptions);
  };
}

/**
 * Batch DOM updates using requestAnimationFrame
 * @param {Function} updateFunction - Function containing DOM updates
 */
export function batchDOMUpdates(updateFunction) {
  requestAnimationFrame(() => {
    updateFunction();
  });
}

/**
 * Optimized image loading with intersection observer
 * @param {HTMLImageElement} img - Image element
 * @param {string} src - Image source
 * @param {string} placeholder - Placeholder image
 */
export function lazyLoadImage(img, src, placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==') {
  // Set placeholder
  img.src = placeholder;
  img.dataset.src = src;
  
  // Create intersection observer
  const observer = createIntersectionObserver((entry) => {
    if (entry.isIntersecting) {
      const targetImg = entry.target;
      targetImg.src = targetImg.dataset.src;
      targetImg.classList.remove('lazy');
      observer.unobserve(targetImg);
    }
  });
  
  observer.observe(img);
}

/**
 * Optimized animation frame handler
 * @param {Function} callback - Function to call on each frame
 * @returns {Function} Cleanup function
 */
export function createAnimationFrameHandler(callback) {
  let animationId;
  
  const animate = () => {
    callback();
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
  
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}

/**
 * Memory-efficient event delegation
 * @param {Element} parent - Parent element
 * @param {string} selector - CSS selector for target elements
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @returns {Function} Cleanup function
 */
export function createEventDelegation(parent, selector, event, handler) {
  const eventHandler = (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler(e, target);
    }
  };
  
  parent.addEventListener(event, eventHandler, { passive: true });
  
  return () => {
    parent.removeEventListener(event, eventHandler);
  };
}

/**
 * Optimized CSS class toggling
 * @param {Element} element - DOM element
 * @param {string} className - CSS class name
 * @param {boolean} force - Force add or remove
 */
export function toggleClassOptimized(element, className, force) {
  if (force === undefined) {
    element.classList.toggle(className);
  } else {
    element.classList.toggle(className, force);
  }
}

/**
 * Batch class operations for better performance
 * @param {Element} element - DOM element
 * @param {Array} classes - Array of class operations
 */
export function batchClassOperations(element, classes) {
  batchDOMUpdates(() => {
    classes.forEach(({ operation, className }) => {
      switch (operation) {
        case 'add':
          element.classList.add(className);
          break;
        case 'remove':
          element.classList.remove(className);
          break;
        case 'toggle':
          element.classList.toggle(className);
          break;
      }
    });
  });
}

/**
 * Optimized style updates
 * @param {Element} element - DOM element
 * @param {Object} styles - Styles object
 */
export function updateStylesOptimized(element, styles) {
  batchDOMUpdates(() => {
    Object.assign(element.style, styles);
  });
}

/**
 * Performance monitoring utility
 * @param {string} name - Performance mark name
 * @param {Function} fn - Function to measure
 * @returns {Promise} Promise that resolves with execution time
 */
export async function measurePerformance(name, fn) {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start}ms`);
  return result;
}

/**
 * Optimized DOM query selector with caching
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null} DOM element
 */
const elementCache = new Map();

export function querySelectorOptimized(selector, context = document) {
  const cacheKey = `${selector}-${context === document ? 'doc' : context.id || 'unknown'}`;
  
  if (elementCache.has(cacheKey)) {
    return elementCache.get(cacheKey);
  }
  
  const element = context.querySelector(selector);
  elementCache.set(cacheKey, element);
  
  return element;
}

/**
 * Clear element cache
 */
export function clearElementCache() {
  elementCache.clear();
}
