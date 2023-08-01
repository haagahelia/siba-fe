//custom hook to keep state and to switch theme between light and dark mode
//this is exported to App.js
import { useState } from "react";
import {
  lightPalette,
  normalPalette,
  yellowPalette,
  redPalette,
} from "../styles/theme";
import { createAppTheme } from "../styles/theme";

export const useThemeSwitcher = () => {
  const palettes = [lightPalette, normalPalette, yellowPalette, redPalette];
  // state to keep track of the current index of the palette
  const [paletteIndex, setPaletteIndex] = useState(0);
  const toggleTheme = () => {
    // Incrementing the palette index and using modulo to loop back to the start if at the end of our palette array
    setPaletteIndex((prevIndex) => (prevIndex + 1) % palettes.length);
  };
  // Getting the current palette based on the index
  const currentPalette = palettes[paletteIndex];
  const theme = createAppTheme(currentPalette);
  return { theme, toggleTheme };
};

//Dark & lightheme here when done with testing all views using other palettes return this and delete above switcher.
// export const useThemeSwitcher = () => {
//   const [currentPalette, setCurrentPalette] = useState(lightPalette); // Default theme
//   const toggleTheme = () => {
//     setCurrentPalette(
//       currentPalette === lightPalette ? normalPalette : lightPalette
//     );
//   };
//   const theme = createAppTheme(currentPalette);
//   return { theme, toggleTheme };
// };
