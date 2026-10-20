
const THEME_STORAGE_KEY = "theme";

export function getStoredTheme() {
  return "dark";
}

export function saveTheme() {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
  } catch {
    // Dark mode remains active for this session.
  }
}

export function isDarkTheme() {
  return true;
}

export function applyTheme() {
  document.documentElement.classList.add("dark");
  document.documentElement.style.colorScheme = "dark";
}
