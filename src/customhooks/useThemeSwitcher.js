//custom hook to keep state and to switch theme between light and dark mode
//this is exported to App.js
import { useState } from "react";
import { lightPalette, normalPalette } from "../styles/theme";
import { createAppTheme } from "../styles/theme";

export const useThemeSwitcher = () => {
  const [currentPalette, setCurrentPalette] = useState(lightPalette); // Default theme
  const toggleTheme = () => {
    setCurrentPalette(
      currentPalette === lightPalette ? normalPalette : lightPalette,
    );
  };
  const theme = createAppTheme(currentPalette);
  return { theme, toggleTheme };
};
