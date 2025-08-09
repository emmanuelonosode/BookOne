import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const AnimatedCounter = ({ value, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef();

  const numericValue = useMemo(() => {
    if (value.includes("K")) {
      return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    } else if (value.includes("x")) {
      return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    } else if (value.includes("$")) {
      return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    } else {
      return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    }
  }, [value]);

  const formatValue = useCallback(
    (num) => {
      if (value.includes("$")) {
        if (value.includes("K")) {
          return `$${num}K+`;
        }
        return `$${num}`;
      }
      if (value.includes("x")) {
        return `${num}x`;
      }
      if (value.includes("K")) {
        const suffix = value.replace(/[\dK]/g, "");
        return `${num}K${suffix}`;
      }
      if (value.includes("%")) {
        return `${num}%`;
      }
      if (value.includes("+")) {
        return `${num}+`;
      }
      const suffix = value.replace(/[\d]/g, "");
      return `${num}${suffix}`;
    },
    [value]
  );

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (!hasStarted) {
        setHasStarted(true);
        if (numericValue === 0) {
          setCount(0);
          return;
        }
        let start = 0;
        const increment = numericValue / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= numericValue) {
            setCount(numericValue);
            clearInterval(timer);
          } else {
            setCount(Math.round(start * 10) / 10);
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [hasStarted, numericValue, duration, delay]);

  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (!hasStarted) {
        setCount(numericValue);
        setHasStarted(true);
      }
    }, 3000);
    return () => clearTimeout(fallbackTimeout);
  }, [hasStarted, numericValue]);

  return (
    <span ref={ref} aria-label={`${formatValue(count)}`}>
      {formatValue(count)}
    </span>
  );
};

export default AnimatedCounter;
