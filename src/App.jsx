import "./App.css";
import { AllocRoundContext } from "./AppContext.js";
import { useThemeSwitcher } from "./hooks/useThemeSwitcher";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useState } from "react";
import Nav from "./routers/Nav";
import { ThemeIcon } from "./styles/themeIcons";

export default function App() {
  const { theme, toggleTheme } = useThemeSwitcher();
  const [allocRoundContext, setAllocRoundContext] = useState({
    allocRoundId: 10004,
    allocRoundName: "Demo",
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AllocRoundContext.Provider
          value={{ allocRoundContext, setAllocRoundContext }}
        >
          <Nav />
        </AllocRoundContext.Provider>
        <Button variant="themeToggle" onClick={toggleTheme}>
          <ThemeIcon theme={theme} />
        </Button>
      </ThemeProvider>
    </div>
  );
}
