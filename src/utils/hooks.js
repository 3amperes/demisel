import { useEffect, useRef } from 'react';

export function useEventListener(
  eventName,
  handler,
  element = document,
  params = null
) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;

      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener, params);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },

    [eventName, element, params] // Re-run if eventName or element changes
  );
}

export function useOnClickOutside(ref, handler, wrapperElement = document) {
  if (!wrapperElement.nodeType) wrapperElement = document;

  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    wrapperElement.addEventListener('mousedown', listener);
    wrapperElement.addEventListener('touchstart', listener);

    return () => {
      wrapperElement.removeEventListener('mousedown', listener);
      wrapperElement.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, wrapperElement]); // Empty array ensures that effect is only run on mount and unmount
}
