import React, { createContext, useContext, useState } from 'react';

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
    return (localStorage.getItem('tema') as Tema) || 'claro';
  });

  const setTema = (t: Tema) => {
    localStorage.setItem('tema', t);
    setTemaState(t);
  };

  return (
    <ThemeContext.Provider value={{ tema, setTema }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);