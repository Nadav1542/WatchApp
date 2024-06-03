// DarkModeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a Context for the dark mode
const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage for dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    // Update local storage whenever dark mode state changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleDarkModeToggle = () => {
      setDarkMode(prevMode => !prevMode);
    };

    window.addEventListener('toggleDarkMode', handleDarkModeToggle);

    return () => {
      window.removeEventListener('toggleDarkMode', handleDarkModeToggle);
    };
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
