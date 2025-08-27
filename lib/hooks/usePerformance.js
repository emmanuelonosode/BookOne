import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import {
  throttle,
  createOptimizedScrollHandler,
  createOptimizedResizeHandler,
  createIntersectionObserver,
  addOptimizedEventListener,
  batchDOMUpdates,
} from "../performance.js";

/**
 * Simple test hook to verify performance hooks are working
 * @returns {Object} Test state
 */
export function usePerformanceTest() {
  const [testValue, setTestValue] = useState(0);
  
  const increment = useCallback(() => {
    setTestValue(prev => prev + 1);
  }, []);

  return { testValue, increment };
}

/**
 * Hook for optimized scroll handling
 * @param {Function} callback - Function to call on scroll
 * @param {Object} options - Options for scroll handling
 * @returns {Object} Scroll state and cleanup function
 */
export function useOptimizedScroll(callback, options = {}) {
  const { throttleMs = 16, passive = true } = options;
  const cleanupRef = useRef(null);

  const optimizedCallback = useMemo(() => {
    return throttle(callback, throttleMs);
  }, [callback, throttleMs]);

  useEffect(() => {
    const scrollHandler = createOptimizedScrollHandler(optimizedCallback);
    cleanupRef.current = addOptimizedEventListener(
      window,
      "scroll",
      scrollHandler,
      { passive }
    );

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [optimizedCallback, passive]);

  return {
    cleanup: () => cleanupRef.current?.(),
  };
}

/**
 * Hook for optimized resize handling
 * @param {Function} callback - Function to call on resize
 * @param {Object} options - Options for resize handling
 * @returns {Object} Resize state and cleanup function
 */
export function useOptimizedResize(callback, options = {}) {
  const { delay = 250, passive = true } = options;
  const cleanupRef = useRef(null);

  const optimizedCallback = useMemo(() => {
    return createOptimizedResizeHandler(callback, delay);
  }, [callback, delay]);

  useEffect(() => {
    cleanupRef.current = addOptimizedEventListener(
      window,
      "resize",
      optimizedCallback,
      { passive }
    );

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [optimizedCallback, passive]);

  return {
    cleanup: () => cleanupRef.current?.(),
  };
}

/**
 * Hook for intersection observer
 * @param {Function} callback - Function to call when element intersects
 * @param {Object} options - Intersection Observer options
 * @returns {Object} Observer ref and cleanup function
 */
export function useIntersectionObserver(callback, options = {}) {
  const observerRef = useRef(null);
  const elementRef = useRef(null);

  const observer = useMemo(() => {
    return createIntersectionObserver(callback, options);
  }, [callback, options]);

  useEffect(() => {
    observerRef.current = observer;

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [observer]);

  const setElement = useCallback((element) => {
    if (elementRef.current) {
      observerRef.current?.unobserve(elementRef.current);
    }

    elementRef.current = element;

    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  return {
    ref: setElement,
    observer: observerRef.current,
  };
}

/**
 * Hook for optimized event listeners
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Event listener options
 * @returns {Function} Ref callback for element
 */
export function useOptimizedEventListener(event, handler, options = {}) {
  const elementRef = useRef(null);
  const cleanupRef = useRef(null);

  const optimizedHandler = useCallback(handler, [handler]);

  useEffect(() => {
    if (elementRef.current) {
      cleanupRef.current = addOptimizedEventListener(
        elementRef.current,
        event,
        optimizedHandler,
        options
      );
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [event, optimizedHandler, options]);

  return useCallback(
    (element) => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }

      elementRef.current = element;

      if (element) {
        cleanupRef.current = addOptimizedEventListener(
          element,
          event,
          optimizedHandler,
          options
        );
      }
    },
    [event, optimizedHandler, options]
  );
}

/**
 * Hook for debounced values
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} Debounced value
 */
export function useDebouncedValue(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for throttled values
 * @param {any} value - Value to throttle
 * @param {number} limit - Throttle limit in milliseconds
 * @returns {any} Throttled value
 */
export function useThrottledValue(value, limit = 16) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdateRef.current >= limit) {
      setThrottledValue(value);
      lastUpdateRef.current = now;
    }
  }, [value, limit]);

  return throttledValue;
}

/**
 * Hook for optimized DOM updates
 * @param {Function} updateFunction - Function containing DOM updates
 * @returns {Function} Function to trigger batched updates
 */
export function useBatchedUpdates(updateFunction) {
  const updateRef = useRef(updateFunction);

  useEffect(() => {
    updateRef.current = updateFunction;
  }, [updateFunction]);

  return useCallback(() => {
    batchDOMUpdates(() => {
      updateRef.current();
    });
  }, []);
}

/**
 * Hook for performance monitoring
 * @param {string} name - Performance mark name
 * @returns {Function} Function to measure performance
 */
export function usePerformanceMonitor(name) {
  return useCallback(
    async (fn) => {
      const start = performance.now();
      const result = await fn();
      const end = performance.now();

      console.log(`${name} took ${end - start}ms`);
      return result;
    },
    [name]
  );
}

/**
 * Hook for memory-efficient state updates
 * @param {any} initialState - Initial state
 * @returns {Array} State and optimized setter
 */
export function useOptimizedState(initialState) {
  const [state, setState] = useState(initialState);

  const optimizedSetState = useCallback((newState) => {
    batchDOMUpdates(() => {
      setState(newState);
    });
  }, []);

  return [state, optimizedSetState];
}

/**
 * Hook for preventing unnecessary re-renders
 * @param {any} value - Value to memoize
 * @param {Function} compareFn - Comparison function
 * @returns {any} Memoized value
 */
export function useDeepMemo(value, compareFn = null) {
  const ref = useRef();

  if (compareFn ? !compareFn(ref.current, value) : ref.current !== value) {
    ref.current = value;
  }

  return ref.current;
}


