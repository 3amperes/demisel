import { useEffect, useState } from 'react';
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
