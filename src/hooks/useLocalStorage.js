import { useEffect, useRef, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const loaded = useRef(false);
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch {}
    return initialValue;
  });

  useEffect(() => {
    if (!loaded.current) { loaded.current = true; return; }
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);

  return [value, setValue];
}
