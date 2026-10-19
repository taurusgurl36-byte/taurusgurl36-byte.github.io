const THEME_STORAGE_KEY = "theme";
const VALID_THEMES = new Set(["system", "light", "dark"]);

export function getStoredTheme() {
  try {
    const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return VALID_THEMES.has(theme) ? theme : "light";
  } catch {
    return "light";
  }
}


export function saveTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Keep the selected theme for this session even if it cannot be saved.
  }
}

export function isDarkTheme(theme) {
  return (
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", isDarkTheme(theme));
}
