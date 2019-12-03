import { useEffect, useState, useRef } from 'react';
import { breakpoints } from '../theme';

function useMatchMedia(query) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia(query);
    setIsMatch(mediaQuery.matches);
    const handleChange = ({ matches }) => setIsMatch(matches);
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query]);

  return isMatch;
}

export function useBreakpoint(breakpoint = 'desktop') {
  return useMatchMedia(
    `(min-width: ${parseFloat(breakpoints[breakpoint]) / 16}em)`
  );
}

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
export const useDimensions = ref => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current === null) return;
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, [ref]);

  return dimensions.current;
};
