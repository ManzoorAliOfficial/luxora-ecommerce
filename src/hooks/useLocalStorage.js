import { useState } from "react";
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initialValue; }
    catch { return initialValue; }
  });
  const set    = (v) => { setValue(v); localStorage.setItem(key, JSON.stringify(v)); };
  const remove = ()  => { setValue(initialValue); localStorage.removeItem(key); };
  return [value, set, remove];
}