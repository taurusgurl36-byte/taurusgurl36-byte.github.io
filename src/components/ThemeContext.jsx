
import { createContext, useContext, useEffect } from "react";
import { applyTheme } from "../utils/theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const theme = "dark";

  useEffect(() => {
    applyTheme("dark");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }, []);

  const setTheme = () => {
    // Dark mode only; switching to light mode is disabled.
    applyTheme("dark");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
