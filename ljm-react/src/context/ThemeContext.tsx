import React, { createContext, useContext, useEffect, useState } from 'react';

type Tema = 'claro' | 'oscuro';

interface ThemeContextType {
  tema: Tema;
  setTema: (t: Tema) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  tema: 'claro',
  setTema: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tema, setTemaState] = useState<Tema>(() => {
    const stored = localStorage.getItem('tema');
    return stored === 'oscuro' ? 'oscuro' : 'claro';
  });

  const setTema = (t: Tema) => {
    localStorage.setItem('tema', t);
    setTemaState(t);
  };

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
