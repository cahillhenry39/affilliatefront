import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import useUser from "../features/authentication/useUser";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const { darkModeSettings } = useUser(); // now works fine 🎉

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    darkModeSettings !== undefined && darkModeSettings !== null
      ? darkModeSettings
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  // Sync with user’s saved preference when it changes
  useEffect(() => {
    if (darkModeSettings !== undefined && darkModeSettings !== null) {
      setIsDarkMode(darkModeSettings);
    }
  }, [darkModeSettings, setIsDarkMode]);

  // Apply class to <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
    // optionally: call a mutation here to persist back to DB
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used within DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
