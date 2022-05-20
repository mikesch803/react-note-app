import { createContext, useState, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme")??"");
  const themeHandler = () => {
    const currentTheme = theme === "" ? "dark": "";
    setTheme(currentTheme)
    localStorage.setItem('theme', currentTheme)
  };
  return (
    <ThemeContext.Provider value={{ theme, themeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
