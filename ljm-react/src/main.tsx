import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AdminPreferencesProvider } from './context/AdminPreferencesContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AdminPreferencesProvider>
        <App />
      </AdminPreferencesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
