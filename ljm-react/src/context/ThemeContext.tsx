import React, { createContext, useContext, useEffect, useState } from 'react';
import { ADMIN_SESSION_EVENT, getStoredAdminSession } from '../lib/api';

type Tema = 'claro' | 'oscuro';

interface ThemeContextType {
  tema: Tema;
  setTema: (t: Tema) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  tema: 'claro',
  setTema: () => {},
});

const getThemeStorageKey = () => {
  const session = getStoredAdminSession();
  const identity = session?.user.id ?? session?.user.email ?? 'guest';
  return `tema:${identity}`;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tema, setTemaState] = useState<Tema>(() => {
    const stored = localStorage.getItem(getThemeStorageKey()) ?? localStorage.getItem('tema');
    return stored === 'oscuro' ? 'oscuro' : 'claro';
  });

  const setTema = (t: Tema) => {
    localStorage.setItem(getThemeStorageKey(), t);
    localStorage.setItem('tema', t);
    setTemaState(t);
  };

  useEffect(() => {
    const syncThemeFromSession = () => {
      const stored = localStorage.getItem(getThemeStorageKey()) ?? localStorage.getItem('tema');
      setTemaState(stored === 'oscuro' ? 'oscuro' : 'claro');
    };

    window.addEventListener(ADMIN_SESSION_EVENT, syncThemeFromSession);
    return () => window.removeEventListener(ADMIN_SESSION_EVENT, syncThemeFromSession);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'oscuro');
    document.body.dataset.theme = tema;
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, setTema }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
