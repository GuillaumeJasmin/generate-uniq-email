import { useCallback, useEffect, useState } from 'react';
import { EmitHelperUniqueNameCallback } from 'typescript';

const localStorageKey = 'email';

export function useEmail() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const localStorageEmail = localStorage.getItem(localStorageKey);

    if (localStorageEmail) {
      setEmail(localStorageEmail);
    }
  }, []);

  const setEmailAndSaveToStorage = useCallback((nextEmail: string) => {
    localStorage.setItem(localStorageKey, nextEmail);
    setEmail(nextEmail);
  }, []);

  return [email, setEmailAndSaveToStorage] as [
    typeof email,
    typeof setEmailAndSaveToStorage
  ];
}
